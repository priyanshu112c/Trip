import { Star, Clock, ArrowUpRight } from 'lucide-react'

export default function TripCard({ t, onSelect }){
  const fb='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&auto=format&fit=crop'
  return (
    <div className="bg-white rounded-[18px] overflow-hidden border border-black/[0.06] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-shadow group h-full flex flex-col">
      <div className="relative h-[220px] overflow-hidden shrink-0 bg-sand">
        <img src={t.image} alt={t.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition duration-700" loading="lazy" decoding="async" onError={e=>{e.currentTarget.src=fb}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"/>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white px-2.5 py-1 rounded-full text-[10px] tracking-[0.14em] font-medium">{t.category.toUpperCase()}</span>
          <span className="bg-black/40 backdrop-blur text-white border border-white/20 px-2.5 py-1 rounded-full text-[10px] tracking-[0.12em] flex items-center gap-1"><Clock size={10}/>{t.duration}</span>
        </div>
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1"><Star size={12} className="fill-ink"/>{t.rating}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="font-mono text-[10px] tracking-[0.18em] text-stone">{t.destination.toUpperCase()}</p>
        <h3 className="font-display text-[20px] leading-tight mt-1 line-clamp-2 min-h-[52px]">{t.title}</h3>
        <p className="text-[13px] leading-relaxed text-ink/60 mt-2 line-clamp-2 min-h-[40px]">{t.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-stone">FROM</p>
            <p className="font-display text-[18px]">${t.price.toLocaleString()} <span className="text-[11px] font-mono tracking-[0.1em] text-stone">/ person</span></p>
          </div>
          <button onClick={()=>onSelect(t)} className="w-9 h-9 rounded-full bg-ink text-white grid place-items-center hover:bg-charcoal transition shrink-0">
            <ArrowUpRight size={16}/>
          </button>
        </div>
        <p className="font-mono text-[10px] tracking-[0.12em] text-stone mt-3 pt-3 border-t border-black/5">{t.availability} • {t.reviews} reviews</p>
      </div>
    </div>
  )
}
