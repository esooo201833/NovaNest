import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { gsap } from 'gsap';

const HeroIntroAnimation = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Setup Matter.js physics engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 }
    });
    engineRef.current = engine;
    const world = engine.world;

    // Create runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    const groundY = canvas.height * 0.65;
    const letterSize = 70;

    // Create ground
    const ground = Matter.Bodies.rectangle(
      canvas.width / 2, 
      groundY + 40, 
      canvas.width + 200, 
      80, 
      { 
        isStatic: true,
        render: { fillStyle: '#1a1a1a' }
      }
    );
    Matter.World.add(world, ground);

    // Create walls
    const leftWall = Matter.Bodies.rectangle(-50, canvas.height / 2, 100, canvas.height, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(canvas.width + 50, canvas.height / 2, 100, canvas.height, { isStatic: true });
    Matter.World.add(world, [leftWall, rightWall]);

    // Create physics-based letter bodies
    const brandName = 'NovaNest';
    const letterBodies = [];
    const bullets = [];
    let nBody = null;

    brandName.split('').forEach((letter, index) => {
      const isN = index === 0;
      const startX = -200 - (index * 90);
      
      const body = Matter.Bodies.rectangle(
        startX,
        groundY - 120,
        letterSize,
        letterSize,
        {
          restitution: 0.4,
          friction: 0.6,
          frictionAir: 0.015,
          density: 0.003,
          chamfer: { radius: 12 },
          label: letter,
          isN: isN,
          hasGun: isN,
          isHit: false,
          hitTime: 0
        }
      );
      
      if (isN) nBody = body;
      letterBodies.push(body);
    });

    Matter.World.add(world, letterBodies);

    // Muzzle flash particles
    const muzzleFlash = [];
    const particles = [];
    let screenShake = 0;

    // Bullet physics body
    const createBullet = (x, y, angle) => {
      const bullet = Matter.Bodies.circle(x, y, 6, {
        frictionAir: 0,
        restitution: 0,
        density: 0.002,
        isBullet: true,
        render: { fillStyle: '#ffcc00' }
      });
      
      const speed = 30;
      Matter.Body.setVelocity(bullet, {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      });
      
      Matter.World.add(world, bullet);
      bullets.push({ body: bullet, active: true, born: Date.now() });
      
      // Add muzzle flash
      for (let i = 0; i < 8; i++) {
        muzzleFlash.push({
          x: x + Math.cos(angle) * 20,
          y: y + Math.sin(angle) * 20,
          vx: Math.cos(angle + (Math.random() - 0.5) * 0.5) * (3 + Math.random() * 4),
          vy: Math.sin(angle + (Math.random() - 0.5) * 0.5) * (3 + Math.random() * 4),
          size: 8 + Math.random() * 12,
          life: 1
        });
      }
      
      // Screen shake
      screenShake = 3;
      
      // Remove bullet after 1.5 seconds
      setTimeout(() => {
        const idx = bullets.findIndex(b => b.body === bullet);
        if (idx !== -1) {
          Matter.World.remove(world, bullet);
          bullets.splice(idx, 1);
        }
      }, 1500);
    };

    // Create explosion particles
    const createExplosion = (x, y) => {
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 / 15) * i + Math.random() * 0.3;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * (2 + Math.random() * 6),
          vy: Math.sin(angle) * (2 + Math.random() * 6),
          size: 4 + Math.random() * 8,
          life: 1,
          color: `hsl(${20 + Math.random() * 40}, 100%, ${50 + Math.random() * 30}%)`
        });
      }
      screenShake = 5;
    };

    // Apply forces for running animation
    let phase = 0;
    let phaseStartTime = Date.now();
    let shootTimer = 0;

    const applyRunningForces = () => {
      const now = Date.now();
      const elapsed = now - phaseStartTime;

      // Phase 0: Initial run (0-1.5s)
      if (phase === 0) {
        letterBodies.forEach((body, i) => {
          if (body.position.x < canvas.width * 0.15 + (i * 80)) {
            Matter.Body.applyForce(body, body.position, {
              x: 0.004 + (i === 0 ? 0.002 : 0),
              y: -0.002
            });
          }
        });

        if (elapsed > 1500) {
          phase = 1;
          phaseStartTime = now;
        }
      }
      // Phase 1: N chases others (1.5-4s)
      else if (phase === 1) {
        // N chases the last letter
        const target = letterBodies[letterBodies.length - 1];
        if (nBody && target) {
          const angle = Math.atan2(target.position.y - nBody.position.y, target.position.x - nBody.position.x);
          Matter.Body.applyForce(nBody, nBody.position, {
            x: Math.cos(angle) * 0.005,
            y: -0.003
          });
        }

        // Others run away
        letterBodies.forEach((body, i) => {
          if (i > 0 && body.position.x < canvas.width - 150) {
            Matter.Body.applyForce(body, body.position, {
              x: 0.003,
              y: Math.sin(now * 0.01 + i) * 0.0015
            });
          }
        });

        // Shooting
        shootTimer += 16;
        if (shootTimer > 120) {
          shootTimer = 0;
          
          // Find closest target
          let closest = null;
          let minDist = Infinity;
          letterBodies.forEach((body, i) => {
            if (i > 0) {
              const dx = body.position.x - nBody.position.x;
              const dy = body.position.y - nBody.position.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < minDist && dist < 500) {
                minDist = dist;
                closest = body;
              }
            }
          });

          if (closest) {
            const angle = Math.atan2(closest.position.y - nBody.position.y, closest.position.x - nBody.position.x);
            createBullet(nBody.position.x + 45, nBody.position.y, angle);
          }
        }

        if (elapsed > 2500) {
          phase = 2;
          phaseStartTime = now;
        }
      }
      // Phase 2: Align to form name (4-6s)
      else if (phase === 2) {
        const finalX = (canvas.width - (brandName.length * 85)) / 2;
        
        letterBodies.forEach((body, i) => {
          const targetX = finalX + (i * 85);
          const targetY = canvas.height / 2;
          
          // Strong spring force to position
          const dx = targetX - body.position.x;
          const dy = targetY - body.position.y;
          
          Matter.Body.setVelocity(body, {
            x: dx * 0.1,
            y: dy * 0.1
          });
          
          Matter.Body.setAngularVelocity(body, -body.angle * 0.12);
          
          body.isHit = false;
        });

        if (elapsed > 2000) {
          phase = 3;
          phaseStartTime = now;
        }
      }
      // Phase 3: Logo animation (6-8s)
      else if (phase === 3) {
        if (elapsed > 2000) {
          phase = 4;
          phaseStartTime = now;
        }
      }
      // Phase 4: Fade out (8-9s)
      else if (phase === 4) {
        const fadeProgress = elapsed / 1000;
        
        if (fadeProgress >= 1) {
          setAnimationComplete(true);
          if (onComplete) onComplete();
          Matter.Runner.stop(runner);
          return;
        }
      }
    };

    // Custom renderer
    const render = () => {
      ctx.save();
      
      // Screen shake
      if (screenShake > 0.5) {
        const shakeX = (Math.random() - 0.5) * screenShake;
        const shakeY = (Math.random() - 0.5) * screenShake;
        ctx.translate(shakeX, shakeY);
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Cinematic gradient background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 3, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      bgGradient.addColorStop(0, '#3d3d3d');
      bgGradient.addColorStop(0.4, '#1f1f1f');
      bgGradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground with gradient
      const groundGradient = ctx.createLinearGradient(0, groundY, 0, canvas.height);
      groundGradient.addColorStop(0, '#3a2a1a');
      groundGradient.addColorStop(0.3, '#1a1a1a');
      groundGradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, groundY + 35, canvas.width, canvas.height - groundY - 35);
      
      // Ground line glow
      ctx.shadowColor = '#8a3b12';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#8a3b12';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 35);
      ctx.lineTo(canvas.width, groundY + 35);
      ctx.stroke();
      ctx.shadowBlur = 0;

      const now = Date.now();
      const elapsed = phase === 3 ? now - phaseStartTime : 0;

      // Draw muzzle flash
      muzzleFlash.forEach(f => {
        ctx.save();
        ctx.globalAlpha = f.life;
        ctx.fillStyle = '#ff8800';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw explosion particles
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw letters
      letterBodies.forEach((body, i) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const isN = i === 0;
        const size = letterSize;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(8, size/2 + 8, size/2, size/4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body with 3D effect - more vibrant colors
        const gradient = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
        if (isN) {
          gradient.addColorStop(0, '#d48c5e');
          gradient.addColorStop(0.5, '#b86d3e');
          gradient.addColorStop(1, '#8a4b22');
        } else {
          gradient.addColorStop(0, '#fff5e6');
          gradient.addColorStop(0.5, '#f5e6d0');
          gradient.addColorStop(1, '#e8d8c0');
        }
        
        // Glow effect for N
        if (isN) {
          ctx.shadowColor = '#ff8800';
          ctx.shadowBlur = 15;
        }
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#8a3b12';
        ctx.lineWidth = 3;
        
        // Rounded rect
        ctx.beginPath();
        ctx.roundRect(-size/2, -size/2, size, size, 12);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-size/2 + 3, -size/2 + 3, size - 6, size/2 - 3, 9);
        ctx.stroke();

        // Letter - larger and more visible
        ctx.fillStyle = isN ? '#ffffff' : '#6b3410';
        ctx.font = `bold ${size * 0.55}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(body.label, 0, 3);

        // Draw gun for N - more detailed
        if (isN) {
          ctx.save();
          ctx.translate(size/2 - 5, 5);
          ctx.rotate(-0.25);
          
          // Gun glow
          ctx.shadowColor = '#ff6600';
          ctx.shadowBlur = 8;
          
          // Gun body
          const gunGradient = ctx.createLinearGradient(0, -5, 40, 5);
          gunGradient.addColorStop(0, '#555');
          gunGradient.addColorStop(0.5, '#333');
          gunGradient.addColorStop(1, '#222');
          
          ctx.fillStyle = gunGradient;
          ctx.fillRect(0, -5, 40, 10);
          
          // Barrel
          ctx.fillStyle = '#111';
          ctx.fillRect(36, -3, 20, 6);
          
          // Handle
          ctx.fillStyle = '#6b3a1a';
          ctx.fillRect(6, 5, 10, 16);
          
          ctx.restore();
        }

        ctx.restore();
      });

      // Draw bullets - larger and more visible
      bullets.forEach(bullet => {
        if (!bullet.active) return;
        const { x, y } = bullet.body.position;
        
        // Bright trail
        ctx.strokeStyle = 'rgba(255, 220, 100, 0.8)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x - bullet.body.velocity.x * 0.15, y - bullet.body.velocity.y * 0.15);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Bullet core
        ctx.fillStyle = '#ffee00';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer glow
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 15;
        ctx.fillStyle = 'rgba(255, 180, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw logo in phase 3
      if (phase >= 3 && phase < 5) {
        const logoProgress = Math.min(elapsed / 1000, 1);
        const logoY = -150 + logoProgress * (canvas.height / 2 + 150);
        
        ctx.save();
        ctx.translate(canvas.width / 2, logoY);
        
        // Logo shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(8, 85, 75, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow behind logo
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 30;
        
        // Logo circle with 3D effect
        const logoGradient = ctx.createRadialGradient(-20, -20, 0, 0, 0, 85);
        logoGradient.addColorStop(0, '#f0d0b0');
        logoGradient.addColorStop(0.4, '#c87d4e');
        logoGradient.addColorStop(1, '#7a3a1a');
        
        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        ctx.fillStyle = logoGradient;
        ctx.fill();
        
        ctx.strokeStyle = '#eadbc8';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Inner highlight
        ctx.beginPath();
        ctx.arc(-18, -18, 45, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Logo text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('NovaNest', 0, 0);
        ctx.restore();
      }

      // Fade overlay
      if (phase === 4) {
        const fadeProgress = Math.min((now - phaseStartTime) / 1000, 1);
        ctx.fillStyle = `rgba(234, 219, 200, ${fadeProgress})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.restore();

      if (!animationComplete) {
        requestAnimationFrame(render);
      }
    };

    // Run physics and render
    Matter.Runner.run(runner, engine);
    render();

    // Physics update loop
    const physicsInterval = setInterval(() => {
      applyRunningForces();
      
      // Decay screen shake
      screenShake *= 0.9;
      
      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        p.size *= 0.95;
        if (p.life <= 0) particles.splice(i, 1);
      }
      
      // Update muzzle flash
      for (let i = muzzleFlash.length - 1; i >= 0; i--) {
        const f = muzzleFlash[i];
        f.x += f.vx;
        f.y += f.vy;
        f.life -= 0.08;
        f.size *= 0.9;
        if (f.life <= 0) muzzleFlash.splice(i, 1);
      }
      
      // Check bullet collisions
      bullets.forEach((bullet, bIdx) => {
        if (!bullet.active) return;
        letterBodies.forEach((body, i) => {
          if (i > 0) {
            const dx = bullet.body.position.x - body.position.x;
            const dy = bullet.body.position.y - body.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 45) {
              createExplosion(body.position.x, body.position.y);
              // Apply impact force
              Matter.Body.applyForce(body, body.position, {
                x: bullet.body.velocity.x * 0.002,
                y: -0.008
              });
              // Remove bullet
              Matter.World.remove(world, bullet.body);
              bullets.splice(bIdx, 1);
            }
          }
        });
      });
    }, 16);

    // Cleanup
    return () => {
      clearInterval(physicsInterval);
      window.removeEventListener('resize', resizeCanvas);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, [onComplete]);

  if (animationComplete) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 9999 }}
    />
  );
};

export default HeroIntroAnimation;
