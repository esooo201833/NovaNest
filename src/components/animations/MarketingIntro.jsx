import { useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Float, Trail, Environment, ContactShadows, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Logo image component
function LogoImage({ texture, position, colors }) {
  const meshRef = useRef();
  const textureMap = useTexture(texture);
  
  useEffect(() => {
    if (textureMap) {
      textureMap.colorSpace = THREE.SRGBColorSpace;
      textureMap.minFilter = THREE.LinearFilter;
      textureMap.magFilter = THREE.LinearFilter;
      textureMap.anisotropy = 16;
      textureMap.needsUpdate = true;
    }
  }, [textureMap]);
  
  return (
    <group ref={meshRef} position={position}>
      {/* Logo image only - no background */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial 
          map={textureMap} 
          transparent={true}
          alphaTest={0.05}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.1}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// Center NovaNest Logo that rotates in the middle
function NovaNestCenterLogo() {
  const logoRef = useRef();
  
  useEffect(() => {
    if (!logoRef.current) return;
    
    // Entrance animation - responsive size
    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 1 : 1.5;
    gsap.fromTo(logoRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: scale, y: scale, z: scale, duration: 1, delay: 0.5, ease: 'elastic.out(1, 0.5)' }
    );
    
    gsap.fromTo(logoRef.current.position,
      { y: -2, z: -5 },
      { y: 0, z: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );
  }, []);
  
  useFrame((state) => {
    if (!logoRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Smooth floating
    logoRef.current.position.y = Math.sin(time * 0.6) * 0.1;
    
    // Continuous gentle rotation
    logoRef.current.rotation.y = time * 0.3;
    logoRef.current.rotation.x = Math.sin(time * 0.4) * 0.05;
  });
  
  const textureMap = useTexture('/logos/novanest.png');
  
  useEffect(() => {
    if (textureMap) {
      textureMap.colorSpace = THREE.SRGBColorSpace;
      textureMap.minFilter = THREE.LinearFilter;
      textureMap.magFilter = THREE.LinearFilter;
      textureMap.anisotropy = 16;
      textureMap.needsUpdate = true;
    }
  }, [textureMap]);
  
  return (
    <group ref={logoRef} position={[0, 0, 0]} scale={[0, 0, 0]}>
      {/* Main logo */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial 
          map={textureMap} 
          transparent={true}
          alphaTest={0.05}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.1}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      
      {/* Soft glow ring */}
      <mesh position={[0, 0, -0.1]} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.3, 1.5, 64]} />
        <meshBasicMaterial 
          color="#8a3b12" 
          transparent 
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Social Media Icons Group
function SocialMediaIcons() {
  const groupRef = useRef();
  const iconsRef = useRef([]);
  
  useEffect(() => {
    iconsRef.current.forEach((icon, i) => {
      if (!icon) return;
      
      const delay = 0.3 + i * 0.2;
      const duration = 1.2;
      
      // Initial state
      icon.scale.set(0, 0, 0);
      icon.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      // Enhanced entrance animation with stagger
      gsap.to(icon.position, {
        y: icon.userData.originalY, 
        z: icon.userData.originalZ,
        duration: duration,
        delay: delay,
        ease: 'back.out(1.7)'
      });
      
      gsap.to(icon.scale, {
        x: 1, 
        y: 1, 
        z: 1, 
        duration: 0.8, 
        delay: delay, 
        ease: 'elastic.out(1, 0.5)'
      });
      
      // Start with random rotation then begin spinning
      gsap.to(icon.rotation, {
        x: 0,
        y: Math.random() * Math.PI * 2,
        z: 0,
        duration: 1.5,
        delay: delay,
        ease: 'power2.out'
      });
    });
  }, []);
  
  useFrame((state) => {
    iconsRef.current.forEach((icon, i) => {
      if (!icon) return;
      
      const time = state.clock.elapsedTime;
      const offset = i * 1.2;
      
      // Circular orbital motion - responsive based on screen size
      const isMobile = window.innerWidth < 768;
      const orbitRadius = isMobile ? 0.2 : 0.3;
      const orbitSpeed = 0.4;
      icon.position.x = icon.userData.originalX + Math.cos(time * orbitSpeed + offset) * orbitRadius;
      icon.position.y = icon.userData.originalY + Math.sin(time * orbitSpeed * 1.3 + offset) * (isMobile ? 0.15 : 0.2);
      icon.position.z = icon.userData.originalZ + Math.sin(time * orbitSpeed * 0.7 + offset) * 0.05;
      
      // Continuous spinning rotation
      const spinSpeed = 0.8;
      icon.rotation.y += 0.01 * spinSpeed;
      icon.rotation.x = Math.sin(time * 0.5 + offset) * 0.25;
      icon.rotation.z = Math.cos(time * 0.3 + offset) * 0.1;
    });
  });
  
  const icons = [
    { 
      pos: [-3.5, 1.5, 0.5], 
      colors: ['#833AB4', '#FD1D1D', '#F77737', '#FCAF45'],
      type: 'instagram',
      name: 'Instagram',
      texture: '/logos/instagram.png'
    },
    { 
      pos: [-2, 2.8, 0.5], 
      colors: ['#00F2EA', '#FF0050', '#000000'],
      type: 'tiktok',
      name: 'TikTok',
      texture: '/logos/tiktok.png'
    },
    { 
      pos: [2, 2.8, 0.5], 
      colors: ['#1877F2', '#FFFFFF'],
      type: 'facebook',
      name: 'Facebook',
      texture: '/logos/facebook.png'
    },
    { 
      pos: [3.5, 1.5, 0.5], 
      colors: ['#FFFC00', '#000000'],
      type: 'snapchat',
      name: 'Snapchat',
      texture: '/logos/snapchat.png'
    },
    { 
      pos: [0, -3, 0.5], 
      colors: ['#FF0000', '#FFFFFF'],
      type: 'youtube',
      name: 'YouTube',
      texture: '/logos/youtube.png'
    },
  ];
  
  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <group
          key={i}
          ref={el => {
            if (el) {
              iconsRef.current[i] = el;
              el.userData = { 
                originalY: icon.pos[1], 
                originalZ: icon.pos[2],
                originalX: icon.pos[0]
              };
            }
          }}
          position={icon.pos}
        >
          {/* Logo Image only - no glow */}
          <LogoImage 
            texture={icon.texture}
            position={[0, 0, 0]}
            colors={icon.colors}
          />
        </group>
      ))}
      
      {/* Connecting lines between icons */}
      <group>
        {/* Instagram to TikTok */}
        <mesh position={[-1.5, 1.75, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[1.2, 0.02, 0.02]} />
          <meshBasicMaterial color="#eadbc8" transparent opacity={0.3} />
        </mesh>
        {/* TikTok to Facebook */}
        <mesh position={[1.5, 1.75, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[1.2, 0.02, 0.02]} />
          <meshBasicMaterial color="#eadbc8" transparent opacity={0.3} />
        </mesh>
        {/* Instagram to Snapchat */}
        <mesh position={[-2.25, 0.5, 0.25]} rotation={[0, 0, 0.8]}>
          <boxGeometry args={[1.2, 0.02, 0.02]} />
          <meshBasicMaterial color="#eadbc8" transparent opacity={0.3} />
        </mesh>
        {/* Facebook to YouTube */}
        <mesh position={[2.25, 0.5, 0.25]} rotation={[0, 0, -0.8]}>
          <boxGeometry args={[1.2, 0.02, 0.02]} />
          <meshBasicMaterial color="#eadbc8" transparent opacity={0.3} />
        </mesh>
        {/* Snapchat to YouTube */}
        <mesh position={[0, -0.5, 0.5]}>
          <boxGeometry args={[2.8, 0.02, 0.02]} />
          <meshBasicMaterial color="#eadbc8" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Floating Particles
function FloatingParticles() {
  const points = useMemo(() => {
    const positions = [];
    const colors = [];
    const sizes = [];
    
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 12;
      const y = (Math.random() - 0.5) * 15;
      
      positions.push(
        Math.cos(theta) * radius,
        y,
        Math.sin(theta) * radius
      );
      
      const color = new THREE.Color();
      // Warm brown/orange colors matching website theme
      const warmColors = [0x8a3b12, 0xb86d3e, 0xc97d4e, 0xd48c5e, 0xe8c9a8, 0xf5e6d0];
      color.setHex(warmColors[Math.floor(Math.random() * warmColors.length)]);
      colors.push(color.r, color.g, color.b);
      
      sizes.push(0.05 + Math.random() * 0.1);
    }
    
    return { 
      positions: new Float32Array(positions), 
      colors: new Float32Array(colors),
      sizes: new Float32Array(sizes)
    };
  }, []);
  
  const pointsRef = useRef();
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.positions.length / 3}
          array={points.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={points.colors.length / 3}
          array={points.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Animated Text
function AnimatedText({ text, position, delay = 0, fontSize = 0.8 }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Clear
    ctx.clearRect(0, 0, 1024, 256);
    
    // Text
    ctx.font = `bold ${fontSize * 150}px "Segoe UI", Arial, sans-serif`;
    ctx.fillStyle = '#f5ebe0';  // Light beige for dark background
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Soft subtle glow
    ctx.shadowColor = '#b86d3e';
    ctx.shadowBlur = 8;
    ctx.fillText(text, 512, 128);
    ctx.shadowBlur = 0;
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [text, fontSize]);
  
  const meshRef = useRef();
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    gsap.fromTo(meshRef.current.position,
      { y: position[1] - 2, opacity: 0 },
      { y: position[1], opacity: 1, duration: 0.8, delay, ease: 'power3.out' }
    );
    
    gsap.fromTo(meshRef.current.scale,
      { x: 0.5, y: 0.5 },
      { x: 1, y: 1, duration: 0.8, delay, ease: 'back.out' }
    );
  }, [position, delay]);
  
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[6, 1.5]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.1} />
    </mesh>
  );
}

