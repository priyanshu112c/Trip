import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '../utils/gsap'
import { X, Users, Calendar, Shield, Sparkles, Check } from 'lucide-react'
const rooms=[
 {id:'classic',label:'Classic — Garden View',price:0},
 {id:'suite',label:'Suite — Private Pool',price:420},
 {id:'villa',label:'Villa — Residence',price:980}]
const extras=[
 {id:'yacht',label:'Private yacht half-day',price:650},
 {id:'photo',label:'Golden hour photographer',price:380},
 {id:'spa',label:'Couple spa ritual',price:290}]
export default function BookingDrawer({trip,open,onClose}){
 const [dates,setDates]=useState('2025-10-12 — 2025-10-19')
 const [travelers,setTravelers]=useState(2)
 const [room,setRoom]=useState('classic')
 const [sel,setSel]=useState([])
 const [ins,setIns]=useState(false)
 const [ok,setOk]=useState(false)
 const base=trip?trip.price*travelers:0
 const roomFee=(rooms.find(r=>r.id===room)?.price||0)
 const exTotal=extras.filter(e=>sel.includes(e.id)).reduce((a,b)=>a+b.price,0)
 const insFee=ins?Math.round(base*0.06):0
 const taxes=Math.round((base+roomFee+exTotal)*0.08)
 const total=base+roomFee+exTotal+insFee+taxes
 const drawerRef=useRef(null)
 useLayoutEffect(()=>{
   if(!open || !drawerRef.current) return
   const ctx=gsap.context(()=>{
     gsap.from('.bd-card',{ y: 14, opacity: 0, duration: 0.55, stagger: 0.06, delay: 0.18, ease:'power3.out' })
   }, drawerRef)
   return ()=>ctx.revert()
 },[open])
 const toggle=id=> setSel(s=> s.includes(id)? s.filter(x=>x!==id):[...s,id])
 const confirm=()=>{ setOk(true); setTimeout(()=>{setOk(false); onClose()},2100)}
 if(!trip) return null
 return (
 <AnimatePresence>
 {open && (
  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex justify-end">
   <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
   <motion.div ref={drawerRef} initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{ease:[0.22,1,0.36,1],duration:0.5}} className="relative w-full max-w-[520px] bg-parchment h-full overflow-y-auto">
    <div className="sticky top-0 bg-parchment/90 backdrop-blur-xl border-b border-black/5 px-6 py-4 flex items-center justify-between z-10">
     <div><p className="font-mono text-[10px] tracking-[0.2em] text-stone">BOOKING — {trip.destination.toUpperCase()}</p><h3 className="font-display text-[18px] mt-1">{trip.title}</h3></div>
     <button onClick={onClose} className="w-9 h-9 rounded-full border border-black/10 grid place-items-center"><X size={14}/></button>
    </div>
    <div className="px-6 py-6 space-y-5">
     <div className="bd-card rounded-2xl overflow-hidden border border-black/5 bg-white"><img src={trip.image} alt="" className="h-[150px] w-full object-cover bg-sand" loading="lazy" decoding="async" onError={e=>e.currentTarget.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop'}/><div className="p-4 flex justify-between"><div><p className="font-mono text-[10px] text-stone">{trip.duration}</p><p className="text-sm font-medium">{trip.hotel}</p></div><p className="font-display">${trip.price.toLocaleString()}</p></div></div>
     <label className="bd-card block bg-white rounded-2xl border border-black/5 p-4"><span className="font-mono text-[10px] tracking-[0.16em] text-stone flex items-center gap-2"><Calendar size={12}/> DATES</span><input value={dates} onChange={e=>setDates(e.target.value)} className="w-full mt-2 bg-sand rounded-full px-4 py-2.5 text-sm outline-none"/></label>
     <div className="bd-card bg-white rounded-2xl border border-black/5 p-4"><p className="font-mono text-[10px] tracking-[0.16em] text-stone flex items-center gap-2"><Users size={12}/> TRAVELERS</p><div className="flex items-center gap-3 mt-3"><button onClick={()=>setTravelers(Math.max(1,travelers-1))} className="w-9 h-9 rounded-full border border-black/10 grid place-items-center">−</button><span className="w-8 text-center font-medium">{travelers}</span><button onClick={()=>setTravelers(travelers+1)} className="w-9 h-9 rounded-full bg-ink text-white grid place-items-center">+</button><span className="text-sm text-stone ml-2">{travelers} guests</span></div></div>
     <div className="bd-card bg-white rounded-2xl border border-black/5 p-4"><p className="font-mono text-[10px] tracking-[0.16em]">ROOM</p><div className="mt-3 space-y-2">{rooms.map(r=><button key={r.id} onClick={()=>setRoom(r.id)} className={`w-full text-left rounded-xl border px-4 py-3 flex justify-between text-sm ${room===r.id?'border-ink bg-ink text-white':'border-black/10 bg-sand/40'}`}><span>{r.label}</span><span className="font-mono text-xs">{r.price?`+$${r.price}`:'Incl.'}</span></button>)}</div></div>
     <div className="bd-card bg-white rounded-2xl border border-black/5 p-4"><p className="font-mono text-[10px] tracking-[0.16em] flex items-center gap-2"><Sparkles size={12}/> EXPERIENCES</p><div className="mt-3 space-y-2">{extras.map(e=><label key={e.id} className={`flex justify-between items-center rounded-xl border px-4 py-3 cursor-pointer ${sel.includes(e.id)?'border-ink bg-sand':'border-black/10'}`}><span className="flex items-center gap-2"><input type="checkbox" checked={sel.includes(e.id)} onChange={()=>toggle(e.id)}/><span className="text-sm">{e.label}</span></span><span className="font-mono text-xs">+${e.price}</span></label>)}</div></div>
     <label className="bd-card flex gap-3 bg-white rounded-2xl border border-black/5 p-4 cursor-pointer"><input type="checkbox" checked={ins} onChange={e=>setIns(e.target.checked)}/><span className="flex-1"><span className="font-mono text-[10px] tracking-[0.16em] flex items-center gap-2"><Shield size={12}/> INSURANCE — 6%</span><span className="text-xs text-stone">Cancel for any reason</span></span><span className="font-mono text-xs">+${insFee}</span></label>
     <div className="bd-card bg-ink text-parchment rounded-2xl p-5"><p className="font-mono text-[10px] tracking-[0.16em] text-white/60">SUMMARY</p><div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span className="text-white/60">Base — {travelers} × ${trip.price.toLocaleString()}</span><span>${base.toLocaleString()}</span></div>{roomFee>0&&<div className="flex justify-between"><span className="text-white/60">Room</span><span>+${roomFee}</span></div>}{exTotal>0&&<div className="flex justify-between"><span className="text-white/60">Experiences</span><span>+${exTotal}</span></div>}{insFee>0&&<div className="flex justify-between"><span className="text-white/60">Insurance</span><span>+${insFee}</span></div>}<div className="flex justify-between"><span className="text-white/60">Taxes 8%</span><span>+${taxes}</span></div><div className="flex justify-between pt-3 border-t border-white/10 font-medium text-base"><span>Total</span><span>${total.toLocaleString()}</span></div></div><button onClick={confirm} className="w-full bg-white text-ink rounded-full py-4 mt-5 text-[12px] tracking-[0.16em] font-medium">CONFIRM — ${total.toLocaleString()}</button><p className="font-mono text-[10px] text-center text-white/50 mt-2">Mock checkout — no charge</p></div>
    </div>
    <AnimatePresence>{ok && (<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-parchment/90 backdrop-blur-xl grid place-items-center p-8 text-center"><div className="bg-white rounded-[24px] border border-black/5 p-8 max-w-[360px]"><span className="w-12 h-12 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto"><Check size={20}/></span><h4 className="font-display text-[22px] mt-4">Journey reserved</h4><p className="text-sm text-ink/60 mt-2">Held for 48 hours. We will confirm within 6 hours.</p><p className="font-mono text-[10px] mt-3 text-stone">REF: VYG-{Math.floor(Math.random()*90000+10000)}</p></div></motion.div>)}</AnimatePresence>
   </motion.div>
  </motion.div>
 )}
 </AnimatePresence>
 )
}
