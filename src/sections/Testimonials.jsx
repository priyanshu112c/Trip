import { useState, useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, refreshAfterImages } from '../utils/gsap'
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react'

export default function Testimonials({ items }){
  const [idx,setIdx]=useState(0)
  const t=items[idx]
  const rootRef=useRef(null)
  const quoteRef=useRef(null)
  const imgWrapRef=useRef(null)

  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from('.testi-eyebrow',{ y:12, opacity:0, duration:0.6, scrollTrigger:{ trigger: rootRef.current, start:'top 80%', once:true }})
      gsap.from('.testi-title',{ y:22, opacity:0, duration:0.8, delay:0.08, scrollTrigger:{ trigger: rootRef.current, start:'top 80%', once:true }})
      gsap.from(imgWrapRef.current,{ y:18, opacity:0, duration:0.9, ease:'power3.out', scrollTrigger:{ trigger: rootRef.current, start:'top 75%', once:true }})
      // subtle parallax on image
      const mm=gsap.matchMedia()
      mm.add('(min-width: 1024px)',()=>{
        const img=imgWrapRef.current?.querySelector('img')
        if(!img) return
        gsap.to(img,{ yPercent: -6, ease:'none', scrollTrigger:{ trigger: imgWrapRef.current, start:'top bottom', end:'bottom top', scrub: 1.1 }})
      })
      refreshAfterImages(rootRef.current)
    }, rootRef)
    return ()=>ctx.revert()
  },[])

  // GSAP crossfade on testimonial change — timeline-based, no Framer fights with ScrollTrigger
  useLayoutEffect(()=>{
    if(!quoteRef.current) return
    const ctx=gsap.context(()=>{
      gsap.fromTo(quoteRef.current,{ opacity:0, x: 14 },{ opacity:1, x:0, duration:0.55, ease:'power3.out', overwrite:'auto' })
    }, quoteRef)
    // image ken burns
    if(imgWrapRef.current){
      const img=imgWrapRef.current.querySelector('img')
      if(img) gsap.fromTo(img,{ scale:1.04 },{ scale:1, duration:0.9, ease:'power2.out', overwrite:'auto' })
    }
  },[idx])

  return (
    <section ref={rootRef} id="journal" className="bg-ink text-parchment overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="testi-eyebrow font-mono text-[10px] tracking-[0.28em] text-white/50 mb-3">— 03 / TRAVELER NOTES</p>
            <h2 className="testi-title font-display text-[36px] lg:text-[48px] leading-none tracking-tight">What stays <span className="italic font-light text-white/80">with you</span></h2>
          </div>
          <div className="hidden lg:flex gap-2">
            <button onClick={()=>setIdx((idx-1+items.length)%items.length)} className="w-10 h-10 rounded-full border border-white/15 grid place-items-center hover:bg-white hover:text-ink transition"><ArrowLeft size={16}/></button>
            <button onClick={()=>setIdx((idx+1)%items.length)} className="w-10 h-10 rounded-full bg-white text-ink grid place-items-center hover:bg-parchment transition"><ArrowRight size={16}/></button>
          </div>
        </div>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div ref={quoteRef} className="relative will-change-transform">
            <Quote size={28} className="text-brass/60 mb-4"/>
            <p className="font-display text-[26px] lg:text-[32px] leading-tight font-light">“{t.quote}”</p>
            <div className="flex items-center gap-4 mt-8">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover bg-white/10" loading="lazy" decoding="async" onError={e=>e.currentTarget.style.display='none'}/>
              <div>
                <p className="font-medium text-[14px] tracking-wide">{t.name}</p>
                <p className="font-mono text-[10px] tracking-[0.14em] text-white/60">{t.location}</p>
              </div>
              <span className="ml-auto hidden sm:inline font-mono text-[10px] tracking-[0.16em] px-3 py-1.5 rounded-full border border-white/15 text-white/70">{t.trip.toUpperCase()}</span>
            </div>
            <div className="flex gap-2 mt-8 lg:hidden">
              {items.map((_,i)=>(<span key={i} className={`h-1 rounded-full transition-all ${i===idx?'w-8 bg-brass':'w-4 bg-white/20'}`}/>))}
            </div>
          </div>
          <div ref={imgWrapRef} className="relative h-[420px] lg:h-[520px] rounded-[24px] overflow-hidden bg-white/5">
            <img src={t.avatar.replace('w=200','w=800')} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90 will-change-transform" loading="lazy" decoding="async" onError={e=>e.currentTarget.style.opacity='0'}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"/>
            <div className="absolute bottom-0 p-6 flex gap-2">
              {items.map((_,i)=>(<button key={i} onClick={()=>setIdx(i)} className={`h-1 rounded-full transition-all ${i===idx?'w-10 bg-white':'w-6 bg-white/30'}`} aria-label={`Go to testimonial ${i+1}`}/>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
