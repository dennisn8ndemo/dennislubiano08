import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";

const GAME_WIDTH = 320;
const GAME_HEIGHT = 568;
const BIRD_SIZE = 32;
const PIPE_WIDTH = 52;
const BASE_PIPE_GAP = 200;
const MIN_PIPE_GAP = 100;
const BASE_GRAVITY = 0.35;
const MAX_GRAVITY = 0.65;
const BASE_JUMP_STRENGTH = -7;
const MIN_JUMP_STRENGTH = -9;
const BASE_PIPE_SPEED = 2;
const MAX_PIPE_SPEED = 5;

interface Pipe {
  x: number;
  topHeight: number;
  gap: number;
  passed: boolean;
}

type GameState = "start" | "playing" | "gameover";

type Season = "winter" | "spring" | "summer" | "fall";
type Place = "countryside" | "city" | "highway" | "woods";

interface BackgroundTheme {
  season: Season;
  place: Place;
  skyGradient: string;
  groundColor: string;
  elements: React.ReactNode;
}

const SEASONS: Season[] = ["winter", "spring", "summer", "fall"];
const PLACES: Place[] = ["countryside", "city", "highway", "woods"];

// Singleton AudioContext manager to prevent audio breaking
let audioContext: AudioContext | null = null;
let audioContextResumed = false;

const getAudioContext = (): AudioContext | null => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Resume context if suspended (browser autoplay policy)
    if (audioContext.state === "suspended" && !audioContextResumed) {
      audioContext.resume().then(() => {
        audioContextResumed = true;
      }).catch(() => {});
    }
    return audioContext;
  } catch (e) {
    return null;
  }
};

// Retro 8-bit sound generator using Web Audio API with singleton context
const playRetroSound = (type: "jump" | "score" | "gameover" | "start") => {
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === "closed") return;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    // Cleanup function to properly disconnect nodes
    const cleanup = () => {
      try {
        oscillator.disconnect();
        gainNode.disconnect();
      } catch (e) {
        // Ignore cleanup errors
      }
    };
    
    oscillator.onended = cleanup;
    
    switch (type) {
      case "jump":
        // Retro flap sound - quick ascending tone
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;
        
      case "score":
        // Coin/point sound - two quick ascending notes
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(523, now);
        oscillator.frequency.setValueAtTime(784, now + 0.08);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.setValueAtTime(0.12, now + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.25);
        break;
        
      case "gameover":
        // Sad descending tone
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.5);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.55);
        break;
        
      case "start":
        // Game start jingle
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(262, now);
        oscillator.frequency.setValueAtTime(330, now + 0.1);
        oscillator.frequency.setValueAtTime(392, now + 0.2);
        oscillator.frequency.setValueAtTime(523, now + 0.3);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.setValueAtTime(0.12, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.55);
        break;
    }
  } catch (e) {
    // Audio not supported, silent fail
  }
};

// Generate random background theme
const generateRandomBackground = (): BackgroundTheme => {
  const season = SEASONS[Math.floor(Math.random() * SEASONS.length)];
  const place = PLACES[Math.floor(Math.random() * PLACES.length)];
  
  // Season-based sky colors
  const skyGradients: Record<Season, string> = {
    winter: "linear-gradient(180deg, #1a2a4a 0%, #4a6a8a 40%, #8ab4d4 100%)",
    spring: "linear-gradient(180deg, #87ceeb 0%, #98d8c8 40%, #f0e68c 100%)",
    summer: "linear-gradient(180deg, #1e90ff 0%, #87ceeb 40%, #ffd700 100%)",
    fall: "linear-gradient(180deg, #ff8c00 0%, #ffa500 40%, #8b4513 100%)",
  };
  
  // Place-based ground colors
  const groundColors: Record<Place, string> = {
    countryside: season === "winter" ? "#e8e8e8" : season === "fall" ? "#8b4513" : "#228b22",
    city: "#404040",
    highway: "#303030",
    woods: season === "winter" ? "#c0c0c0" : season === "fall" ? "#654321" : "#006400",
  };
  
  return {
    season,
    place,
    skyGradient: skyGradients[season],
    groundColor: groundColors[place],
    elements: null,
  };
};

