"use client"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { useState } from 'react'

function AircraftHAL(){
  return (
    <group position={[0,0.5,0]} rotation={[0,-0.3,0]}>
      <mesh position={[0,0,0]} rotation={[Math.PI/2,0,0]} castShadow><capsuleGeometry args={[0.9,7,4,24]} /><meshStandardMaterial color="#e8e8e8" roughness={0.3} /></mesh>
      <mesh position={[0,0.2,0]} rotation={[Math.PI/2,0,0]}><capsuleGeometry args={[0.92,7,4,24,1,Math.PI]} /><meshStandardMaterial color="#8ec6e6" /></mesh>
      <mesh position={[0,0.3,-3.7]}><sphereGeometry args={[0.9,16,16]} /><meshStandardMaterial color="#222" metalness={0.8} /></mesh>
      <group position={[0,-0.3,0]}>
        <mesh castShadow><boxGeometry args={[12,0.25,2.8]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
        <mesh position={[6.2,0.4,0]} rotation={[0,0,-0.6]}><boxGeometry args={[0.15,1,0.8]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
        <mesh position={[-6.2,0.4,0]} rotation={[0,0,0.6]}><boxGeometry args={[0.15,1,0.8]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
      </group>
      <mesh position={[2.5,-0.7,0.2]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.5,0.5,1.8,20]} /><meshStandardMaterial color="#bbb" metalness={0.6} /></mesh>
      <mesh position={[-2.5,-0.7,0.2]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.5,0.5,1.8,20]} /><meshStandardMaterial color="#bbb" metalness={0.6} /></mesh>
      <group position={[0,0,3.8]}>
        <mesh position={[0,1.3,0]}><boxGeometry args={[0.2,2.2,1.6]} /><meshStandardMaterial color="#8ec6e6" /></mesh>
        <mesh position={[0,0.2,0.2]}><boxGeometry args={[4.5,0.18,1.2]} /><meshStandardMaterial color="#e8e8e8" /></mesh>
      </group>
      <ContactShadows position={[0,-1.6,0]} scale={18} opacity={0.5} blur={2} />
    </group>
  )
}

export default function PlanePUBG(){
  const [mode,setMode]=useState('plane')
  return(
    <div style={{height:'85vh',background:'#111'}}>
      <button onClick={()=>setMode(m=>m==='plane'?'cabin':'plane')} style={{margin:12,padding:12,borderRadius:12,background:'#fff',fontWeight:'bold'}}>{mode==='plane'?'SHOW PURPLE CABIN':'SHOW HAL PLANE'}</button>
      <Canvas shadows camera={{position:[6,3.5,6],fov:45}}><ambientLight intensity={0.9}/><directionalLight position={[5,10,5]} intensity={2} castShadow/><Environment preset="city"/><AircraftHAL/><OrbitControls/></Canvas>
    </div>
  )
}
