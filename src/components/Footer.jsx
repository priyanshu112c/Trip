import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../utils/gsap'
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react'
export default function Footer(){
 const rootRef=useRef(null)
 useLayoutEffect(()=>{
   const ctx=gsap.context(()=>{
     gsap.from('.footer-col',{ y: 16, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
       scrollTrigger:{ trigger: rootRef.current, start: 'top 85%', once: true }})
     gsap.from('.footer-bottom',{ opacity: 0, duration: 0.6, delay: 0.3, scrollTrigger:{ trigger: rootRef.current, start: 'top 85%', once: true }})
   }, rootRef)
   return ()=>ctx.revert()
 },[])
 return (
  <footer ref={rootRef} className="bg-ink text-parchment overflow-hidden">
   <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-14">
    <div className="grid lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr] gap-10">
     <div className="footer-col">
      <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full border border-white/20 grid place-items-center text-[10px] font-mono tracking-[0.2em]">V</span><span className="font-display text-[22px] tracking-[0.18em] font-light">VOYAGE</span></div>
      <p className="text-[13px] leading-relaxed text-white/60 mt-4 max-w-[32ch]">Curated journeys for those who travel not to see more, but to feel more. Private, paced, precisely arranged.</p>
      <div className="flex gap-2 mt-6"><a href="#" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center hover:bg-white hover:text-ink transition"><Instagram size={14}/></a><a href="#" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center hover:bg-white hover:text-ink transition"><Twitter size={14}/></a><a href="#" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center hover:bg-white hover:text-ink transition"><Youtube size={14}/></a><a href="#" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center hover:bg-white hover:text-ink transition"><Mail size={14}/></a></div>
     </div>
     <div className="footer-col"><p className="font-mono text-[10px] tracking-[0.2em] text-white/50">DESTINATIONS</p><div className="mt-4 space-y-2 text-sm text-white/80"><p>Santorini</p><p>Swiss Alps</p><p>Bali</p><p>Kyoto</p><p>Iceland</p><p>Amalfi Coast</p></div></div>
     <div className="footer-col"><p className="font-mono text-[10px] tracking-[0.2em] text-white/50">JOURNEYS</p><div className="mt-4 space-y-2 text-sm text-white/80"><p>Luxury</p><p>Adventure</p><p>Culture</p><p>Beach</p><p>Nature</p><p>Family</p></div></div>
     <div className="footer-col">
      <p className="font-mono text-[10px] tracking-[0.2em] text-white/50">NEWSLETTER</p>
      <p className="text-sm text-white/60 mt-4">Field notes, new routes and quiet openings — once a month.</p>
      <div className="flex gap-2 mt-4"><input placeholder="Email address" className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-white/30"/><button className="bg-white text-ink rounded-full px-5 text-[11px] tracking-[0.14em] font-medium">JOIN</button></div>
      <p className="font-mono text-[10px] text-white/30 mt-3">No spam. Unsubscribe anytime.</p>
     </div>
    </div>
    <div className="footer-bottom mt-10 pt-6 border-t border-white/10 flex flex-col lg:flex-row gap-3 justify-between font-mono text-[10px] tracking-[0.14em] text-white/40">
     <span>© 2025 VOYAGE — CURATED JOURNEYS WORLDWIDE</span><span className="flex gap-4"><a href="#">PRIVACY</a><a href="#">TERMS</a><a href="#">CONTACT</a></span>
    </div>
   </div>
  </footer>
 )
}
