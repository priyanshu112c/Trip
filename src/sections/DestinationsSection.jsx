import { useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, refreshAfterImages } from '../utils/gsap'
import DestinationCard from '../components/DestinationCard'

export default function DestinationsSection({ destinations, onSelect }){
  const rootRef=useRef(null)
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from('.dest-eyebrow',{ y:14, opacity:0, duration:0.7, ease:'power3.out',
        scrollTrigger:{ trigger: rootRef.current, start:'top 82%', once:true }})
      gsap.from('.dest-title',{ y:28, opacity:0, duration:0.9, ease:'power3.out', delay:0.08,
        scrollTrigger:{ trigger: rootRef.current, start:'top 82%', once:true }})
      gsap.from('.dest-desc',{ y:16, opacity:0, duration:0.7, delay:0.16, ease:'power3.out',
        scrollTrigger:{ trigger: rootRef.current, start:'top 82%', once:true }})
      // cards — stagger, clip + fade, once
      gsap.from('.dest-card',{ y:28, opacity:0, duration:0.9, stagger:0.09, ease:'power3.out',
        scrollTrigger:{ trigger:'.dest-grid', start:'top 78%', once:true }})
      // subtle image parallax inside cards (desktop only)
      const mm=gsap.matchMedia()
      mm.add('(min-width:1024px)',()=>{
        gsap.utils.toArray('.dest-card img').forEach(img=>{
          gsap.to(img,{ yPercent: -6, ease:'none',
            scrollTrigger:{ trigger: img.closest('.dest-card'), start:'top bottom', end:'bottom top', scrub:1.2 }})
        })
      })
      refreshAfterImages(rootRef.current)
    },rootRef)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={rootRef} id="destinations" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="dest-eyebrow font-mono text-[10px] tracking-[0.28em] text-stone mb-3">— 01 / DESTINATIONS</p>
          <h2 className="dest-title font-display text-[36px] lg:text-[52px] leading-[0.9] tracking-tight">Where silence <br/><span className="italic font-light">speaks loudest</span></h2>
        </div>
        <div className="dest-desc max-w-[38ch]">
          <p className="text-[14px] leading-relaxed text-ink/60">Six places we return to again and again — not for landmarks, but for the way light falls, and time loosens.</p>
          <div className="hidden lg:flex items-center gap-2 mt-4 font-mono text-[10px] tracking-[0.16em] text-stone">
            <span className="w-10 h-px bg-black/10"/> EDITORIAL SELECTION • 2025
          </div>
        </div>
      </div>
      <div className="dest-grid grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-[360px]">
        {destinations.map((d,i)=>(
          <div key={d.id} className="dest-card will-change-transform">
            <DestinationCard d={d} index={i} onSelect={onSelect}/>
          </div>
        ))}
      </div>
    </section>
  )
}