// Pixel art background elements
const BackgroundElements = ({ season, place }: { season: Season; place: Place }) => {
  const elements = useMemo(() => {
    const items: React.ReactNode[] = [];
    
    // Season-specific particles
    if (season === "winter") {
      // Snowflakes
      for (let i = 0; i < 30; i++) {
        items.push(
          <div
            key={`snow-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: "#fff",
              borderRadius: "50%",
              opacity: 0.8,
              animation: `fall ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        );
      }
    } else if (season === "spring") {
      // Cherry blossom petals
      for (let i = 0; i < 15; i++) {
        items.push(
          <div
            key={`petal-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: 6,
              height: 8,
              background: "#ffb7c5",
              borderRadius: "50% 0 50% 50%",
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.7,
              animation: `sway ${3 + Math.random() * 2}s ease-in-out infinite`,
            }}
          />
        );
      }
    } else if (season === "summer") {
      // Sun and clouds
      items.push(
        <div
          key="sun"
          className="absolute"
          style={{
            right: 20,
            top: 30,
            width: 40,
            height: 40,
            background: "#ffdd00",
            borderRadius: "50%",
            boxShadow: "0 0 20px #ffdd00, 0 0 40px #ffaa00",
          }}
        />
      );
    } else if (season === "fall") {
      // Falling leaves
      for (let i = 0; i < 20; i++) {
        const colors = ["#ff6600", "#cc4400", "#ff9900", "#993300"];
        items.push(
          <div
            key={`leaf-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              width: 8,
              height: 6,
              background: colors[Math.floor(Math.random() * colors.length)],
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              opacity: 0.8,
              animation: `fall ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        );
      }
    }
    
    // Place-specific elements
    if (place === "city") {
      // Buildings silhouette
      for (let i = 0; i < 8; i++) {
        const height = 60 + Math.random() * 100;
        items.push(
          <div
            key={`building-${i}`}
            className="absolute"
            style={{
              left: i * 40 + Math.random() * 10,
              bottom: 60,
              width: 30 + Math.random() * 20,
              height,
              background: season === "summer" ? "#1a1a2e" : "#0a0a1a",
              opacity: 0.6,
            }}
          >
            {/* Windows */}
            {[...Array(Math.floor(height / 20))].map((_, j) => (
              <div
                key={j}
                className="absolute"
                style={{
                  left: "20%",
                  top: j * 20 + 5,
                  width: "60%",
                  height: 8,
                  background: Math.random() > 0.3 ? "#ffdd77" : "#333",
                }}
              />
            ))}
          </div>
        );
      }
    } else if (place === "countryside") {
      // Hills and barn
      items.push(
        <div
          key="hill1"
          className="absolute"
          style={{
            left: -20,
            bottom: 50,
            width: 150,
            height: 80,
            background: season === "winter" ? "#ddd" : season === "fall" ? "#9b7653" : "#4a7c4a",
            borderRadius: "50% 50% 0 0",
          }}
        />
      );
      items.push(
        <div
          key="barn"
          className="absolute"
          style={{
            right: 40,
            bottom: 60,
            width: 50,
            height: 40,
            background: "#8b0000",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -20,
              left: 0,
              width: 0,
              height: 0,
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderBottom: "20px solid #8b0000",
            }}
          />
        </div>
      );
    } else if (place === "highway") {
      // Road with dashes
      items.push(
        <div
          key="road"
          className="absolute"
          style={{
            left: 0,
            right: 0,
            bottom: 40,
            height: 40,
            background: "#333",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: i * 50,
                top: 18,
                width: 30,
                height: 4,
                background: "#fff",
              }}
            />
          ))}
        </div>
      );
      // Lamp posts
      for (let i = 0; i < 3; i++) {
        items.push(
          <div
            key={`lamp-${i}`}
            className="absolute"
            style={{
              left: 50 + i * 120,
              bottom: 80,
              width: 4,
              height: 60,
              background: "#666",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: -8,
                width: 20,
                height: 10,
                background: "#444",
                borderRadius: "10px 10px 0 0",
              }}
            />
          </div>
        );
      }
    } else if (place === "woods") {
      // Trees
      for (let i = 0; i < 10; i++) {
        const treeHeight = 80 + Math.random() * 60;
        const treeColor = season === "winter" ? "#1a3a2a" : season === "fall" ? "#8b4513" : "#0d4d0d";
        items.push(
          <div
            key={`tree-${i}`}
            className="absolute"
            style={{
              left: i * 35 + Math.random() * 15,
              bottom: 60,
            }}
          >
            {/* Trunk */}
            <div
              style={{
                width: 8,
                height: 30,
                background: "#4a3728",
                marginLeft: (treeHeight * 0.3 - 8) / 2,
              }}
            />
            {/* Foliage */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${treeHeight * 0.3}px solid transparent`,
                borderRight: `${treeHeight * 0.3}px solid transparent`,
                borderBottom: `${treeHeight}px solid ${treeColor}`,
                marginTop: -30,
                opacity: season === "winter" ? 0.7 : 1,
              }}
            />
            {season === "winter" && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 0,
                  width: treeHeight * 0.5,
                  height: treeHeight * 0.3,
                  background: "rgba(255,255,255,0.4)",
                  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                }}
              />
            )}
          </div>
        );
      }
    }
    
    return items;
  }, [season, place]);
  
  return <>{elements}</>;
};

