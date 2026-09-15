import { useState } from 'react'
import { MapPin, Calendar, Users, Compass, Search, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const tripOptions=['Any Journey','Adventure','Luxury','Beach','Mountains','Cultural','Romantic','Family']

export default function SearchBar({ onSearch }){
  const [dest,setDest]=useState('')
  const [dates,setDates]=useState('')
  const [guests,setGuests]=useState(2)
  const [type,setType]=useState('Any Journey')
  const [open,setOpen]=useState(false)

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-[18px] lg:rounded-full border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-2 flex flex-col lg:flex-row items-stretch gap-2">
        {/* Destination */}
        <label className="flex-1 flex items-center gap-3 px-5 py-3 lg:py-2 rounded-full lg:rounded-full bg-sand/60 lg:bg-transparent border lg:border-0 border-black/5">
          <span className="w-8 h-8 rounded-full bg-white border border-black/5 grid place-items-center shrink-0"><MapPin size={14} className="text-stone"/></span>
          <span className="flex-1 text-left">
            <span className="block font-mono text-[9px] tracking-[0.2em] text-stone">DESTINATION</span>
            <input value={dest} onChange={e=>setDest(e.target.value)} placeholder="Where to?" className="w-full bg-transparent outline-none text-[14px] font-medium placeholder:text-ink/40 -mt-0.5" />
          </span>
        </label>
        <span className="hidden lg:block w-px bg-black/5 my-2"/>
        {/* Dates */}
        <label className="flex-1 flex items-center gap-3 px-5 py-3 rounded-full bg-sand/60 lg:bg-transparent border lg:border-0 border-black/5">
          <span className="w-8 h-8 rounded-full bg-white border border-black/5 grid place-items-center shrink-0"><Calendar size={14} className="text-stone"/></span>
          <span className="flex-1">
            <span className="block font-mono text-[9px] tracking-[0.2em] text-stone">DATES</span>
            <input value={dates} onChange={e=>setDates(e.target.value)} placeholder="Add dates" className="w-full bg-transparent outline-none text-[14px] font-medium placeholder:text-ink/40 -mt-0.5" />
          </span>
        </label>
        <span className="hidden lg:block w-px bg-black/5 my-2"/>
        {/* Guests */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-sand/60 lg:bg-transparent border lg:border-0 border-black/5">
          <span className="w-8 h-8 rounded-full bg-white border border-black/5 grid place-items-center shrink-0"><Users size={14} className="text-stone"/></span>
          <div className="flex-1">
            <span className="block font-mono text-[9px] tracking-[0.2em] text-stone">TRAVELERS</span>
            <div className="flex items-center gap-2 -mt-0.5">
              <button onClick={()=>setGuests(Math.max(1,guests-1))} className="w-6 h-6 rounded-full border border-black/10 grid place-items-center text-sm leading-none">−</button>
              <span className="text-[14px] font-medium w-6 text-center">{guests}</span>
              <button onClick={()=>setGuests(guests+1)} className="w-6 h-6 rounded-full bg-ink text-white grid place-items-center text-sm leading-none">+</button>
              <span className="text-[12px] text-stone ml-1">guests</span>
            </div>
          </div>
        </div>
        <span className="hidden lg:block w-px bg-black/5 my-2"/>
        {/* Type */}
        <div className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-sand/60 lg:bg-transparent border lg:border-0 border-black/5">
          <span className="w-8 h-8 rounded-full bg-white border border-black/5 grid place-items-center shrink-0"><Compass size={14} className="text-stone"/></span>
          <button onClick={()=>setOpen(!open)} className="flex-1 text-left">
            <span className="block font-mono text-[9px] tracking-[0.2em] text-stone">JOURNEY TYPE</span>
            <span className="flex items-center gap-2 text-[14px] font-medium -mt-0.5">{type} <ChevronDown size={14} className={`text-stone transition ${open?'rotate-180':''}`}/></span>
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} className="absolute left-0 right-0 lg:left-auto lg:right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-xl border border-black/5 p-2 z-20 w-full lg:w-[220px]">
                {tripOptions.map(o=>(
                  <button key={o} onClick={()=>{setType(o); setOpen(false)}} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm ${type===o?'bg-ink text-white':'hover:bg-sand'}`}>{o}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={()=>onSearch({dest,dates,guests,type})} className="bg-ink text-white rounded-full px-8 py-4 lg:py-3 text-[12px] tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-charcoal transition shrink-0">
          <Search size={14}/> SEARCH
        </button>
      </div>
      <p className="text-center font-mono text-[10px] tracking-[0.16em] text-white/60 mt-3 hidden lg:block">TRY “KYOTO IN AUTUMN” • “AMALFI YACHT WEEK” • “ICELAND AURORA LODGE”</p>
    </div>
  )
}
