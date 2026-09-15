import { useState, useMemo, useEffect, useRef, useLayoutEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { gsap, ScrollTrigger, refreshAfterImages } from './utils/gsap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DestinationDetail from './components/DestinationDetail'
import TripDetail from './components/TripDetail'
import BookingDrawer from './components/BookingDrawer'
import Hero from './sections/Hero'
import DestinationsSection from './sections/DestinationsSection'
import TripsSection from './sections/TripsSection'
import StatsSection from './sections/StatsSection'
import Testimonials from './sections/Testimonials'
import { destinations } from './data/mockData'
import { trips as baseTrips } from './data/trips'
import { extraTrips, testimonials } from './data/trips-extra'
import { useScrolled } from './hooks/useScroll'
const allTrips=[...baseTrips,...extraTrips]
export default function App(){
 const scrolled=useScrolled(40)
 const [destDetail,setDestDetail]=useState(null)
 const [tripDetail,setTripDetail]=useState(null)
 const [bookingTrip,setBookingTrip]=useState(null)
 const [bookingOpen,setBookingOpen]=useState(false)
 const [search,setSearch]=useState(null)
 const standardRef=useRef(null)
 const ctaRef=useRef(null)
 useLayoutEffect(()=>{
   const ctx=gsap.context(()=>{
     gsap.from('.standard-kicker',{ y:14, opacity:0, duration:0.6, scrollTrigger:{ trigger: standardRef.current, start:'top 82%', once:true }})
     gsap.from('.standard-title',{ y:24, opacity:0, duration:0.85, delay:0.06, scrollTrigger:{ trigger: standardRef.current, start:'top 82%', once:true }})
     gsap.from('.standard-desc',{ y:16, opacity:0, duration:0.65, delay:0.12, scrollTrigger:{ trigger: standardRef.current, start:'top 82%', once:true }})
     gsap.from('.standard-card',{ y:18, opacity:0, duration:0.7, stagger:0.09, ease:'power3.out', scrollTrigger:{ trigger: standardRef.current, start:'top 78%', once:true }})
     // CTA section
     gsap.from('.cta-kicker',{ y:12, opacity:0, duration:0.6, scrollTrigger:{ trigger: ctaRef.current, start:'top 82%', once:true }})
     gsap.from('.cta-title',{ y:28, opacity:0, duration:0.9, delay:0.07, scrollTrigger:{ trigger: ctaRef.current, start:'top 82%', once:true }})
     gsap.from('.cta-desc',{ y:16, opacity:0, duration:0.7, delay:0.14, scrollTrigger:{ trigger: ctaRef.current, start:'top 82%', once:true }})
     gsap.from('.cta-actions',{ y:14, opacity:0, duration:0.6, delay:0.22, scrollTrigger:{ trigger: ctaRef.current, start:'top 82%', once:true }})
     gsap.from('.cta-card',{ y:28, opacity:0, scale:0.98, duration:0.9, ease:'power3.out', scrollTrigger:{ trigger: ctaRef.current, start:'top 78%', once:true }})
     // parallax CTA image
     const mm=gsap.matchMedia()
     mm.add('(min-width: 1024px)',()=>{
       const img=ctaRef.current?.querySelector('.cta-img')
       if(img) gsap.to(img,{ yPercent: -7, ease:'none', scrollTrigger:{ trigger: ctaRef.current, start:'top bottom', end:'bottom top', scrub:1.1 }})
     })
     refreshAfterImages(document.body)
     const onResize=()=> ScrollTrigger.refresh()
     window.addEventListener('load', refreshAfterImages)
     window.addEventListener('resize', onResize)
     setTimeout(()=> ScrollTrigger.refresh(), 600)
     return ()=> window.removeEventListener('resize', onResize)
   })
   return ()=>ctx.revert()
 },[])
 const filtered=useMemo(()=>{
  if(!search) return allTrips
  return allTrips.filter(t=>{
   if(search.dest?.trim()){
    const q=search.dest.toLowerCase()
    if(!t.destination.toLowerCase().includes(q) && !t.title.toLowerCase().includes(q)) return false
   }
   if(search.type && search.type!=='Any Journey'){
    const c=search.type.toLowerCase()
    const tc=t.category.toLowerCase()
    if(c==='mountains' && tc!=='nature') return false
    if(c==='cultural' && tc!=='culture') return false
    if(c!=='mountains'&&c!=='cultural'&&tc!==c) return false
   }
   return true
  })
 },[search])
 useEffect(()=>{
  const lock=destDetail||tripDetail||bookingOpen
  document.body.style.overflow=lock?'hidden':''
  return()=>{document.body.style.overflow=''}
 },[destDetail,tripDetail,bookingOpen])
 const onNav=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
 const onExplore=()=>document.getElementById('journeys')?.scrollIntoView({behavior:'smooth'})
 const handleSearch=q=>{setSearch(q); setTimeout(()=>onNav('journeys'),120)}
 const openBooking=t=>{setBookingTrip(t); setBookingOpen(true)}
 const handleDestBook=d=>{
  const linked=allTrips.find(x=>x.destinationId===d.id)||allTrips[0]
  const synth={...linked,title:`${d.name} — Private`,destination:d.name,image:d.image,hotel:`Private stay in ${d.name}`}
  openBooking(synth); setDestDetail(null)
 }
 const handleTripBook=t=>{setTripDetail(null); openBooking(t)}
 return (
  <div className="min-h-screen">
   <Navbar scrolled={scrolled} onNav={onNav} onBook={()=>openBooking(allTrips[0])}/>
   <Hero onSearch={handleSearch} onExplore={onExplore}/>
   <DestinationsSection destinations={destinations} onSelect={setDestDetail}/>
   <div id="experiences" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-3 gap-6 border-y border-black/[0.06] overflow-hidden">
    <div className="lg:col-span-2">
     <p className="standard-kicker font-mono text-[10px] tracking-[0.28em] text-stone">— THE VOYAGE STANDARD</p>
     <h3 className="standard-title font-display text-[28px] lg:text-[36px] leading-tight mt-3">Private from the first <span className="italic font-light">hello</span></h3>
     <p className="standard-desc text-[14px] text-ink/60 mt-3 max-w-[52ch]">Every journey is built around your calendar. No fixed departures, no large groups — just your pace.</p>
    </div>
    <div className="space-y-4">
     <div className="standard-card bg-sand rounded-2xl p-5 border border-black/5"><p className="font-mono text-[10px] tracking-[0.16em]">01 — DESIGN</p><p className="text-sm mt-2 text-ink/70">We map days around light — sunrise without crowds, tables held for you.</p></div>
     <div className="standard-card bg-sand rounded-2xl p-5 border border-black/5"><p className="font-mono text-[10px] tracking-[0.16em]">02 — CARE</p><p className="text-sm mt-2 text-ink/70">A local host on call, 24/7. Linger or change course — we redraw the day.</p></div>
    </div>
   </div>
   <TripsSection trips={filtered} onSelectTrip={setTripDetail}/>
   <StatsSection/>
   <Testimonials items={testimonials}/>
   <section className="bg-sand">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
     <div>
      <p className="cta-kicker font-mono text-[10px] tracking-[0.28em] text-stone">— FINAL CALL</p>
      <h2 className="cta-title font-display text-[42px] lg:text-[56px] leading-[0.9] mt-3">Your next journey <br/><span className="italic font-light">starts here.</span></h2>
      <p className="cta-desc text-[15px] text-ink/60 mt-4 max-w-[46ch]">Tell us when you want to travel and how you want to feel when you return.</p>
      <div className="flex flex-wrap gap-3 mt-8">
       <button onClick={onExplore} className="bg-ink text-white rounded-full px-7 py-3.5 text-[12px] tracking-[0.16em] font-medium">EXPLORE DESTINATIONS</button>
       <button onClick={()=>openBooking(allTrips[2])} className="bg-white border border-black/10 rounded-full px-7 py-3.5 text-[12px] tracking-[0.16em] font-medium">BOOK YOUR TRIP</button>
      </div>
     </div>
     <div className="relative h-[420px] lg:h-[520px] rounded-[24px] overflow-hidden">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl p-4 flex items-center justify-between">
       <div><p className="font-mono text-[10px] text-stone">FEATURED</p><p className="font-display">Amalfi — La Dolce Luce</p><p className="text-xs text-stone">6 days • From $3,980</p></div>
       <button onClick={()=>setTripDetail(allTrips.find(t=>t.id==='t6'))} className="w-9 h-9 rounded-full bg-ink text-white grid place-items-center">→</button>
      </div>
     </div>
    </div>
   </section>
   <Footer/>
   <AnimatePresence>{destDetail && <DestinationDetail dest={destDetail} onClose={()=>setDestDetail(null)} onBook={handleDestBook}/>}</AnimatePresence>
   <AnimatePresence>{tripDetail && <TripDetail trip={tripDetail} onClose={()=>setTripDetail(null)} onBook={handleTripBook}/>}</AnimatePresence>
   <BookingDrawer trip={bookingTrip||allTrips[0]} open={bookingOpen} onClose={()=>setBookingOpen(false)}/>
  </div>
 )
}