// Scene
function Scene({ onComplete }) {
  const { camera } = useThree();
  
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });
    
    // Camera animation on start
    gsap.fromTo(camera.position,
      { y: -2, z: 15 },
      { y: 0.5, z: 9, duration: 2.5, ease: 'power3.out' }
    );
    
    tl.to({}, { duration: 4 }); // Total intro duration: 4 seconds
    
    return () => tl.kill();
  }, [onComplete, camera]);
  
  useFrame((state) => {
    // Subtle camera drift
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
  });
  
  return (
    <>
      {/* Background - Dark Brown Theme */}
      <color attach="background" args={['#5a2d0c']} />
      
      {/* Fog */}
      <fog attach="fog" args={['#5a2d0c', 8, 25]} />
      
      {/* Soft natural lighting */}
      <ambientLight intensity={0.5} color="#f5ebe0" />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={0.8}
        color="#faf0e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 4, 4]} intensity={0.4} color="#d4a574" />
      <pointLight position={[3, -3, 4]} intensity={0.2} color="#c9956c" />
      
      {/* Soft environment lighting - optimized */}
      <Environment preset="studio" />
      
      {/* Simple shadows instead of ContactShadows for better performance */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      
      {/* Center NovaNest Logo */}
      <NovaNestCenterLogo />
      
      {/* Social Media Icons orbiting around */}
      <SocialMediaIcons />
      
      {/* Particles */}
      <FloatingParticles />
      
      {/* Optimized sparkles - reduced count */}
      <Sparkles 
        count={20} 
        scale={8} 
        size={0.6} 
        speed={0.3} 
        color="#d4a574" 
      />
      
      {/* Reduced floating orbs for better performance */}
      <group>
        {Array.from({ length: 4 }).map((_, i) => (
          <Float 
            key={i} 
            speed={1} 
            rotationIntensity={0.05} 
            floatIntensity={0.2}
            position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, -3 - Math.random() * 3]}
          >
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial 
                color={['#b86d3e', '#d4a574'][i % 2]} 
                transparent 
                opacity={0.06}
                roughness={0.6}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      {/* Simplified light rays - reduced geometry */}
      <group>
        {Array.from({ length: 2 }).map((_, i) => (
          <mesh 
            key={i}
            position={[0, 5, -2]}
            rotation={[0, 0, (i - 0.5) * 0.5]}
          >
            <coneGeometry args={[0.3, 12, 16, 1, true]} />
            <meshBasicMaterial 
              color="#d4a574"
              transparent
              opacity={0.01}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
      
      {/* Post-processing effects for quality */}
      <EffectComposer>
        <Bloom 
          intensity={0.3} 
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          height={300}
        />
        <Vignette 
          eskil={false} 
          offset={0.1} 
          darkness={0.4}
        />
      </EffectComposer>
    </>
  );
}

// Main Component
const MarketingIntro = ({ onComplete }) => {
  const handleComplete = () => {
    onComplete?.();
  };
  
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ background: '#5a2d0c', touchAction: 'none' }}>
      <Canvas
        shadows
        camera={{ 
          position: window?.innerWidth < 768 ? [0, 0.5, 12] : [0, 0.5, 9], 
          fov: window?.innerWidth < 768 ? 60 : 50, 
          near: 0.1, 
          far: 100 
        }}
        gl={{ 
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        dpr={window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio}
        style={{ width: '100%', height: '100%', display: 'block' }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <Scene onComplete={handleComplete} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MarketingIntro;
