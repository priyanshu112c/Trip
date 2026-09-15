import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '../utils/gsap'
import { Search, Menu, X } from 'lucide-react'

export default function Navbar({ scrolled, onNav, onBook }){
  const [open,setOpen]=useState(false)
  const navRef=useRef(null)
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from(navRef.current,{ y: -22, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.08 })
      gsap.from('.nav-link',{ y: 10, opacity: 0, duration: 0.6, stagger: 0.06, delay: 0.35, ease: 'power3.out' })
      gsap.from('.nav-cta',{ y: 10, opacity: 0, duration: 0.6, delay: 0.6, ease: 'power3.out' })
    },navRef)
    return ()=>ctx.revert()
  },[])
  const links=[
    {label:'Destinations', id:'destinations'},
    {label:'Experiences', id:'experiences'},
    {label:'Journeys', id:'journeys'},
    {label:'Journal', id:'journal'},
  ]
  return (
    <>
      <header ref={navRef} className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? 'bg-parchment/85 backdrop-blur-xl border-b border-black/[0.06] py-3' : 'bg-transparent py-6 border-b border-white/10'}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className={`flex items-center gap-3 ${scrolled?'text-ink':'text-white'}`}>
            <span className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] tracking-[0.2em] font-mono" style={{borderColor: scrolled?'#0F0F0E':'rgba(255,255,255,0.4)'}}>V</span>
            <span className="font-display text-[22px] tracking-[0.18em] font-light">VOYAGE</span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.24em] opacity-60 mt-1">— EST. 2018</span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map(l=>(
              <button key={l.id} onClick={()=>onNav(l.id)} className={`nav-link text-[11px] tracking-[0.18em] font-medium link-underline ${scrolled?'text-ink/70 hover:text-ink':'text-white/80 hover:text-white'}`}>{l.label.toUpperCase()}</button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button aria-label="Search" onClick={()=>onNav('journeys')} className={`hidden lg:grid w-9 h-9 place-items-center rounded-full border transition ${scrolled?'border-black/10 text-ink hover:bg-black hover:text-white':'border-white/20 text-white hover:bg-white hover:text-ink'}`}>
              <Search size={14} />
            </button>
            <button className={`hidden lg:block text-[11px] tracking-[0.18em] font-medium ${scrolled?'text-ink':'text-white'}`}>SIGN IN</button>
            <button onClick={onBook} className={`nav-cta hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] tracking-[0.16em] font-medium transition ${scrolled?'bg-ink text-white hover:bg-charcoal':'bg-white text-ink hover:bg-parchment'}`}>
              BOOK A JOURNEY <span className="text-[14px] leading-none">→</span>
            </button>
            <button onClick={()=>setOpen(v=>!v)} className={`lg:hidden w-9 h-9 grid place-items-center rounded-full border ${scrolled?'border-black/10 text-ink':'border-white/25 text-white'}`}>
              {open ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-30 bg-ink text-parchment lg:hidden">
            <div className="pt-28 px-6 pb-10 h-full flex flex-col">
              <div className="space-y-2">
                {links.map((l,i)=>(
                  <motion.button
                    key={l.id}
                    initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05*i}}
                    onClick={()=>{onNav(l.id); setOpen(false)}}
                    className="block text-left font-display text-[42px] font-light leading-none tracking-tight hover:text-brass transition"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] opacity-50 mr-3">0{i+1}</span>{l.label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto border-t border-white/10 pt-6 space-y-4">
                <p className="font-mono text-[10px] tracking-[0.2em] opacity-50">CURATED JOURNEYS — WORLDWIDE</p>
                <button onClick={()=>{onBook(); setOpen(false)}} className="w-full bg-brass text-white rounded-full py-4 text-[12px] tracking-[0.2em] font-medium">BOOK A JOURNEY</button>
                <div className="flex gap-6 text-[11px] tracking-[0.15em] opacity-60">
                  <span>INSTAGRAM</span><span>JOURNAL</span><span>CONTACT</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
