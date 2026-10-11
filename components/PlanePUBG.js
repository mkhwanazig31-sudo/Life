"use client"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { useState } from 'react'

function AircraftHAL(){
  return (
    <group position={[0,0.5,0]} rotation={[0,-0.2,0]}>
      {/* ===== FUSELAGE ===== */}
      <group>
        {/* Bottom white */}
        <mesh position={[0,0,0]} rotation={[Math.PI/2,0,0]} castShadow>
          <capsuleGeometry args={[0.9,7,4,24]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.3} />
        </mesh>
        {/* Top light blue like HAL diagram */}
        <mesh position={[0,0.2,0]} rotation={[Math.PI/2,0,0]}>
          <capsuleGeometry args={[0.92,7,4,24,1,Math.PI]} />
          <meshStandardMaterial color="#8ec6e6" roughness={0.4} />
        </mesh>
        {/* NOSE + Cockpit Windshield + Cockpit */}
        <mesh position={[0,0.3,-3.7]} rotation={[Math.PI/2,0,0]}>
          <sphereGeometry args={[0.9,16,16,0,6.28,0,1]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>
        <mesh position={[0,0.6,-3.2]}>
          <boxGeometry args={[0.7,0.15,0.6]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* ===== WING ===== */}
      <group position={[0,-0.3,0]}>
        <mesh castShadow><boxGeometry args={[12,0.25,2.8]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
        {/* Flap / Slat / Spoiler / Aileron - visible divisions */}
        <mesh position={[0,0.13,0.5]}><boxGeometry args={[11,0.05,0.6]} /><meshStandardMaterial color="#d0d0d0" /></mesh>
        {/* Winglet at tips */}
        <mesh position={[6.2,0.4,0]} rotation={[0,0,-0.6]}><boxGeometry args={[0.15,1,0.8]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
        <mesh position={[-6.2,0.4,0]} rotation={[0,0,0.6]}><boxGeometry args={[0.15,1,0.8]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
      </group>

      {/* ===== ENGINE + Strut ===== */}
      <group>
        <mesh position={[2.5,-0.7,0.2]} rotation={[0,0,Math.PI/2]} castShadow><cylinderGeometry args={[0.5,0.5,1.8,20]} /><meshStandardMaterial color="#bbb" metalness={0.6} /></mesh>
        <mesh position={[2.5,-0.35,0.2]}><boxGeometry args={[0.15,0.5,0.4]} /><meshStandardMaterial color="#999" /></mesh>
        <mesh position={[-2.5,-0.7,0.2]} rotation={[0,0,Math.PI/2]} castShadow><cylinderGeometry args={[0.5,0.5,1.8,20]} /><meshStandardMaterial color="#bbb" metalness={0.6} /></mesh>
        <mesh position={[-2.5,-0.35,0.2]}><boxGeometry args={[0.15,0.5,0.4]} /><meshStandardMaterial color="#999" /></mesh>
      </group>

      {/* ===== LANDING GEAR - Wheel + Strut ===== */}
      <group position={[0,-1.1,0]}>
        <mesh position={[0,0,-2.5]}><cylinderGeometry args={[0.2,0.2,0.15,12]} rotation={[0,0,Math.PI/2]} /><meshStandardMaterial color="black" /></mesh>
        <mesh position={[0.8,0,-0.2]}><cylinderGeometry args={[0.25,0.25,0.2,12]} rotation={[0,0,Math.PI/2]} /><meshStandardMaterial color="black" /></mesh>
        <mesh position={[-0.8,0,-0.2]}><cylinderGeometry args={[0.25,0.25,0.2,12]} rotation={[0,0,Math.PI/2]} /><meshStandardMaterial color="black" /></mesh>
        <mesh position={[0,0.4,-2.5]}><boxGeometry args={[0.1,0.8,0.1]} /><meshStandardMaterial color="#777" /></mesh>
      </group>

      {/* ===== EMPENNAGE - Tail full set ===== */}
      <group position={[0,0,3.8]}>
        {/* Vertical Stabilizer + Rudder */}
        <mesh position={[0,1.3,0]} castShadow><boxGeometry args={[0.2,2.2,1.6]} /><meshStandardMaterial color="#8ec6e6" /></mesh>
        <mesh position={[0,1.3,0.8]}><boxGeometry args={[0.21,2,0.3]} /><meshStandardMaterial color="#6eaed0" /></mesh>
        {/* Horizontal Stabilizer + Elevator + Aileron */}
        <mesh position={[0,0.2,0.2]}><boxGeometry args={[4.5,0.18,1.2]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
        <mesh position={[0,0.2,0.8]}><boxGeometry args={[4.3,0.12,0.4]} /><meshStandardMaterial color="#d0d0d0" /></mesh>
      </group>

      {/* Antenna */}
      <mesh position={[0,0.95,0]}><cylinderGeometry args={[0.02,0.02,0.6]} /><meshStandardMaterial color="black" /></mesh>

      <ContactShadows position={[0,-1.6,0]} scale={18} opacity={0.5} blur={2} />
    </group>
  )
}

function Cabin(){
  return(
    <group>
      <pointLight color="#9d5cff" intensity={4} position={[0,2,0]} distance={10}/>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1,0]}><planeGeometry args={[4.5,24]}/><meshStandardMaterial color="#10102a" metalness={0.8}/></mesh>
      {[...Array(12)].map((_,i)=><mesh key={i} position={[-0.9,0.2,-9+i*1.8]}><boxGeometry args={[0.9,0.3,1.4]}/><meshStandardMaterial color="#e6e0d5"/></mesh>)}
      {[...Array(12)].map((_,i)=><mesh key={i} position={[0.9,0.2,-9+i*1.8]}><boxGeometry args={[0.9,0.3,1.4]}/><meshStandardMaterial color="#e6e0d5"/></mesh>)}
    </group>
  )
}

export default function PlanePUBG(){
  const [mode,setMode]=useState('plane')
  return(
    <div style={{height:'85vh',background:'#111'}}>
      <button onClick={()=>setMode(mode==='plane'?'cabin':'plane')} style={{margin:12,padding:12,borderRadius:12,background:'#fff',fontWeight:'bold'}}>{mode==='plane'?'SHOW PURPLE CABIN':'SHOW HAL PLANE'}</button>
      <Canvas shadows camera={{position:[6,3.5,6],fov:45}}><ambientLight intensity={0.9}/><directionalLight position={[5,10,5]} intensity={2} castShadow/><Environment preset="city"/><AircraftHAL/><group position={[0,0,0]}>{mode!=='plane'&&<Cabin/>}</group><OrbitControls/></Canvas>
    </div>
  )
}
