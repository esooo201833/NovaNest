import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Custom text component using canvas texture
function TextMesh({ text, position, color, fontSize = 1 }) {
  const meshRef = useRef();
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Clear
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 256, 256);
    
    // Draw text
    ctx.font = `bold ${fontSize * 60}px Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 128);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [text, color, fontSize]);
  
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[fontSize * 0.8, fontSize * 0.8]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.1} />
    </mesh>
  );
}

// Character component with physics-like movement
function Character({ letter, position, isN, isRunning, target, onShoot, phase }) {
  const meshRef = useRef();
  const velocity = useRef(new THREE.Vector3());
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    if (phase === 0 && isRunning) {
      // Running phase
      const speed = isN ? 4 : 3.5;
      velocity.current.x = speed;
      meshRef.current.position.x += velocity.current.x * delta;
      
      // Bobbing motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.1;
    } else if (phase === 1 && isN && target) {
      // Chase phase - N follows target
      const direction = new THREE.Vector3(...target).sub(meshRef.current.position);
      direction.y = 0;
      direction.normalize();
      
      meshRef.current.position.add(direction.multiplyScalar(4 * delta));
      meshRef.current.lookAt(...target);
      
      // Shoot occasionally
      if (Math.random() < 0.05) {
        onShoot(meshRef.current.position.clone(), direction.clone());
      }
    } else if (phase === 1 && !isN) {
      // Others run away
      velocity.current.x = 2;
      meshRef.current.position.x += velocity.current.x * delta;
    } else if (phase === 2) {
      // Align phase
      const targetX = position[0];
      const targetY = position[1];
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 2 * delta;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 2 * delta;
      meshRef.current.rotation.z *= 0.9;
      meshRef.current.rotation.y *= 0.9;
    }
  });
  
  return (
    <group ref={meshRef} position={position}>
      {/* Character body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 0.5]} />
        <meshStandardMaterial 
          color={isN ? '#8a3b12' : '#eadbc8'}
          roughness={0.3}
          metalness={isN ? 0.6 : 0.1}
        />
      </mesh>
      
      {/* Letter text */}
      <TextMesh 
        text={letter}
        position={[0, 0, 0.3]}
        color={isN ? '#ffffff' : '#5a2d10'}
        fontSize={1.2}
      />
      
      {/* Gun for N */}
      {isN && (
        <group position={[0.8, 0, 0.2]} rotation={[0, 0, -0.3]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.15, 0.15]} />
            <meshStandardMaterial color="#333" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0.4, 0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.3]} rotation={[0, 0, Math.PI/2]} />
            <meshStandardMaterial color="#222" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>
      )}
      
      {/* Glow effect for N */}
      {isN && (
        <pointLight 
          color="#ff8800" 
          intensity={2} 
          distance={3}
          position={[0, 0, 0.5]}
        />
      )}
    </group>
  );
}

// Bullet component
function Bullet({ id, position, direction, onHit }) {
  const meshRef = useRef();
  const startTime = useRef(Date.now());
  const dir = useMemo(() => new THREE.Vector3(...direction), [direction]);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    meshRef.current.position.add(dir.clone().multiplyScalar(15 * delta));
    
    // Auto remove after 2 seconds or out of bounds
    const age = Date.now() - startTime.current;
    if (age > 2000 || meshRef.current.position.x > 20 || meshRef.current.position.x < -20) {
      onHit(id);
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08]} />
      <meshBasicMaterial color="#ffcc00" />
    </mesh>
  );
}

// Explosion particles
function Explosion({ position }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [position[0], position[1], position[2]],
        velocity: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        ],
        scale: Math.random() * 0.3 + 0.1,
        color: ['#ff4400', '#ff8800', '#ffaa00', '#ffcc00'][Math.floor(Math.random() * 4)]
      });
    }
    return temp;
  }, [position]);
  
  return (
    <>
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </>
  );
}

function Particle({ position, velocity, scale, color }) {
  const meshRef = useRef();
  const vel = useRef(new THREE.Vector3(...velocity));
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.add(vel.current.clone().multiplyScalar(delta));
    vel.current.y -= 2 * delta; // gravity
    meshRef.current.scale.multiplyScalar(0.95);
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[scale]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Muzzle flash
function MuzzleFlash({ position }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.3]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <coneGeometry args={[0.2, 0.5, 8]} rotation={[0, 0, -Math.PI/2]} />
        <meshBasicMaterial color="#ffcc00" transparent opacity={0.6} />
      </mesh>
      <pointLight color="#ff8800" intensity={5} distance={2} />
    </group>
  );
}

// Logo component
function Logo({ visible }) {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (!groupRef.current || !visible) return;
    
    if (groupRef.current.position.y > 0) {
      groupRef.current.position.y -= 3 * delta;
    }
    groupRef.current.rotation.y += delta * 0.5;
  });
  
  if (!visible) return null;
  
  return (
    <group ref={groupRef} position={[0, 8, 0]}>
      <Center>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh castShadow>
            <sphereGeometry args={[1.5]} />
            <meshStandardMaterial 
              color="#8a3b12"
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
          <TextMesh
            text="NovaNest"
            position={[-0.8, -0.2, 1.6]}
            color="#ffffff"
            fontSize={0.8}
          />
        </Float>
      </Center>
      <Sparkles count={50} scale={4} size={2} speed={1} color="#ff8800" />
    </group>
  );
}

// Scene component
function Scene({ phase, setPhase, onComplete }) {
  const { camera } = useThree();
  const [bullets, setBullets] = useState([]);
  const [muzzleFlashes, setMuzzleFlashes] = useState([]);
  const [showLogo, setShowLogo] = useState(false);
  
  const brandName = 'NovaNest';
  const chars = useMemo(() => brandName.split('').map((letter, i) => ({
    letter,
    isN: i === 0,
    position: [-8 - (i * 1.5), 0, 0],
    finalPosition: [-3 + (i * 1.5), 0, 0]
  })), []);
  
  const handleShoot = (pos, dir) => {
    const bulletId = Date.now() + Math.random();
    setBullets(prev => [...prev, { 
      id: bulletId, 
      position: pos.toArray(), 
      direction: dir.toArray() 
    }]);
    setMuzzleFlashes(prev => [...prev, { id: bulletId, position: [pos.x + 0.5, pos.y, pos.z] }]);
    setTimeout(() => setMuzzleFlashes(prev => prev.filter(f => f.id !== bulletId)), 100);
  };
  
  const handleBulletHit = (bulletId) => {
    setBullets(prev => prev.filter(b => b.id !== bulletId));
  };
  
  useEffect(() => {
    // Phase timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          onComplete?.();
        }, 1000);
      }
    });
    
    tl.call(() => setPhase(0), [], 0)
      .to({}, { duration: 2, onComplete: () => setPhase(1) }, 2)
      .to({}, { duration: 3, onComplete: () => setPhase(2) }, 5)
      .to({}, { duration: 2, onComplete: () => setShowLogo(true) }, 7)
      .to({}, { duration: 2 });
    
    return () => {
      tl.kill();
      tl.clear();
    };
  }, [onComplete, setPhase, setShowLogo]);
  
  useFrame((state) => {
    // Camera follow N during chase
    if (phase === 1) {
      camera.position.x += (-2 - camera.position.x) * 0.02;
      camera.lookAt(0, 0, 0);
    } else if (phase === 2) {
      camera.position.x += (-3 - camera.position.x) * 0.02;
      camera.lookAt(-3, 0, 0);
    } else if (phase === 0) {
      // Initial view from left
      camera.lookAt(-5, 0, 0);
    }
  });
  
  return (
    <>
      {/* Background color */}
      <color attach="background" args={['#1a1a1a']} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#1a1a1a', 10, 50]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#8a3b12" />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Grid helper */}
      <gridHelper args={[50, 50, '#8a3b12', '#444444']} position={[0, -0.98, 0]} />
      
      {/* Characters */}
      {chars.map((char, i) => (
        <Character
          key={i}
          letter={char.letter}
          position={char.position}
          isN={char.isN}
          isRunning={phase === 0}
          target={char.isN ? chars[chars.length - 1].finalPosition : null}
          onShoot={handleShoot}
          phase={phase}
        />
      ))}
      
      {/* Bullets */}
      {bullets.map(bullet => (
        <Bullet
          key={bullet.id}
          id={bullet.id}
          position={bullet.position}
          direction={bullet.direction}
          onHit={handleBulletHit}
        />
      ))}
      
      {/* Muzzle flashes */}
      {muzzleFlashes.map(flash => (
        <MuzzleFlash key={flash.id} position={flash.position} />
      ))}
      
      {/* Logo */}
      <Logo visible={showLogo} />
    </>
  );
}

// Main component
const HeroIntroAnimation3D = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (isComplete) {
      onComplete?.();
    }
  }, [isComplete, onComplete]);
  
  if (isComplete) return null;
  
  return (
    <div className="fixed inset-0 z-[9999]" style={{ background: '#1a1a1a' }}>
      <Canvas
        shadows
        camera={{ position: [-5, 4, 15], fov: 50, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={1}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene 
          phase={phase}
          setPhase={setPhase}
          onComplete={() => setIsComplete(true)}
        />
      </Canvas>
      
      {/* Skip button */}
      <button
        onClick={() => setIsComplete(true)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[#8a3b12] text-white rounded-lg hover:bg-[#6b2a0a] transition-colors text-sm font-medium z-10"
      >
        Skip Animation
      </button>
    </div>
  );
};

export default HeroIntroAnimation3D;
