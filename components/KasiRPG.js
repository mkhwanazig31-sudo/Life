"use client"
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function Human({pos, rot}){
  const ref=useRef()
  useFrame(()=>{ if(ref.current){ ref.current.position.x=pos.x; ref.current.position.z=pos.z; ref.current.rotation.y=rot } })
  return <group ref={ref}><mesh position={[0,0.9,0]}><capsuleGeometry args={[0.28,0.55]}/><meshStandardMaterial color="#1e90ff"/></mesh><mesh position={[0,1.55,0]}><sphereGeometry args={[0.32,16,16]}/><meshStandardMaterial color="#ffdbac"/></mesh></group>
}
function RealBuilding({shape, centerLat, centerLon}){
  const scale=8000
  const x=(shape.lon-centerLon)*scale
  const z=(shape.lat-centerLat)*scale*-1
  const c=["#c49a6c","#d9b38c","#b87a4a","#e8c9a0"][Math.floor(Math.random()*4)]
  return <group position={[x,0,z]}><mesh position={[0,1,0]} castShadow><boxGeometry args={[shape.w,2.2,shape.d]}/><meshStandardMaterial color={c} roughness={0.9}/></mesh><mesh position={[0,2.3,0]}><boxGeometry args={[shape.w+0.2,0.4,shape.d+0.2]}/><meshStandardMaterial color="#555"/></mesh></group>
}
function CameraRig({player, yaw}){
  useFrame(({camera})=>{ camera.position.lerp(new THREE.Vector3(player.x+Math.sin(yaw)*7,3.5,player.z+Math.cos(yaw)*7),0.12); camera.lookAt(player.x,1,player.z) })
  return null
}
export default function KasiRPG({onGoPlane}){
  const CENTER_LAT=-25.585112, CENTER_LON=27.972918
  const [player,setPlayer]=useState({x:0,z:6})
  const [rot,setRot]=useState(0),[yaw,setYaw]=useState(0)
  const [realHouses,setRealHouses]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const q=`[out:json];(way(around:300,${CENTER_LAT},${CENTER_LON})[building];);out center;`
    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(q)}`).then(r=>r.json()).then(d=>{
      let b=d.elements.map(el=>{ const lat=el.center?.lat||el.lat, lon=el.center?.lon||el.lon; if(!lat) return null; return {lat,lon,w:2+Math.random()*1.5,d:2.5+Math.random()*1.5}}).filter(Boolean).slice(0,80)
      if(b.length===0){ b=[]; for(let x=-4;x<=4;x++) for(let z=-4;z<=4;z++) b.push({lat:CENTER_LAT+z*0.0004, lon:CENTER_LON+x*0.0005, w:3, d:3.5})}
      setRealHouses(b); setLoading(false)
    }).catch(()=>{ const b=[]; for(let x=-4;x<=4;x++) for(let z=-4;z<=4;z++) b.push({lat:CENTER_LAT+z*0.0004, lon:CENTER_LON+x*0.0005, w:3, d:3.5}); setRealHouses(b); setLoading(false) })
  },[])
  const move=(f,s)=>{ const fx=Math.sin(yaw)*f, fz=Math.cos(yaw)*f, sx=Math.sin(yaw+Math.PI/2)*s, sz=Math.cos(yaw+Math.PI/2)*s, nx=player.x+fx+sx, nz=player.z+fz+sz; setPlayer({x:nx,z:nz}); if(f||s) setRot(Math.atan2(fx+sx,fz+sz)) }
  return (
    <div style={{height:'88vh',width:'100%',position:'relative',background:'#87CEEB',overflow:'hidden'}}>
      <Canvas shadows><ambientLight intensity={1.3}/><directionalLight position={[10,15,8]} intensity={1.2} castShadow/><mesh rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color="#c9a77a"/></mesh><mesh rotation={[-Math.PI/2,0,0]} position={[0,0.02,0]}><planeGeometry args={[6,200]}/><meshStandardMaterial color="#222"/></mesh>{realHouses.map((h,i)=><RealBuilding key={i} shape={h} centerLat={CENTER_LAT} centerLon={CENTER_LON}/>) }<Human pos={player} rot={rot}/><CameraRig player={player} yaw={yaw}/></Canvas>
      <div style={{position:'absolute',top:8,left:8,background:'rgba(0,0,0,0.85)',color:'#fff',padding:8,borderRadius:8,fontSize:11}}>{loading? "⏳ LOADING REAL A22936 HOUSES...":`📍 GTA MODE • A22936 • ${realHouses.length} REAL HOUSES • -25.585112,27.972918`}</div>
      <button onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${CENTER_LAT},${CENTER_LON}`,"_blank")} style={{position:'absolute',top:8,right:8,background:'#4285F4',color:'#fff',padding:10,borderRadius:8,fontSize:11,fontWeight:'bold'}}>🛰️ SATELLITE</button>
      <div style={{position:'absolute',bottom:14,left:14,display:'grid',gridTemplateColumns:'repeat(3,60px)',gridTemplateRows:'repeat(3,46px)',gap:6}}><div/><button onTouchStart={e=>{e.preventDefault(); move(-0.9,0)}} style={{background:'#fff',borderRadius:12,fontWeight:'bold'}}>▲</button><div/><button onTouchStart={e=>{e.preventDefault(); move(0,-0.8)}} style={{background:'#fff',borderRadius:12}}>◀</button><div style={{background:'rgba(0,0,0,0.5)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>●</div><button onTouchStart={e=>{e.preventDefault(); move(0,0.8)}} style={{background:'#fff',borderRadius:12}}>▶</button><div/><button onTouchStart={e=>{e.preventDefault(); move(0.9,0)}} style={{background:'#ddd',borderRadius:12}}>▼</button><div/></div>
      <div onTouchMove={e=>{ const m=e.touches[0].clientX-(window._lx||e.touches[0].clientX); setYaw(y=>y-m*0.02); window._lx=e.touches[0].clientX }} onTouchStart={e=>{window._lx=e.touches[0].clientX}} style={{position:'absolute',bottom:14,right:14,width:130,height:130,background:'rgba(255,255,255,0.2)',border:'2px dashed #fff',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,textAlign:'center'}}>DRAG TO ROTATE<br/>GTA CAM</div>
      <button onClick={onGoPlane} style={{position:'absolute',bottom:160,right:14,background:'#FFD700',padding:12,borderRadius:10,fontWeight:'bold'}}>✈️ OR TAMBO</button>
    </div>
  )
}
