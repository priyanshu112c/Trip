import { useState, useMemo, useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, refreshAfterImages } from '../utils/gsap'
import TripCard from '../components/TripCard'

const filters=['All','Luxury','Nature','Culture','Adventure','Beach']

export default function TripsSection({ trips, onSelectTrip }){
  const [active,setActive]=useState('All')
  const filtered=useMemo(()=> active==='All'? trips : trips.filter(t=> t.category===active),[active,trips])
  const rootRef=useRef(null)
  const gridRef=useRef(null)

  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from('.trips-eyebrow',{ y:14, opacity:0, duration:0.6, scrollTrigger:{ trigger: rootRef.current, start:'top 82%', once:true }})
      gsap.from('.trips-title',{ y:24, opacity:0, duration:0.85, delay:0.06, scrollTrigger:{ trigger: rootRef.current, start:'top 82%', once:true }})
      gsap.from('.trips-desc',{ y:16, opacity:0, duration:0.65, delay:0.14, scrollTrigger:{ trigger: rootRef.current, start:'top 82%', once:true }})
      gsap.from('.trips-filters',{ y:12, opacity:0, duration:0.6, delay:0.2, scrollTrigger:{ trigger: rootRef.current, start:'top 78%', once:true }})
      // initial grid reveal — once
      gsap.from('.trip-card',{ y:22, opacity:0, duration:0.8, stagger:0.08, ease:'power3.out',
        scrollTrigger:{ trigger: gridRef.current, start:'top 82%', once:true }})
      refreshAfterImages(rootRef.current)
    },rootRef)
    return ()=>ctx.revert()
  },[])

  // re-animate filtered grid on category change — GSAP stagger (no Framer layout glitch)
  useLayoutEffect(()=>{
    if(!gridRef.current) return
    const cards=gridRef.current.querySelectorAll('.trip-card')
    if(!cards.length) return
    gsap.fromTo(cards,{ y: 12, opacity: 0 },{ y:0, opacity:1, duration:0.55, stagger:0.06, ease:'power3.out', overwrite:'auto' })
    ScrollTrigger.refresh()
  },[filtered])

  return (
    <section ref={rootRef} id="journeys" className="bg-sand/40 border-y border-black/[0.04] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="trips-eyebrow font-mono text-[10px] tracking-[0.28em] text-stone mb-3">— 02 / JOURNEYS</p>
            <h2 className="trips-title font-display text-[36px] lg:text-[52px] leading-[0.9] tracking-tight">Journeys <span className="italic font-light">worth taking</span></h2>
          </div>
          <p className="trips-desc max-w-[42ch] text-[14px] leading-relaxed text-ink/60">Private, paced, and precisely arranged. Each itinerary is a starting point — we tailor it to your calendar, pace and curiosities.</p>
        </div>
        <div className="trips-filters flex gap-2 mt-8 overflow-x-auto scrollbar-none pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
          {filters.map(f=>(
            <button key={f} onClick={()=>setActive(f)} className={`shrink-0 rounded-full px-5 py-2.5 text-[11px] tracking-[0.14em] font-medium border transition ${active===f ? 'bg-ink text-white border-ink' : 'bg-white border-black/10 text-ink/70 hover:border-black/20 hover:text-ink'}`}>{f.toUpperCase()}</button>
          ))}
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-8">
          {filtered.map(t=>(
            <div key={t.id} className="trip-card will-change-transform"><TripCard t={t} onSelect={onSelectTrip}/></div>
          ))}
        </div>
        {filtered.length===0 && (<p className="text-center text-stone font-mono text-sm tracking-wide py-12">No journeys in this collection — try another filter.</p>)}
      </div>
    </section>
  )
}
