import { useRef, useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { useCountUp } from '../hooks/useScroll'

function Stat({value,suffix,label,desc, target}){
  const ref=useRef(null)
  const numRef=useRef(null)
  const [active,setActive]=useState(false)
  useLayoutEffect(()=>{
    const el=ref.current
    if(!el) return
    const ctx=gsap.context(()=>{
      gsap.from(el,{ y: 18, opacity: 0, duration: 0.8, ease:'power3.out',
        scrollTrigger:{ trigger: el, start:'top 84%', once:true }})
      gsap.from(el.querySelector('.stat-line'),{ scaleX:0, duration:0.9, ease:'power3.out',
        scrollTrigger:{ trigger: el, start:'top 84%', once:true }})
    }, el)
    return ()=>ctx.revert()
  },[])
  // count-up trigger via ScrollTrigger-safe IO fallback still ok
  useLayoutEffect(()=>{
    const el=ref.current
    if(!el) return
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setActive(true) },{threshold:0.4})
    io.observe(el)
    return ()=>io.disconnect()
  },[])
  const count=useCountUp(target, active)
  return (
    <div ref={ref} className="border-t border-black/10 pt-6 overflow-hidden">
      <div className="stat-line h-px bg-black/10 mb-6 origin-left -mt-6"/>
      <p ref={numRef} className="font-display text-[40px] lg:text-[48px] leading-none tracking-tight">{count}{suffix}<span className="text-brass">.</span></p>
      <p className="font-mono text-[10px] tracking-[0.18em] mt-2">{label}</p>
      <p className="text-[13px] leading-relaxed text-ink/60 mt-2 max-w-[20ch]">{desc}</p>
    </div>
  )
}

export default function StatsSection(){
  const rootRef=useRef(null)
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from('.stats-rule',{ scaleX:0, duration:0.9, ease:'power3.out', scrollTrigger:{ trigger: rootRef.current, start:'top 85%', once:true }})
    },rootRef)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={rootRef} className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20 overflow-hidden">
      <div className="stats-rule h-px bg-black/10 mb-12 origin-left"/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        <Stat target={120} value="120+" suffix="+" label="DESTINATIONS" desc="Hand-picked stays and routes across 6 continents."/>
        <Stat target={4} value="4.9" suffix="/5" label="AVERAGE RATING" desc="From 3,200+ verified traveler reviews."/>
        <Stat target={25} value="25K+" suffix="K+" label="TRAVELERS" desc="Couples, families and solo explorers since 2018."/>
        <Stat target={98} value="98%" suffix="%" label="SATISFACTION" desc="Would travel with us again — and do."/>
      </div>
    </section>
  )
}