// Ground element for each place
const Ground = ({ place, season }: { place: Place; season: Season }) => {
  let groundStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  };
  
  if (place === "countryside") {
    groundStyle.background = season === "winter" ? "#e8e8e8" : season === "fall" ? "#8b7355" : "#5a8a5a";
  } else if (place === "city") {
    groundStyle.background = "#2a2a2a";
  } else if (place === "highway") {
    groundStyle.background = "#3a3a3a";
  } else if (place === "woods") {
    groundStyle.background = season === "winter" ? "#c8c8c8" : season === "fall" ? "#5a4a3a" : "#3a5a3a";
  }
  
  return (
    <div style={groundStyle}>
      {/* Grass/texture lines */}
      {place !== "highway" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: season === "winter" ? "#ddd" : season === "fall" ? "#654321" : "#228b22",
          }}
        />
      )}
    </div>
  );
};

const getDifficulty = (pipesPassed: number): number => {
  if (pipesPassed >= 100) {
    return Math.floor(Math.random() * 10) + 1;
  }
  return Math.min(Math.floor(pipesPassed / 10) + 1, 10);
};

const getDifficultyParams = (difficulty: number) => {
  const t = (difficulty - 1) / 9;
  return {
    pipeGap: BASE_PIPE_GAP - t * (BASE_PIPE_GAP - MIN_PIPE_GAP),
    gravity: BASE_GRAVITY + t * (MAX_GRAVITY - BASE_GRAVITY),
    jumpStrength: BASE_JUMP_STRENGTH - t * (MIN_JUMP_STRENGTH - BASE_JUMP_STRENGTH),
    pipeSpeed: BASE_PIPE_SPEED + t * (MAX_PIPE_SPEED - BASE_PIPE_SPEED),
  };
};

