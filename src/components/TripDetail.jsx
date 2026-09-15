import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { X, Star, Clock, MapPin, Check, Minus, ArrowRight } from 'lucide-react'
export default function TripDetail({trip,onClose,onBook}){
 const rootRef=useRef(null)
 useLayoutEffect(()=>{
   if(!trip || !rootRef.current) return
   const ctx=gsap.context(()=>{
     gsap.from('.tripd-hero img',{ scale: 1.06, duration: 1.0, ease:'power3.out' })
     gsap.from('.tripd-title',{ y: 20, opacity: 0, duration: 0.75, delay: 0.15, ease:'power3.out' })
     gsap.from('.tripd-meta',{ y: 10, opacity: 0, duration: 0.5, delay: 0.24 })
     gsap.from('.tripd-itinerary .it-row',{ y: 14, opacity: 0, duration: 0.6, stagger: 0.07, delay: 0.3, ease:'power3.out' })
     ScrollTrigger.refresh()
   }, rootRef)
   return ()=>ctx.revert()
 },[trip])
 if(!trip) return null
 return (
 <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-parchment overflow-y-auto">
  <div className="sticky top-0 z-10 bg-parchment/90 backdrop-blur-xl border-b border-black/5">
   <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
    <button onClick={onClose} className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] font-medium"><span className="w-8 h-8 rounded-full border border-black/10 grid place-items-center"><X size={14}/></span>CLOSE</button>
    <button onClick={()=>onBook(trip)} className="bg-ink text-white rounded-full px-5 py-2.5 text-[11px] tracking-[0.16em] font-medium">BOOK — ${trip.price.toLocaleString()}</button>
   </div>
  </div>
  <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6">
   <div className="grid lg:grid-cols-[1.35fr_0.75fr] gap-8">
    <div>
     <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 lg:col-span-8 h-[360px] lg:h-[520px] rounded-[20px] overflow-hidden relative bg-sand"><img src={trip.gallery[0]} alt={trip.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" onError={e=>e.currentTarget.src=trip.image}/></div>
      <div className="hidden lg:grid col-span-4 gap-3">
       <div className="h-[250px] rounded-[20px] overflow-hidden relative bg-sand"><img src={trip.gallery[1]} alt="" className="absolute inset-0 w-full h-full object-cover"/></div>
       <div className="h-[250px] rounded-[20px] overflow-hidden relative bg-sand"><img src={trip.gallery[2]||trip.gallery[0]} alt="" className="absolute inset-0 w-full h-full object-cover"/></div>
      </div>
     </div>
     <p className="font-mono text-[10px] tracking-[0.2em] text-stone flex items-center gap-2 mt-8"><MapPin size={12}/>{trip.destination.toUpperCase()} — {trip.category.toUpperCase()}</p>
     <h1 className="font-display text-[34px] lg:text-[48px] leading-[0.9] mt-3">{trip.title}</h1>
     <div className="flex flex-wrap gap-3 mt-4">
      <span className="inline-flex items-center gap-1.5 bg-white border border-black/5 rounded-full px-3 py-1.5 text-xs"><Star size={12} className="fill-ink"/>{trip.rating} ({trip.reviews})</span>
      <span className="inline-flex items-center gap-1.5 bg-white border border-black/5 rounded-full px-3 py-1.5 text-xs"><Clock size={12}/>{trip.duration}</span>
     </div>
     <p className="text-[15px] leading-relaxed text-ink/70 mt-6 max-w-[60ch]">{trip.description}</p>
     <div className="mt-10">
      <h3 className="font-display text-[22px]">Itinerary</h3>
      <div className="relative mt-6 border-l border-black/10 ml-3 pl-8 space-y-6">
       {trip.itinerary.map(it=>(
        <motion.div key={it.day} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative">
         <span className="absolute -left-[37px] top-1 w-6 h-6 rounded-full bg-ink text-white grid place-items-center text-[10px] font-mono">{it.day}</span>
         <h4 className="font-medium">{it.title}</h4>
         <p className="text-[13px] text-ink/60 mt-1">{it.desc}</p>
        </motion.div>
       ))}
      </div>
     </div>
     <div className="grid sm:grid-cols-2 gap-6 mt-10">
      <div className="bg-white rounded-2xl border border-black/5 p-5">
       <p className="font-mono text-[10px] tracking-[0.16em] flex items-center gap-2"><Check size={12} className="text-emerald-600"/> INCLUDED</p>
       <ul className="mt-3 space-y-2 text-sm text-ink/70">{trip.included.map(i=> <li key={i} className="flex gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-ink shrink-0"/>{i}</li>)}</ul>
      </div>
      <div className="bg-white rounded-2xl border border-black/5 p-5">
       <p className="font-mono text-[10px] tracking-[0.16em] flex items-center gap-2"><Minus size={12}/> NOT INCLUDED</p>
       <ul className="mt-3 space-y-2 text-sm text-ink/70">{trip.excluded.map(i=> <li key={i} className="flex gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-stone shrink-0"/>{i}</li>)}</ul>
      </div>
     </div>
     <div className="bg-sand/60 rounded-2xl border border-black/5 p-5 mt-6">
      <p className="font-mono text-[10px] tracking-[0.16em]">STAY & ACTIVITIES</p>
      <p className="font-medium mt-2">{trip.hotel}</p>
      <div className="flex flex-wrap gap-2 mt-3">{trip.activities.map(a=> <span key={a} className="bg-white border border-black/5 rounded-full px-3 py-1.5 text-xs">{a}</span>)}</div>
     </div>
    </div>
    <div className="lg:sticky lg:top-[72px] h-fit">
     <div className="bg-white rounded-[20px] border border-black/5 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <p className="font-mono text-[10px] tracking-[0.16em] text-stone">FROM</p>
      <p className="font-display text-[32px] leading-none mt-1">${trip.price.toLocaleString()} <span className="text-[12px] font-mono text-stone">/ person</span></p>
      <button onClick={()=>onBook(trip)} className="w-full bg-ink text-white rounded-full py-4 mt-6 text-[12px] tracking-[0.16em] font-medium inline-flex items-center justify-center gap-2">RESERVE JOURNEY <ArrowRight size={14}/></button>
      <p className="text-center font-mono text-[10px] text-stone mt-3">Free hold for 48 hours</p>
      <div className="mt-6 pt-6 border-t border-black/5 space-y-2 text-sm">
       <div className="flex justify-between"><span className="text-stone">Duration</span><span className="font-medium">{trip.duration}</span></div>
       <div className="flex justify-between"><span className="text-stone">Group</span><span className="font-medium">Private • 1–8</span></div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </motion.div>
 )
}
