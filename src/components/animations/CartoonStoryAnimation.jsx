import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Text texture generator
function useTextTexture(text, color = '#333', fontSize = 60, bgColor = null) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Background
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 512, 256);
    } else {
      ctx.clearRect(0, 0, 512, 256);
    }
    
    // Text
    ctx.font = `bold ${fontSize}px "Segoe UI", Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Handle multiline
    const lines = text.split('\n');
    const lineHeight = fontSize * 1.2;
    const startY = 128 - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, i) => {
      ctx.fillText(line, 256, startY + i * lineHeight);
    });
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [text, color, fontSize, bgColor]);
}

// Speech Bubble Component
function SpeechBubble({ text, position, visible, color = '#ffffff' }) {
  const groupRef = useRef();
  const texture = useTextTexture(text, '#333', 40);
  
  useEffect(() => {
    if (visible && groupRef.current) {
      gsap.fromTo(groupRef.current.scale, 
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 0.3, ease: 'back.out' }
      );
    }
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <group ref={groupRef} position={position}>
      {/* Bubble background */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[3, 1.5]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>
      
      {/* Text */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.8, 1.3]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.1} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[-1, -0.9, -0.05]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

// Environment - Ground with grass
function Ground() {
  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#7cb342" roughness={0.8} />
      </mesh>
      
      {/* Grass patches */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 30 - 5;
        const scale = 0.3 + Math.random() * 0.4;
        return (
          <mesh key={i} position={[x, -0.9, z]} rotation={[0, Math.random() * Math.PI, 0]}>
            <coneGeometry args={[0.15 * scale, 0.4 * scale, 3]} />
            <meshStandardMaterial color="#558b2f" />
          </mesh>
        );
      })}
    </group>
  );
}

// Cartoon Tree
function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
      
      {/* Leaves - layered cones */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[1.2, 1.5, 8]} />
        <meshStandardMaterial color="#388e3c" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.3, 0]} castShadow>
        <coneGeometry args={[0.9, 1.2, 8]} />
        <meshStandardMaterial color="#43a047" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.9, 0]} castShadow>
        <coneGeometry args={[0.6, 0.8, 8]} />
        <meshStandardMaterial color="#4caf50" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Cartoon Cloud
function CartoonCloud({ position, scale = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x += 0.005;
      if (ref.current.position.x > 20) {
        ref.current.position.x = -20;
      }
    }
  });
  
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.8, -0.2, 0]} castShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.8, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Letter Character
function LetterCharacter({ 
  letter, 
  position, 
  color, 
  bgColor,
  animation = 'idle',
  delay = 0 
}) {
  const meshRef = useRef();
  const texture = useTextTexture(letter, color, 100, bgColor);
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    // Entrance animation
    gsap.fromTo(meshRef.current.position,
      { y: position[1] + 10, opacity: 0 },
      { y: position[1], duration: 0.8, delay, ease: 'bounce.out' }
    );
  }, [position, delay]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime + delay;
    
    switch (animation) {
      case 'idle':
        meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
        meshRef.current.rotation.y = Math.sin(time) * 0.1;
        break;
      case 'excited':
        meshRef.current.position.y = position[1] + Math.abs(Math.sin(time * 8)) * 0.3;
        meshRef.current.rotation.z = Math.sin(time * 6) * 0.1;
        break;
      case 'talking':
        meshRef.current.scale.setScalar(1 + Math.sin(time * 10) * 0.05);
        break;
      case 'spin':
        meshRef.current.rotation.y += 0.1;
        break;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[1.2, 1.2, 0.3]} />
      <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

// Title Card
function TitleCard({ text, subtext, visible }) {
  const groupRef = useRef();
  const mainTexture = useTextTexture(text, '#ffffff', 70, null);
  const subTexture = useTextTexture(subtext, '#eadbc8', 50, null);
  
  useEffect(() => {
    if (visible && groupRef.current) {
      gsap.fromTo(groupRef.current.position,
        { y: 5, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <group ref={groupRef} position={[0, 2, -2]}>
      {/* Background panel */}
      <mesh position={[0, 0, -0.1]}>
        <roundedBoxGeometry args={[6, 2, 0.2]} />
        <meshStandardMaterial color="#8a3b12" roughness={0.3} />
      </mesh>
      
      {/* Main text */}
      <mesh position={[0, 0.3, 0.05]}>
        <planeGeometry args={[5.5, 1]} />
        <meshBasicMaterial map={mainTexture} transparent alphaTest={0.1} />
      </mesh>
      
      {/* Subtext */}
      <mesh position={[0, -0.6, 0.05]}>
        <planeGeometry args={[5, 0.5]} />
        <meshBasicMaterial map={subTexture} transparent alphaTest={0.1} />
      </mesh>
    </group>
  );
}

// Scene
function Scene({ sceneState, onComplete }) {
  const { camera } = useThree();
  const [lettersVisible, setLettersVisible] = useState(false);
  const [showBubbles, setShowBubbles] = useState({
    n: false,
    o1: false,
    v: false,
    a1: false,
    n2: false,
    e: false,
    s: false,
    t: false,
  });
  const [titleVisible, setTitleVisible] = useState(false);
  const [letterAnimations, setLetterAnimations] = useState({
    n: 'idle',
    o: 'idle',
    v: 'idle',
    a: 'idle',
    s: 'idle',
    t: 'idle',
  });
  
  // Scene sequence
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 2000);
      }
    });
    
    // Scene 1: Letters appear and start talking
    tl.call(() => setLettersVisible(true), [], 0.5)
      .to({}, { duration: 0.5 })
      
      // N speaks first
      .call(() => setShowBubbles(prev => ({ ...prev, n: true })), [], 1)
      .call(() => setLetterAnimations(prev => ({ ...prev, n: 'talking' })), [], 1)
      .to({}, { duration: 2.5 })
      .call(() => setShowBubbles(prev => ({ ...prev, n: false })), [], 3.5)
      .call(() => setLetterAnimations(prev => ({ ...prev, n: 'idle' })), [], 3.5)
      
      // O responds
      .call(() => setShowBubbles(prev => ({ ...prev, o1: true })), [], 4)
      .call(() => setLetterAnimations(prev => ({ ...prev, o: 'talking' })), [], 4)
      .to({}, { duration: 2 })
      .call(() => setShowBubbles(prev => ({ ...prev, o1: false })), [], 6)
      .call(() => setLetterAnimations(prev => ({ ...prev, o: 'idle' })), [], 6)
      
      // V gets excited
      .call(() => setShowBubbles(prev => ({ ...prev, v: true })), [], 6.5)
      .call(() => setLetterAnimations(prev => ({ ...prev, v: 'excited' })), [], 6.5)
      .to({}, { duration: 2 })
      .call(() => setShowBubbles(prev => ({ ...prev, v: false })), [], 8.5)
      .call(() => setLetterAnimations(prev => ({ ...prev, v: 'idle' })), [], 8.5)
      
      // A talks
      .call(() => setShowBubbles(prev => ({ ...prev, a1: true })), [], 9)
      .call(() => setLetterAnimations(prev => ({ ...prev, a: 'talking' })), [], 9)
      .to({}, { duration: 2.5 })
      .call(() => setShowBubbles(prev => ({ ...prev, a1: false })), [], 11.5)
      .call(() => setLetterAnimations(prev => ({ ...prev, a: 'idle' })), [], 11.5)
      
      // Second N
      .call(() => setShowBubbles(prev => ({ ...prev, n2: true })), [], 12)
      .to({}, { duration: 1.5 })
      .call(() => setShowBubbles(prev => ({ ...prev, n2: false })), [], 13.5)
      
      // E
      .call(() => setShowBubbles(prev => ({ ...prev, e: true })), [], 14)
      .to({}, { duration: 1.5 })
      .call(() => setShowBubbles(prev => ({ ...prev, e: false })), [], 15.5)
      
      // S
      .call(() => setShowBubbles(prev => ({ ...prev, s: true })), [], 16)
      .call(() => setLetterAnimations(prev => ({ ...prev, s: 'excited' })), [], 16)
      .to({}, { duration: 2 })
      .call(() => setShowBubbles(prev => ({ ...prev, s: false })), [], 18)
      .call(() => setLetterAnimations(prev => ({ ...prev, s: 'idle' })), [], 18)
      
      // T - the reveal
      .call(() => setShowBubbles(prev => ({ ...prev, t: true })), [], 18.5)
      .call(() => setLetterAnimations(prev => ({ ...prev, t: 'excited' })), [], 18.5)
      .to({}, { duration: 2.5 })
      .call(() => setShowBubbles(prev => ({ ...prev, t: false })), [], 21)
      
      // All excited and title appears
      .call(() => {
        setLetterAnimations({
          n: 'spin', o: 'excited', v: 'excited', a: 'excited',
          s: 'excited', t: 'excited'
        });
        setTitleVisible(true);
      }, [], 21.5)
      
      .to({}, { duration: 4 });
    
    return () => tl.kill();
  }, [onComplete]);
  
  useFrame((state) => {
    // Gentle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      {/* Sky gradient */}
      <color attach="background" args={['#87CEEB']} />
      
      {/* Fog */}
      <fog attach="fog" args={['#87CEEB', 15, 60]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Environment */}
      <Ground />
      
      {/* Trees */}
      <Tree position={[-8, -1, -5]} scale={1.2} />
      <Tree position={[8, -1, -3]} scale={1.5} />
      <Tree position={[-5, -1, -8]} scale={0.8} />
      <Tree position={[6, -1, -7]} scale={1} />
      
      {/* Clouds */}
      <CartoonCloud position={[-5, 6, -10]} scale={1.2} />
      <CartoonCloud position={[5, 7, -8]} scale={0.9} />
      <CartoonCloud position={[0, 8, -12]} scale={1.5} />
      
      {/* Letters - NovaNest */}
      {lettersVisible && (
        <>
          {/* N */}
          <LetterCharacter 
            letter="N" 
            position={[-3.5, 0, 0]} 
            color="#ffffff"
            bgColor="#8a3b12"
            animation={letterAnimations.n}
            delay={0}
          />
          <SpeechBubble 
            text="Hey guys, I found\nsomething amazing!" 
            position={[-3.5, 1.5, 0]} 
            visible={showBubbles.n}
          />
          
          {/* o */}
          <LetterCharacter 
            letter="o" 
            position={[-2.2, 0, 0.5]} 
            color="#5a2d10"
            bgColor="#eadbc8"
            animation={letterAnimations.o}
            delay={0.1}
          />
          <SpeechBubble 
            text="What is it N?\nTell us!" 
            position={[-2.2, 1.5, 0.5]} 
            visible={showBubbles.o1}
            color="#fff9c4"
          />
          
          {/* v */}
          <LetterCharacter 
            letter="v" 
            position={[-0.9, 0, -0.3]} 
            color="#ffffff"
            bgColor="#6b3410"
            animation={letterAnimations.v}
            delay={0.2}
          />
          <SpeechBubble 
            text="Is it a new\nadventure?!" 
            position={[-0.9, 1.5, -0.3]} 
            visible={showBubbles.v}
            color="#ffccbc"
          />
          
          {/* a */}
          <LetterCharacter 
            letter="a" 
            position={[0.4, 0, 0.2]} 
            color="#5a2d10"
            bgColor="#f5e6d0"
            animation={letterAnimations.a}
            delay={0.3}
          />
          <SpeechBubble 
            text="A marketing\ncompany? Really?!" 
            position={[0.4, 1.5, 0.2]} 
            visible={showBubbles.a1}
            color="#c8e6c9"
          />
          
          {/* N2 */}
          <LetterCharacter 
            letter="N" 
            position={[1.7, 0, -0.5]} 
            color="#ffffff"
            bgColor="#8a3b12"
            animation="idle"
            delay={0.4}
          />
          <SpeechBubble 
            text="Yes! NovaNest!" 
            position={[1.7, 1.5, -0.5]} 
            visible={showBubbles.n2}
            color="#ffe0b2"
          />
          
          {/* e */}
          <LetterCharacter 
            letter="e" 
            position={[2.8, 0, 0.3]} 
            color="#5a2d10"
            bgColor="#eadbc8"
            animation="idle"
            delay={0.5}
          />
          <SpeechBubble 
            text="Their ideas\nare so creative!" 
            position={[2.8, 1.5, 0.3]} 
            visible={showBubbles.e}
            color="#e1bee7"
          />
          
          {/* s */}
          <LetterCharacter 
            letter="s" 
            position={[3.9, 0, -0.2]} 
            color="#ffffff"
            bgColor="#7a4520"
            animation={letterAnimations.s}
            delay={0.6}
          />
          <SpeechBubble 
            text="Let's go\ncheck them out!" 
            position={[3.9, 1.5, -0.2]} 
            visible={showBubbles.s}
            color="#b3e5fc"
          />
          
          {/* t */}
          <LetterCharacter 
            letter="t" 
            position={[5, 0, 0]} 
            color="#5a2d10"
            bgColor="#fff8e1"
            animation={letterAnimations.t}
            delay={0.7}
          />
          <SpeechBubble 
            text="Together,\nwe are NovaNest!" 
            position={[5, 1.5, 0]} 
            visible={showBubbles.t}
            color="#ffffff"
          />
        </>
      )}
      
      {/* Title Card */}
      <TitleCard 
        text="NovaNest" 
        subtext="Creative Marketing Agency" 
        visible={titleVisible}
      />
      
      {/* Sparkles */}
      <Sparkles count={100} scale={20} size={1.5} speed={0.5} color="#ffd700" />
    </>
  );
}

// Main component
const CartoonStoryAnimation = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  
  const handleComplete = () => {
    setIsComplete(true);
    onComplete?.();
  };
  
  if (isComplete) return null;
  
  return (
    <div className="fixed inset-0 z-[9999]" style={{ background: '#87CEEB' }}>
      <Canvas
        shadows
        camera={{ position: [0, 3, 12], fov: 50, near: 0.1, far: 100 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={1.5}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene onComplete={handleComplete} />
      </Canvas>
      
      {/* Skip button */}
      <button
        onClick={() => setIsComplete(true)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[#8a3b12] text-white rounded-lg hover:bg-[#6b2a0a] transition-colors text-sm font-medium z-10 shadow-lg"
      >
        Skip Story
      </button>
    </div>
  );
};

export default CartoonStoryAnimation;
