import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

const GAME_WIDTH = 320;
const GAME_HEIGHT = 568;
const BIRD_SIZE = 32;
const PIPE_WIDTH = 52;
const BASE_PIPE_GAP = 200; // Starting gap (easy)
const MIN_PIPE_GAP = 100; // Hardest gap
const BASE_GRAVITY = 0.35; // Starting gravity (easy)
const MAX_GRAVITY = 0.65; // Hardest gravity
const BASE_JUMP_STRENGTH = -7; // Starting jump (easy)
const MIN_JUMP_STRENGTH = -9; // Hardest jump (more powerful needed)
const BASE_PIPE_SPEED = 2; // Starting speed (easy)
const MAX_PIPE_SPEED = 5; // Hardest speed

interface Pipe {
  x: number;
  topHeight: number;
  gap: number; // Store gap for each pipe since difficulty changes
  passed: boolean;
}

type GameState = "start" | "playing" | "gameover";

// Calculate difficulty based on pipes passed (1-10 scale, then random after 100)
const getDifficulty = (pipesPassed: number): number => {
  if (pipesPassed >= 100) {
    // Random difficulty between 1 and 10 after 100 pipes
    return Math.floor(Math.random() * 10) + 1;
  }
  // Increase difficulty every 10 pipes (1/10 at start, 10/10 at 90+ pipes)
  return Math.min(Math.floor(pipesPassed / 10) + 1, 10);
};

const getDifficultyParams = (difficulty: number) => {
  const t = (difficulty - 1) / 9; // 0 to 1 scale
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
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("flappyHighScore");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const gameLoopRef = useRef<number>();
  const lastPipeRef = useRef<number>(0);
  const totalPipesPassedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setBirdY(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setDifficulty(1);
    lastPipeRef.current = 0;
    totalPipesPassedRef.current = 0;
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState("playing");
  }, [resetGame]);

  const jump = useCallback(() => {
    if (gameState === "playing") {
      const params = getDifficultyParams(difficulty);
      setBirdVelocity(params.jumpStrength);
    } else if (gameState === "start") {
      startGame();
    } else if (gameState === "gameover") {
      startGame();
    }
  }, [gameState, startGame, difficulty]);

  // Handle keyboard and click events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const params = getDifficultyParams(difficulty);

    const gameLoop = () => {
      setBirdY((prev) => {
        const newY = prev + birdVelocity;
        
        // Check ground/ceiling collision
        if (newY <= 0 || newY >= GAME_HEIGHT - BIRD_SIZE) {
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

      // Update pipes
      setPipes((prevPipes) => {
        let newPipes = prevPipes
          .map((pipe) => ({
            ...pipe,
            x: pipe.x - params.pipeSpeed,
          }))
          .filter((pipe) => pipe.x > -PIPE_WIDTH);

        // Add new pipe
        const lastPipe = newPipes[newPipes.length - 1];
        if (!lastPipe || lastPipe.x < GAME_WIDTH - 200) {
          const currentGap = params.pipeGap;
          const topHeight = Math.random() * (GAME_HEIGHT - currentGap - 100) + 50;
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

      // Check if bird is within pipe x-range
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Check collision with top pipe
        if (birdTop < pipe.topHeight) {
          setGameState("gameover");
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("flappyHighScore", score.toString());
          }
        }
        // Check collision with bottom pipe
        if (birdBottom > pipe.topHeight + pipe.gap) {
          setGameState("gameover");
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("flappyHighScore", score.toString());
          }
        }
      }

      // Score when passing pipe
      if (!pipe.passed && pipe.x + PIPE_WIDTH < 60) {
        setPipes((prev) =>
          prev.map((p) =>
            p.x === pipe.x ? { ...p, passed: true } : p
          )
        );
        setScore((prev) => prev + 1);
        totalPipesPassedRef.current += 1;
        // Update difficulty based on pipes passed
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
            Click or press Space to play!
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
            style={{
              width: GAME_WIDTH,
              maxWidth: "100%",
              aspectRatio: "9/16",
              boxShadow: "0 0 40px hsl(var(--primary) / 0.4), 0 0 80px hsl(var(--accent) / 0.2)",
              border: "3px solid hsl(var(--primary) / 0.6)",
            }}
            onClick={jump}
          >
            {/* Game Canvas */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 50%, #0f0f2a 100%)",
                imageRendering: "pixelated",
              }}
            >
              {/* Cyberpunk grid background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Stars/particles */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: `hsl(${180 + Math.random() * 30} 70% 60%)`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}

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
                    {/* Pipe cap */}
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
                      height: GAME_HEIGHT - pipe.topHeight - pipe.gap,
                      background: "linear-gradient(90deg, #1a5a1a 0%, #2d8a2d 40%, #1a5a1a 100%)",
                      borderTop: "4px solid #0f3f0f",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                      imageRendering: "pixelated",
                    }}
                  >
                    {/* Pipe cap */}
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
                {/* Pixel bird body */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "#ffd700",
                    borderRadius: "4px",
                    boxShadow: "inset -4px -4px 0 #cc9900, inset 4px 4px 0 #ffea00",
                  }}
                />
                {/* Eye */}
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
                {/* Beak */}
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
                {/* Wing */}
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
                    <p className="mb-2">🎮 Press SPACE or Click to fly</p>
                    <p>Avoid the pipes!</p>
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
        `}</style>
      </div>
    </section>
  );
};
