import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Trophy, Zap, ChevronDown } from 'lucide-react';

const EASTER_EGG_MESSAGES = [
  "404: Productivity not found ☕",
  "Deploying to production...",
  "You survived another sprint! 🚀",
  "Refactoring in progress...",
  "Lighthouse Score: 100/100 ⚡",
];

export default function DinoGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [toast, setToast] = useState('');
  const [isTouchDucking, setIsTouchDucking] = useState(false);

  const stateRef = useRef({
    gameState: 'idle',
    score: 0,
    highScore: 0,
    level: 1,
    dinoY: 118,
    dinoVy: 0,
    isJumping: false,
    isDucking: false,
    legFrame: 0,
    frameCount: 0,
    obstacles: [],
    clouds: [],
    groundPebbles: [],
    speed: 6,
    lastSpawnX: 0,
  });

  // Load High Score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mj_dino_high_score');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) {
        setHighScore(parsed);
        stateRef.current.highScore = parsed;
      }
    }
  }, []);

  // Sync state ref with React state
  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  // Main Canvas Render & Physics Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const groundY = 150;
    const dinoX = Math.round(canvas.width * 0.08); // 8% from left (72px)

    // Initialize background clouds
    const initClouds = () => {
      const clouds = [];
      for (let i = 0; i < 4; i++) {
        clouds.push({
          x: 120 + i * 220 + Math.random() * 60,
          y: 20 + Math.random() * 35,
        });
      }
      stateRef.current.clouds = clouds;
    };

    // Initialize ground pebbles
    const initPebbles = () => {
      const pebbles = [];
      for (let i = 0; i < 30; i++) {
        pebbles.push({
          x: Math.random() * canvas.width,
          y: groundY + 4 + Math.random() * 18,
          w: Math.random() > 0.5 ? 6 : 3,
        });
      }
      stateRef.current.groundPebbles = pebbles;
    };

    const resetGame = () => {
      const state = stateRef.current;
      state.dinoY = groundY - 32;
      state.dinoVy = 0;
      state.isJumping = false;
      state.isDucking = false;
      state.obstacles = [];
      state.speed = 6;
      state.score = 0;
      state.level = 1;
      state.lastSpawnX = 0;
      state.frameCount = 0;
      initClouds();
      initPebbles();
      setScore(0);
      setLevel(1);
      setToast('');
    };

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        onyx: isDark ? '#F8F9FA' : '#111113',
        eye: isDark ? '#111113' : '#F8F9FA',
        groundLine: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(17, 17, 19, 0.8)',
        groundDots: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(17, 17, 19, 0.4)',
        cloud: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(17, 17, 19, 0.2)',
      };
    };

    // Draw Background Clouds
    const drawClouds = (colors) => {
      ctx.fillStyle = colors.cloud;
      stateRef.current.clouds.forEach((cloud) => {
        const x = cloud.x;
        const y = cloud.y;
        ctx.fillRect(x + 10, y, 28, 5);
        ctx.fillRect(x + 4, y + 4, 40, 5);
        ctx.fillRect(x, y + 8, 48, 5);
      });
    };

    // Draw Dino (Standing / Running / Ducking / Dead)
    const drawDino = (colors) => {
      const state = stateRef.current;
      const x = dinoX;
      const y = state.dinoY;
      const isJumping = state.isJumping;
      const isDucking = state.isDucking;
      const isDead = state.gameState === 'gameover';
      const legFrame = state.legFrame;

      ctx.fillStyle = colors.onyx;

      if (isDucking && !isJumping) {
        // DUCKING DINO (Height 20, Width 42)
        ctx.fillRect(x + 20, y + 4, 20, 9); // Head
        ctx.fillStyle = colors.eye;
        ctx.fillRect(x + 32, y + 6, 3, 3);  // Eye
        ctx.fillStyle = colors.onyx;

        ctx.fillRect(x, y + 7, 26, 10);     // Body
        ctx.fillRect(x - 4, y + 7, 5, 5);   // Tail
        ctx.fillRect(x + 22, y + 12, 4, 3); // Arm

        // Legs animation
        if (legFrame % 2 === 0) {
          ctx.fillRect(x + 6, y + 17, 4, 3);
          ctx.fillRect(x + 18, y + 17, 4, 2);
        } else {
          ctx.fillRect(x + 6, y + 17, 4, 2);
          ctx.fillRect(x + 18, y + 17, 4, 3);
        }
        return;
      }

      // STANDING / RUNNING DINO (Height 32, Width 28)
      ctx.fillRect(x + 5, y + 9, 18, 16);
      ctx.fillRect(x + 14, y, 16, 14);

      // Eye
      if (isDead) {
        ctx.fillStyle = colors.eye;
        ctx.fillRect(x + 22, y + 3, 2, 2);
        ctx.fillRect(x + 25, y + 3, 2, 2);
        ctx.fillRect(x + 23.5, y + 4.5, 2, 2);
        ctx.fillRect(x + 22, y + 6, 2, 2);
        ctx.fillRect(x + 25, y + 6, 2, 2);
      } else {
        ctx.fillStyle = colors.eye;
        ctx.fillRect(x + 23, y + 3.5, 3, 3);
      }

      ctx.fillStyle = colors.onyx;
      ctx.fillRect(x, y + 11, 6, 8);      // Tail
      ctx.fillRect(x + 21, y + 14, 5, 3.5); // Arm

      // Legs Animation
      if (isJumping) {
        ctx.fillRect(x + 8, y + 25, 4, 7);
        ctx.fillRect(x + 17, y + 25, 4, 7);
      } else {
        if (legFrame % 2 === 0) {
          ctx.fillRect(x + 8, y + 25, 4, 7.5);
          ctx.fillRect(x + 17, y + 23, 4, 4.5);
        } else {
          ctx.fillRect(x + 8, y + 23, 4, 4.5);
          ctx.fillRect(x + 17, y + 25, 4, 7.5);
        }
      }
    };

    // Draw Obstacles (Small Cactus, Large Cactus, Pterodactyl Bird)
    const drawObstacle = (obs, colors) => {
      ctx.fillStyle = colors.onyx;

      if (obs.kind === 'bird') {
        // PTERODACTYL
        const wingUp = Math.floor(stateRef.current.frameCount / 10) % 2 === 0;
        const x = obs.x;
        const y = obs.y;

        ctx.fillRect(x + 10, y + 8, 18, 8);
        ctx.fillRect(x + 28, y + 6, 10, 5);
        ctx.fillRect(x + 34, y + 8, 4, 2);
        ctx.fillRect(x + 2, y + 10, 8, 4);

        if (wingUp) {
          ctx.fillRect(x + 14, y, 6, 9);
          ctx.fillRect(x + 16, y - 5, 4, 5);
        } else {
          ctx.fillRect(x + 14, y + 14, 6, 9);
          ctx.fillRect(x + 16, y + 21, 4, 5);
        }
        return;
      }

      // CACTI
      const isLarge = obs.kind === 'largeCactus';
      const height = obs.height;
      const count = obs.count || 1;

      for (let c = 0; c < count; c++) {
        const cx = obs.x + c * (isLarge ? 22 : 16);
        const cy = obs.y;

        if (isLarge) {
          // Large Cactus (46px tall)
          ctx.fillRect(cx + 7, cy, 8, height);
          ctx.fillRect(cx, cy + 12, 8, 5);
          ctx.fillRect(cx, cy + 6, 5, 11);
          ctx.fillRect(cx + 14, cy + 18, 8, 5);
          ctx.fillRect(cx + 17, cy + 12, 5, 11);
        } else {
          // Small Cactus (34px tall)
          ctx.fillRect(cx + 5, cy, 6, height);
          ctx.fillRect(cx, cy + 9, 6, 4);
          ctx.fillRect(cx, cy + 5, 4, 8);
          ctx.fillRect(cx + 10, cy + 13, 6, 4);
          ctx.fillRect(cx + 12, cy + 9, 4, 8);
        }
      }
    };

    const loop = () => {
      const state = stateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = getThemeColors();

      // --- DRAW CLOUDS ---
      state.clouds.forEach((cloud) => {
        if (state.gameState === 'playing') {
          cloud.x -= state.speed * 0.25;
          if (cloud.x < -60) {
            cloud.x = canvas.width + Math.random() * 60;
            cloud.y = 20 + Math.random() * 35;
          }
        }
      });
      drawClouds(colors);

      // --- GROUND LINE ---
      ctx.strokeStyle = colors.groundLine;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // --- SCROLLING GROUND PEBBLES ---
      ctx.fillStyle = colors.groundDots;
      state.groundPebbles.forEach((p) => {
        if (state.gameState === 'playing') {
          p.x -= state.speed;
          if (p.x < -10) p.x = canvas.width + Math.random() * 20;
        }
        ctx.fillRect(p.x, p.y, p.w, 2);
      });

      if (state.gameState === 'playing') {
        state.frameCount++;
        state.score += 1;
        const currentScoreVal = Math.floor(state.score / 5);
        setScore(currentScoreVal);

        // Level & Speed Progression
        const newLevel = Math.floor(currentScoreVal / 100) + 1;
        if (newLevel !== state.level) {
          state.level = newLevel;
          setLevel(newLevel);
          setToast(`LEVEL UP! LEVEL ${newLevel}`);
        }

        // Speed accelerates smoothly per level
        state.speed = Math.min(13.5, 6.0 + (state.level - 1) * 0.6);

        // Milestone Toasts
        if (currentScoreVal === 100) setToast(EASTER_EGG_MESSAGES[0]);
        if (currentScoreVal === 250) setToast(EASTER_EGG_MESSAGES[1]);
        if (currentScoreVal === 450) setToast(EASTER_EGG_MESSAGES[2]);
        if (currentScoreVal === 700) setToast(EASTER_EGG_MESSAGES[3]);

        // Dino Physics & Gravity
        state.dinoVy += 0.62; // Gravity
        state.dinoY += state.dinoVy;

        const currentDinoHeight = state.isDucking && !state.isJumping ? 20 : 32;
        const maxDinoY = groundY - currentDinoHeight;

        if (state.dinoY >= maxDinoY) {
          state.dinoY = maxDinoY;
          state.dinoVy = 0;
          state.isJumping = false;
        }

        if (state.frameCount % 7 === 0) {
          state.legFrame = (state.legFrame + 1) % 2;
        }

        // --- OBSTACLE SPAWNING (Starts after initial runway of 90 frames) ---
        const minGapPixels = 260 + Math.random() * 180;
        const lastObsX = state.obstacles.length > 0 ? state.obstacles[state.obstacles.length - 1].x : 0;

        if (state.frameCount > 90 && (state.obstacles.length === 0 || canvas.width - lastObsX >= minGapPixels)) {
          const rand = Math.random();

          // Birds unlock at Level 2+ (Score >= 200)
          if (currentScoreVal >= 200 && rand > 0.65) {
            const altitudes = [groundY - 26, groundY - 48, groundY - 70];
            const altY = altitudes[Math.floor(Math.random() * altitudes.length)];

            state.obstacles.push({
              x: canvas.width,
              y: altY,
              width: 38,
              height: 24,
              kind: 'bird',
            });
          } else if (rand > 0.35) {
            // Large Cactus
            const count = Math.random() > 0.6 ? (Math.random() > 0.5 ? 3 : 2) : 1;
            const w = count * 24;
            state.obstacles.push({
              x: canvas.width,
              y: groundY - 46,
              width: w,
              height: 46,
              count,
              kind: 'largeCactus',
            });
          } else {
            // Small Cactus
            const count = Math.random() > 0.5 ? (Math.random() > 0.5 ? 3 : 2) : 1;
            const w = count * 16;
            state.obstacles.push({
              x: canvas.width,
              y: groundY - 34,
              width: w,
              height: 34,
              count,
              kind: 'smallCactus',
            });
          }
        }

        // --- OBSTACLE MOVEMENT & COLLISION DETECTION ---
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= state.speed;

          // Hitbox definition
          const dinoBox = state.isDucking && !state.isJumping
            ? {
                x: dinoX + 4,
                y: state.dinoY + 3,
                width: 34,
                height: 14,
              }
            : {
                x: dinoX + 4,
                y: state.dinoY + 3,
                width: 20,
                height: 26,
              };

          const obsBox = {
            x: obs.x + 3,
            y: obs.y + 3,
            width: obs.width - 6,
            height: obs.height - 3,
          };

          // AABB Intersection Test
          if (
            dinoBox.x < obsBox.x + obsBox.width &&
            dinoBox.x + dinoBox.width > obsBox.x &&
            dinoBox.y < obsBox.y + obsBox.height &&
            dinoBox.y + dinoBox.height > obsBox.y
          ) {
            // GAME OVER
            setGameState('gameover');
            state.gameState = 'gameover';
            const finalScore = Math.floor(state.score / 5);

            if (finalScore > state.highScore) {
              setHighScore(finalScore);
              state.highScore = finalScore;
              localStorage.setItem('mj_dino_high_score', finalScore.toString());
            }
          }

          if (obs.x + obs.width < 0) {
            state.obstacles.splice(i, 1);
          }
        }
      }

      // DRAW GAME CHARACTERS
      drawDino(colors);
      state.obstacles.forEach((obs) => drawObstacle(obs, colors));

      animationFrameId = requestAnimationFrame(loop);
    };

    resetGame();
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  // Jump Action Handler
  const triggerJump = () => {
    const state = stateRef.current;
    if (state.gameState === 'idle') {
      setGameState('playing');
      state.gameState = 'playing';
      state.dinoVy = -10.8;
      state.isJumping = true;
    } else if (state.gameState === 'playing' && !state.isJumping) {
      state.dinoVy = -10.8;
      state.isJumping = true;
    } else if (state.gameState === 'gameover') {
      setGameState('playing');
      state.gameState = 'playing';
      state.dinoY = 150 - 32;
      state.dinoVy = -10.8;
      state.isJumping = true;
      state.isDucking = false;
      state.obstacles = [];
      state.score = 0;
      state.level = 1;
      state.speed = 6;
      state.frameCount = 0;
      setScore(0);
      setLevel(1);
      setToast('');
    }
  };

  // Duck Action Handler
  const triggerDuck = (ducking) => {
    const state = stateRef.current;
    if (state.gameState === 'playing') {
      state.isDucking = ducking;
      setIsTouchDucking(ducking);

      // Fast Drop if ducking mid-air
      if (ducking && state.isJumping) {
        state.dinoVy += 4.5;
      }
    }
  };

  // Keyboard Event Listeners (Space/Up to Jump, Down/S to Duck)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          triggerJump();
        }
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          triggerDuck(true);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        triggerDuck(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-full flex flex-col items-center">
      {/* Game Card Container */}
      <div
        onClick={triggerJump}
        tabIndex={0}
        role="button"
        aria-label="Play endless dinosaur runner game"
        className="relative w-full h-38 sm:h-48.25 md:h-54.5 lg:h-58 bg-surface border border-border-subtle rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-700 hover:shadow-xl touch-none"
      >
        {/* Top Header Row: Title, Level & Scores */}
        <div className="flex items-center justify-between w-full z-10 text-[10px] sm:text-xs font-mono px-1 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-onyx text-[10px] sm:text-xs transition-colors duration-700">
              DINO RUNNER
            </span>
            <span className="px-2 py-0.5 rounded-full bg-onyx/10 text-onyx text-[9px] sm:text-[10px] font-bold flex items-center gap-1 transition-colors duration-700">
              <Zap size={10} className="text-accent" />
              LVL {level}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {highScore > 0 && (
              <span className="flex items-center gap-1 text-subtle transition-colors duration-700">
                <Trophy size={13} className="text-amber-500 hidden sm:inline" />
                <span>HI {highScore.toString().padStart(5, '0')}</span>
              </span>
            )}
            <span className="font-bold text-onyx transition-colors duration-700">
              {score.toString().padStart(5, '0')}
            </span>
          </div>
        </div>

        {/* Dynamic Milestone & Level Up Banner */}
        {toast && (
          <div className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-onyx text-porcelain text-[9px] sm:text-xs font-mono font-semibold rounded-full shadow-lg animate-bounce pointer-events-none whitespace-nowrap transition-colors duration-700">
            {toast}
          </div>
        )}

        {/* High-Definition 900x180 Canvas */}
        <canvas
          ref={canvasRef}
          width={900}
          height={180}
          className="w-full h-full object-fill pointer-events-none"
        />

        {/* State Overlays */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-md flex flex-col items-center justify-center gap-1 sm:gap-1.5 z-20 pointer-events-none px-4 text-center transition-colors duration-700">
            <span className="px-4 py-2 rounded-full bg-onyx text-porcelain text-[10px] sm:text-xs font-mono font-bold tracking-wider shadow-md transition-colors duration-700">
              Tap or Press Space to Run
            </span>
            <span className="text-[9px] sm:text-xs font-mono text-subtle transition-colors duration-700">
              Space / Up to Jump • Down Arrow to Duck
            </span>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-surface/85 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 z-20 px-4 text-center transition-colors duration-700">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-onyx uppercase tracking-wider transition-colors duration-700">
              <span>GAME OVER</span>
              <span>•</span>
              <span>SCORE: {score}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerJump();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-onyx text-porcelain text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 shadow-md transition-all duration-300 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Tap or Space to Retry</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch Action Controls Bar */}
      {gameState === 'playing' && (
        <div className="mt-2.5 flex items-center justify-center gap-4 w-full sm:hidden z-10">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              triggerDuck(true);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              triggerDuck(false);
            }}
            className={`flex-1 py-2 rounded-xl border border-border-subtle text-xs font-mono font-bold uppercase flex items-center justify-center gap-1 ${
              isTouchDucking ? 'bg-onyx text-porcelain' : 'bg-surface text-onyx'
            }`}
          >
            <ChevronDown size={14} /> DUCK
          </button>
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              triggerJump();
            }}
            className="flex-1 py-2 rounded-xl bg-onyx text-porcelain text-xs font-mono font-bold uppercase flex items-center justify-center gap-1"
          >
            JUMP ⬆
          </button>
        </div>
      )}
    </div>
  );
}



