import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { X, Star, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react'

export default function DestinationDetail({ dest, onClose, onBook }){
  const rootRef=useRef(null)
  useLayoutEffect(()=>{
    if(!dest || !rootRef.current) return
    const ctx=gsap.context(()=>{
      gsap.from('.destd-img',{ scale:1.06, duration:1.0, ease:'power3.out' })
      gsap.from('.destd-kicker',{ y:12, opacity:0, duration:0.5, delay:0.15 })
      gsap.from('.destd-title',{ y:20, opacity:0, duration:0.75, delay:0.2, ease:'power3.out' })
      gsap.from('.destd-desc',{ y:12, opacity:0, duration:0.6, delay:0.32 })
      gsap.from('.destd-stat',{ y:12, opacity:0, duration:0.55, stagger:0.07, delay:0.42, ease:'power3.out' })
      gsap.from('.destd-cta',{ y:10, opacity:0, duration:0.55, delay:0.58 })
    }, rootRef)
    return ()=>ctx.revert()
  },[dest])
  if(!dest) return null
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 lg:p-8 overflow-y-auto">
      <motion.div ref={rootRef} initial={{y:24, opacity:0}} animate={{y:0, opacity:1}} exit={{y:24, opacity:0}} transition={{ease:[0.22,1,0.36,1], duration:0.5}} className="max-w-[1120px] mx-auto bg-parchment rounded-[24px] overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-black/10 grid place-items-center hover:bg-white transition"><X size={16}/></button>
        <div className="grid lg:grid-cols-2">
          <div className="relative h-[360px] lg:h-auto lg:min-h-[640px] overflow-hidden bg-sand">
            <img src={dest.image} alt={dest.name} className="destd-img absolute inset-0 w-full h-full object-cover will-change-transform" loading="eager" decoding="async" onError={e=>e.currentTarget.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop'}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden"/>
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 flex items-center gap-2">
              <span className="bg-white px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em] font-medium flex items-center gap-1.5"><Star size={12} className="fill-ink"/>{dest.rating} • {dest.reviews} reviews</span>
              <span className="bg-black/40 backdrop-blur text-white border border-white/20 px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em] flex items-center gap-1"><MapPin size={12}/>{dest.coordinates}</span>
            </div>
          </div>
          <div className="p-6 lg:p-10">
            <p className="destd-kicker font-mono text-[10px] tracking-[0.22em] text-stone">{dest.country.toUpperCase()} — {dest.region.toUpperCase()}</p>
            <h2 className="destd-title font-display text-[36px] lg:text-[48px] leading-none tracking-tight mt-2">{dest.name}</h2>
            <p className="destd-desc text-[15px] leading-relaxed text-ink/70 mt-4">{dest.longDescription}</p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="destd-stat bg-white rounded-2xl border border-black/5 p-4">
                <p className="font-mono text-[9px] tracking-[0.16em] text-stone flex items-center gap-1"><Calendar size={10}/> BEST TIME</p>
                <p className="font-medium text-sm mt-1">{dest.bestTime}</p>
              </div>
              <div className="destd-stat bg-white rounded-2xl border border-black/5 p-4">
                <p className="font-mono text-[9px] tracking-[0.16em] text-stone flex items-center gap-1"><Clock size={10}/> DURATION</p>
                <p className="font-medium text-sm mt-1">{dest.duration}</p>
              </div>
              <div className="destd-stat bg-white rounded-2xl border border-black/5 p-4">
                <p className="font-mono text-[9px] tracking-[0.16em] text-stone">FROM</p>
                <p className="font-display text-lg leading-none mt-1">${dest.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-mono text-[10px] tracking-[0.18em]">HIGHLIGHTS</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {dest.highlights.map(h=>(
                  <span key={h} className="bg-sand border border-black/5 rounded-full px-3.5 py-2 text-xs font-medium">{h}</span>
                ))}
              </div>
            </div>

            <div className="destd-cta flex gap-3 mt-8">
              <button onClick={()=>onBook(dest)} className="flex-1 bg-ink text-white rounded-full py-4 text-[12px] tracking-[0.16em] font-medium inline-flex items-center justify-center gap-2 hover:bg-charcoal transition">BOOK THIS JOURNEY <ArrowRight size={14}/></button>
              <button onClick={onClose} className="px-6 rounded-full border border-black/10 text-[12px] tracking-[0.14em] font-medium hover:bg-white transition">CLOSE</button>
            </div>
            <p className="font-mono text-[10px] tracking-[0.12em] text-stone mt-3 text-center">Free cancellation • Tailored to your dates</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