export const RetroBreakSection = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [background, setBackground] = useState<BackgroundTheme>(generateRandomBackground);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("flappyHighScore");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const gameLoopRef = useRef<number>();
  const lastPipeRef = useRef<number>(0);
  const totalPipesPassedRef = useRef<number>(0);
  const prevScoreRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setBirdY(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setDifficulty(1);
    lastPipeRef.current = 0;
    totalPipesPassedRef.current = 0;
    prevScoreRef.current = 0;
    setBackground(generateRandomBackground());
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState("playing");
    playRetroSound("start");
  }, [resetGame]);

  const jump = useCallback(() => {
    if (gameState === "playing") {
      const params = getDifficultyParams(difficulty);
      setBirdVelocity(params.jumpStrength);
      playRetroSound("jump");
    }
    // Only allow starting via the button, not by clicking/space
  }, [gameState, difficulty]);

  // Play score sound when score increases
  useEffect(() => {
    if (score > prevScoreRef.current && gameState === "playing") {
      playRetroSound("score");
      // Change background randomly every 10 points
      if (score % 10 === 0) {
        setBackground(generateRandomBackground());
      }
    }
    prevScoreRef.current = score;
  }, [score, gameState]);

  // Play game over sound
  useEffect(() => {
    if (gameState === "gameover") {
      playRetroSound("gameover");
    }
  }, [gameState]);

  // Handle keyboard events (only during gameplay)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && gameState === "playing") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump, gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const params = getDifficultyParams(difficulty);

    const gameLoop = () => {
      setBirdY((prev) => {
        const newY = prev + birdVelocity;
        
        if (newY <= 0 || newY >= GAME_HEIGHT - BIRD_SIZE - 60) {
          setGameState("gameover");
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("flappyHighScore", score.toString());
          }
          return prev;
        }
        
        return newY;
      });

      setBirdVelocity((prev) => prev + params.gravity);

      setPipes((prevPipes) => {
        let newPipes = prevPipes
          .map((pipe) => ({
            ...pipe,
            x: pipe.x - params.pipeSpeed,
          }))
          .filter((pipe) => pipe.x > -PIPE_WIDTH);

        const lastPipe = newPipes[newPipes.length - 1];
        if (!lastPipe || lastPipe.x < GAME_WIDTH - 200) {
          const currentGap = params.pipeGap;
          const topHeight = Math.random() * (GAME_HEIGHT - currentGap - 160) + 50;
          newPipes.push({
            x: GAME_WIDTH,
            topHeight,
            gap: currentGap,
            passed: false,
          });
        }

        return newPipes;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, birdVelocity, score, highScore, difficulty]);

  // Collision detection and scoring
  useEffect(() => {
    if (gameState !== "playing") return;

    pipes.forEach((pipe) => {
      const birdLeft = 60;
      const birdRight = birdLeft + BIRD_SIZE;
      const birdTop = birdY;
      const birdBottom = birdY + BIRD_SIZE;

      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PIPE_WIDTH;

      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        if (birdTop < pipe.topHeight) {
          setGameState("gameover");
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("flappyHighScore", score.toString());
          }
        }
        if (birdBottom > pipe.topHeight + pipe.gap) {
          setGameState("gameover");
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("flappyHighScore", score.toString());
          }
        }
      }

      if (!pipe.passed && pipe.x + PIPE_WIDTH < 60) {
        setPipes((prev) =>
          prev.map((p) =>
            p.x === pipe.x ? { ...p, passed: true } : p
          )
        );
        setScore((prev) => prev + 1);
        totalPipesPassedRef.current += 1;
        const newDifficulty = getDifficulty(totalPipesPassedRef.current);
        setDifficulty(newDifficulty);
      }
    });
  }, [pipes, birdY, gameState, score, highScore]);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Need a <span className="text-gradient">1-minute break?</span>
          </h2>
          <p className="text-muted-foreground">
            Click the button to start playing!
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="relative rounded-2xl overflow-hidden select-none"
            style={{
              width: GAME_WIDTH,
              maxWidth: "100%",
              aspectRatio: "9/16",
              boxShadow: "0 0 40px hsl(var(--primary) / 0.4), 0 0 80px hsl(var(--accent) / 0.2)",
              border: "3px solid hsl(var(--primary) / 0.6)",
              cursor: gameState === "playing" ? "pointer" : "default",
            }}
            onClick={gameState === "playing" ? jump : undefined}
          >
            {/* Dynamic Background */}
            <div
              className="absolute inset-0"
              style={{
                background: background.skyGradient,
                imageRendering: "pixelated",
              }}
            >
              {/* Background elements based on season and place */}
              <BackgroundElements season={background.season} place={background.place} />
              
              {/* Ground */}
              <Ground place={background.place} season={background.season} />

              {/* Current theme indicator */}
              <div
                className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  fontFamily: "monospace",
                  fontSize: "8px",
                }}
              >
                {background.season.toUpperCase()} • {background.place.toUpperCase()}
              </div>

              {/* Pipes */}
              {pipes.map((pipe, index) => (
                <div key={index}>
                  {/* Top pipe */}
                  <div
                    className="absolute"
                    style={{
                      left: pipe.x,
                      top: 0,
                      width: PIPE_WIDTH,
                      height: pipe.topHeight,
                      background: "linear-gradient(90deg, #1a5a1a 0%, #2d8a2d 40%, #1a5a1a 100%)",
                      borderBottom: "4px solid #0f3f0f",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                      imageRendering: "pixelated",
                    }}
                  >
                    <div
                      className="absolute -left-1 -right-1"
                      style={{
                        bottom: 0,
                        height: 24,
                        background: "linear-gradient(90deg, #1a5a1a 0%, #3d9a3d 40%, #1a5a1a 100%)",
                        border: "3px solid #0f3f0f",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  {/* Bottom pipe */}
                  <div
                    className="absolute"
                    style={{
                      left: pipe.x,
                      top: pipe.topHeight + pipe.gap,
                      width: PIPE_WIDTH,
                      height: GAME_HEIGHT - pipe.topHeight - pipe.gap - 60,
                      background: "linear-gradient(90deg, #1a5a1a 0%, #2d8a2d 40%, #1a5a1a 100%)",
                      borderTop: "4px solid #0f3f0f",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                      imageRendering: "pixelated",
                    }}
                  >
                    <div
                      className="absolute -left-1 -right-1"
                      style={{
                        top: 0,
                        height: 24,
                        background: "linear-gradient(90deg, #1a5a1a 0%, #3d9a3d 40%, #1a5a1a 100%)",
                        border: "3px solid #0f3f0f",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Bird */}
              <div
                className="absolute transition-transform"
                style={{
                  left: 60,
                  top: birdY,
                  width: BIRD_SIZE,
                  height: BIRD_SIZE,
                  transform: `rotate(${Math.min(birdVelocity * 3, 45)}deg)`,
                  imageRendering: "pixelated",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "#ffd700",
                    borderRadius: "4px",
                    boxShadow: "inset -4px -4px 0 #cc9900, inset 4px 4px 0 #ffea00",
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    right: 4,
                    top: 6,
                    width: 8,
                    height: 8,
                    background: "#fff",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      right: 1,
                      top: 2,
                      width: 4,
                      height: 4,
                      background: "#000",
                      borderRadius: "1px",
                    }}
                  />
                </div>
                <div
                  className="absolute"
                  style={{
                    right: -6,
                    top: 14,
                    width: 10,
                    height: 6,
                    background: "#ff6600",
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    left: 2,
                    top: 14,
                    width: 12,
                    height: 8,
                    background: "#e6c200",
                    borderRadius: "2px",
                    animation: gameState === "playing" ? "wingFlap 0.1s infinite alternate" : "none",
                  }}
                />
              </div>

              {/* Score display */}
              {gameState === "playing" && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
                  <div
                    className="text-4xl font-bold"
                    style={{
                      color: "#fff",
                      textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                      fontFamily: "monospace",
                    }}
                  >
                    {score}
                  </div>
                  <div
                    className="text-xs mt-1 font-bold"
                    style={{
                      color: score >= 100 ? "#ff00ff" : `hsl(${120 - (difficulty - 1) * 12}, 100%, 50%)`,
                      textShadow: "1px 1px 0 #000",
                      fontFamily: "monospace",
                    }}
                  >
                    {score >= 100 ? "LVL: RNG!" : `LVL: ${difficulty}/10`}
                  </div>
                </div>
              )}

              {/* Start Screen */}
              {gameState === "start" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div
                    className="text-4xl font-bold mb-4 text-gradient"
                    style={{ fontFamily: "monospace", imageRendering: "pixelated" }}
                  >
                    RETRO BREAK
                  </div>
                  <div className="text-muted-foreground mb-6 text-center px-4">
                    <p className="mb-2">🎮 Press SPACE or Click to fly during game</p>
                    <p>Avoid the pipes!</p>
                    <p className="text-xs mt-2 opacity-70">🔊 Sound enabled</p>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      startGame();
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3"
                  >
                    START GAME
                  </Button>
                  {highScore > 0 && (
                    <div className="mt-4 text-secondary font-bold">
                      High Score: {highScore}
                    </div>
                  )}
                </div>
              )}

              {/* Game Over Screen */}
              {gameState === "gameover" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div
                    className="text-3xl font-bold mb-2 text-destructive"
                    style={{ fontFamily: "monospace" }}
                  >
                    GAME OVER
                  </div>
                  <div className="text-2xl font-bold mb-1">Score: {score}</div>
                  <div className="text-secondary font-bold mb-6">
                    High Score: {highScore}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      startGame();
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3"
                  >
                    PLAY AGAIN
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes wingFlap {
            from { transform: translateY(0); }
            to { transform: translateY(-3px); }
          }
          @keyframes fall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 0.8; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
          @keyframes sway {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            50% { transform: translateX(10px) rotate(10deg); }
          }
        `}</style>
      </div>
    </section>
  );
};
