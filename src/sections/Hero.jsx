import { useRef, useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger, refreshAfterImages } from '../utils/gsap'
import { ArrowRight, Play } from 'lucide-react'
import SearchBar from '../components/SearchBar'

export default function Hero({ onSearch, onExplore }){
  const rootRef=useRef(null), bgRef=useRef(null), eyeRef=useRef(null), hRef=useRef(null), pRef=useRef(null), ctaRef=useRef(null), metaRef=useRef(null), searchRef=useRef(null)
  const [bgLoaded,setBgLoaded]=useState(false)
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.set(bgRef.current,{scale:1.08})
      const tl=gsap.timeline({defaults:{ease:'power3.out'}})
      tl.fromTo(bgRef.current,{opacity:0,scale:1.12},{opacity:1,scale:1.08,duration:1.6,ease:'power2.out'},0)
      tl.from(eyeRef.current,{y:14,opacity:0,duration:0.7},0.25)
      tl.from(hRef.current,{y:36,opacity:0,duration:0.95},0.32)
      tl.from(pRef.current,{y:18,opacity:0,duration:0.8},0.55)
      tl.from(ctaRef.current,{y:16,opacity:0,duration:0.7},0.68)
      tl.from(metaRef.current,{y:10,opacity:0,duration:0.6},0.9)
      tl.from(searchRef.current,{y:22,opacity:0,duration:0.8},0.92)
      gsap.from('.hero-avatar',{scale:0.85,opacity:0,duration:0.5,stagger:0.07,delay:1.05,ease:'back.out(1.2)'})
      const mm=gsap.matchMedia()
      mm.add('(min-width: 768px)',()=>{
        gsap.to(bgRef.current,{yPercent:12,scale:1.12,ease:'none',scrollTrigger:{trigger:rootRef.current,start:'top top',end:'bottom top',scrub:1.2}})
      })
      gsap.to('[data-hero-content]',{opacity:0,y:-18,ease:'none',scrollTrigger:{trigger:rootRef.current,start:'top top',end:'55% top',scrub:true}})
      refreshAfterImages(rootRef.current)
    },rootRef)
    return ()=>ctx.revert()
  },[])
  const onBgLoad=()=>{setBgLoaded(true);ScrollTrigger.refresh()}

  return (
    <section ref={rootRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80&auto=format&fit=crop" alt="Cinematic mountain lake at dawn" className="w-full h-full object-cover" loading="eager" decoding="async" onLoad={onBgLoad} onError={e=>{e.currentTarget.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop';onBgLoad()}} style={{opacity:bgLoaded?1:0,transition:'opacity 600ms'}}/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/18 to-black/60"/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"/>
      </div>
      <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light pointer-events-none" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}/>
      <div data-hero-content className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full pt-16">
            <div className="max-w-[760px]">
              <p ref={eyeRef} className="font-mono text-[10px] tracking-[0.28em] text-white/70 mb-6">— CURATED JOURNEYS • SINCE 2018 • WORLDWIDE</p>
              <h1 ref={hRef} className="font-display font-light text-white leading-[0.9] text-[44px] sm:text-[64px] lg:text-[82px] tracking-[-0.02em]">Journeys <br/><span className="italic font-light">beyond</span> the<br/>ordinary —</h1>
              <p ref={pRef} className="text-white/80 text-[15px] lg:text-[17px] leading-relaxed mt-6 max-w-[48ch] font-light">Private villas, hidden trails and tables set just for you. We design journeys that feel like they were written around your life — not the other way around.</p>
              <div ref={ctaRef} className="flex flex-wrap gap-3 mt-8">
                <button onClick={onExplore} className="bg-white text-ink rounded-full px-7 py-3.5 text-[12px] tracking-[0.16em] font-medium inline-flex items-center gap-2 hover:bg-parchment transition">EXPLORE JOURNEYS <ArrowRight size={14}/></button>
                <button onClick={()=>document.getElementById('destinations')?.scrollIntoView({behavior:'smooth'})} className="bg-white/10 backdrop-blur text-white border border-white/20 rounded-full px-7 py-3.5 text-[12px] tracking-[0.16em] font-medium inline-flex items-center gap-2 hover:bg-white hover:text-ink transition"><Play size={14} className="fill-white"/> WATCH FILM</button>
              </div>
              <div ref={metaRef} className="hidden lg:flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
                <div className="flex -space-x-2">
                  {['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop'].map((s,i)=>(<img key={i} src={s} alt="" className="hero-avatar w-9 h-9 rounded-full border-2 border-white object-cover bg-white/20" loading="eager" decoding="async" onError={e=>e.currentTarget.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&auto=format&fit=crop'}/>))}
                  <span className="hero-avatar w-9 h-9 rounded-full bg-white text-ink grid place-items-center text-[10px] font-medium border-2 border-white">+2.4k</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.14em] text-white/60">TRUSTED BY 25K+ TRAVELERS • 4.9/5 RATING</p>
                <div className="ml-auto hidden xl:flex items-center gap-3 text-white/70"><span className="w-12 h-px bg-white/30"/><span className="font-mono text-[10px] tracking-[0.18em]">SCROLL TO EXPLORE</span></div>
              </div>
            </div>
          </div>
        </div>
        <div ref={searchRef} className="px-4 lg:px-8 pb-6 lg:pb-8 will-change-transform"><SearchBar onSearch={onSearch}/></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-t from-black/40 to-transparent pointer-events-none"/>
    </section>
  )
}
