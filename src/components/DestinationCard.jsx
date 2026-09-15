import { ArrowUpRight, Star } from 'lucide-react'

export default function DestinationCard({ d, index, onSelect, featured }){
  const tall = index===0 || index===3
  const fallback='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop'
  return (
    <button
      onClick={()=>onSelect(d)}
      className={`group relative overflow-hidden text-left bg-white block w-full ${featured?'rounded-[20px]':''} ${tall?'lg:row-span-2':''}`}
      style={{borderRadius: '18px'}}
    >
      <div className={`relative overflow-hidden ${tall?'h-[520px] lg:h-full min-h-[520px]':'h-[360px]'}`}>
        <img src={d.thumb} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]" loading="lazy" decoding="async" onError={e=>{e.currentTarget.src=fallback}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em] font-medium flex items-center gap-1.5"><Star size={11} className="fill-ink text-ink"/>{d.rating} <span className="text-stone">({d.reviews})</span></span>
          <span className="hidden sm:inline bg-black/30 backdrop-blur text-white border border-white/20 px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em]">{d.category.toUpperCase()}</span>
        </div>
        <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white grid place-items-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition duration-300">
          <ArrowUpRight size={16}/>
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/70 mb-1">{d.country.toUpperCase()} — {d.region.toUpperCase()}</p>
          <h3 className="font-display text-[30px] lg:text-[34px] leading-none text-white font-light">{d.name}</h3>
          <p className="text-white/80 text-[13px] leading-relaxed mt-2 line-clamp-2 max-w-[32ch]">{d.description}</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/15">
            <span className="text-white font-mono text-[11px] tracking-[0.16em]">FROM ${d.price.toLocaleString()}</span>
            <span className="text-white/70 text-[11px] tracking-[0.12em] hidden sm:inline">{d.bestTime} • {d.duration}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
