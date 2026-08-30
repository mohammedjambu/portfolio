import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

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
  const [toast, setToast] = useState('');

  const stateRef = useRef({
    gameState: 'idle',
    score: 0,
    highScore: 0,
    dinoY: 0,
    dinoVy: 0,
    isJumping: false,
    legFrame: 0,
    frameCount: 0,
    obstacles: [],
    speed: 6,
    lastSpawn: 0,
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

    const groundY = canvas.height - 28;
    // Position Dino at 8% of visible canvas width so it is ALWAYS visible across all screen sizes
    const dinoX = Math.round(canvas.width * 0.08);
    const dinoWidth = 28;
    const dinoHeight = 32;

    const resetGame = () => {
      stateRef.current.dinoY = groundY - dinoHeight;
      stateRef.current.dinoVy = 0;
      stateRef.current.isJumping = false;
      stateRef.current.obstacles = [];
      stateRef.current.speed = 6;
      stateRef.current.score = 0;
      stateRef.current.lastSpawn = 0;
      setScore(0);
      setToast('');
    };

    const drawDino = (x, y, isJumping, legFrame) => {
      const isDark = document.documentElement.classList.contains('dark');
      const mainColor = isDark ? '#F8F9FA' : '#111113';
      const eyeColor = isDark ? '#090A0D' : '#F8F9FA';

      ctx.fillStyle = mainColor;

      // Dino Body
      ctx.fillRect(x + 5, y + 9, 18, 16);
      // Dino Head
      ctx.fillRect(x + 14, y, 16, 14);
      // Eye Dot
      ctx.fillStyle = eyeColor;
      ctx.fillRect(x + 23, y + 3.5, 3, 3);

      // Tail
      ctx.fillStyle = mainColor;
      ctx.fillRect(x, y + 11, 6, 8);

      // Arms
      ctx.fillRect(x + 21, y + 14, 5, 3.5);

      // Legs animation
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

    const drawObstacle = (obs) => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#F8F9FA' : '#111113';
      if (obs.type === 'single') {
        ctx.fillRect(obs.x + 6, obs.y, 8, obs.height);
        ctx.fillRect(obs.x, obs.y + 8, 6, 14);
        ctx.fillRect(obs.x + 14, obs.y + 14, 6, 11);
      } else {
        // Double Cacti
        ctx.fillRect(obs.x + 2, obs.y, 7, obs.height);
        ctx.fillRect(obs.x + 15, obs.y + 6, 7, obs.height - 6);
      }
    };

    const loop = () => {
      const state = stateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(255,255,255,0.2)' : '#111113';

      // --- GROUND LINE ---
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Moving Ground Dots/Dashes across wide track
      ctx.fillStyle = '#A1A1AA';
      const offset = (state.frameCount * state.speed) % 26;
      for (let i = -offset; i < canvas.width; i += 26) {
        ctx.fillRect(i, groundY + 6, 9, 2);
      }

      if (state.gameState === 'playing') {
        state.frameCount++;
        state.score += 1;
        setScore(Math.floor(state.score / 5));

        // Speed increases gradually
        state.speed = 6 + Math.floor(state.score / 450) * 0.6;

        // Easter Egg Toast Notifications at Milestones
        const currentScoreVal = Math.floor(state.score / 5);
        if (currentScoreVal === 100) setToast(EASTER_EGG_MESSAGES[0]);
        if (currentScoreVal === 250) setToast(EASTER_EGG_MESSAGES[1]);
        if (currentScoreVal === 450) setToast(EASTER_EGG_MESSAGES[2]);
        if (currentScoreVal === 700) setToast(EASTER_EGG_MESSAGES[3]);

        // Dino Physics
        state.dinoVy += 0.62; // Gravity
        state.dinoY += state.dinoVy;

        if (state.dinoY >= groundY - dinoHeight) {
          state.dinoY = groundY - dinoHeight;
          state.dinoVy = 0;
          state.isJumping = false;
        }

        if (state.frameCount % 8 === 0) {
          state.legFrame = (state.legFrame + 1) % 2;
        }

        // Obstacle Spawning with responsive spacing
        if (state.frameCount - state.lastSpawn > 85 + Math.random() * 75) {
          const obsHeight = 30 + Math.random() * 9;
          state.obstacles.push({
            x: canvas.width,
            y: groundY - obsHeight,
            width: 22,
            height: obsHeight,
            type: Math.random() > 0.5 ? 'single' : 'double',
          });
          state.lastSpawn = state.frameCount;
        }

        // Obstacle Movement & Collision Detection
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= state.speed;

          // AABB Bounding Box Collision with padding
          const dinoBox = {
            x: dinoX + 4,
            y: state.dinoY + 2,
            width: dinoWidth - 6,
            height: dinoHeight - 2,
          };
          const obsBox = {
            x: obs.x + 2,
            y: obs.y,
            width: obs.width - 4,
            height: obs.height,
          };

          if (
            dinoBox.x < obsBox.x + obsBox.width &&
            dinoBox.x + dinoBox.width > obsBox.x &&
            dinoBox.y < obsBox.y + obsBox.height &&
            dinoBox.y + dinoBox.height > obsBox.y
          ) {
            // GAME OVER TRIGGERED
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

      // DRAW DINO & OBSTACLES (dinoX is always visible at 8% from left)
      drawDino(dinoX, state.dinoY || groundY - dinoHeight, state.isJumping, state.legFrame);
      state.obstacles.forEach(drawObstacle);

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
      state.dinoVy = -10.5;
      state.isJumping = true;
    } else if (state.gameState === 'playing' && !state.isJumping) {
      state.dinoVy = -10.5;
      state.isJumping = true;
    } else if (state.gameState === 'gameover') {
      setGameState('playing');
      state.gameState = 'playing';
      state.dinoY = 180 - 28 - 32;
      state.dinoVy = -10.5;
      state.isJumping = true;
      state.obstacles = [];
      state.score = 0;
      state.speed = 6;
      setScore(0);
      setToast('');
    }
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          triggerJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Touch Event Handler for Mobile Devices
  const handleTouchStart = (e) => {
    e.preventDefault();
    triggerJump();
  };

  return (
    <div ref={containerRef} className="w-full max-w-full flex flex-col items-center">
      {/* Game Card Container - Height scales for large screens while staying compact on mobile */}
      <div
        onClick={triggerJump}
        onTouchStart={handleTouchStart}
        tabIndex={0}
        role="button"
        aria-label="Play endless dinosaur runner game"
        className="relative w-full h-35 sm:h-46.25 md:h-52.5 lg:h-55 bg-white border border-black/10 rounded-2xl p-3.5 sm:p-5 shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow hover:shadow-md touch-none"
      >
        {/* Top Header Row: Title & Scores */}
        <div className="flex items-center justify-between w-full z-10 text-[10px] sm:text-xs font-mono text-subtle px-1 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-porcelain-950 text-[10px] sm:text-xs">
              DINO RUNNER
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {highScore > 0 && (
              <span className="flex items-center gap-1 text-subtle">
                <Trophy size={13} className="text-amber-500 hidden sm:inline" />
                <span>HI {highScore.toString().padStart(5, '0')}</span>
              </span>
            )}
            <span className="font-bold text-porcelain-950">
              SCORE {score.toString().padStart(5, '0')}
            </span>
          </div>
        </div>

        {/* Dynamic Easter Egg Toast Banner */}
        {toast && (
          <div className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 z-20 px-3 sm:px-3.5 py-1 bg-porcelain-950 text-white text-[9px] sm:text-xs font-mono rounded-full shadow-md animate-bounce pointer-events-none whitespace-nowrap">
            {toast}
          </div>
        )}

        {/* High-Definition Canvas (height increased to 180px for desktop clarity) */}
        <canvas
          ref={canvasRef}
          width={900}
          height={180}
          className="w-full h-full object-fill pointer-events-none"
        />

        {/* State Overlays */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1 sm:gap-1.5 z-20 pointer-events-none px-4 text-center">
            <span className="px-3.5 sm:px-4 py-1.5 rounded-full bg-porcelain-950 text-white text-[10px] sm:text-xs font-mono font-medium shadow-sm">
              Tap or Press Space to Run
            </span>
            <span className="text-[9px] sm:text-xs font-mono text-subtle">
              Tap anywhere or use Spacebar / Arrow Up to jump
            </span>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 z-20 px-4 text-center">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-porcelain-950">
              <span>GAME OVER</span>
              <span>•</span>
              <span>SCORE: {score}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerJump();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.preventDefault();
                triggerJump();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-porcelain-950 text-white text-xs font-mono font-medium hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Tap or Space to Retry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
