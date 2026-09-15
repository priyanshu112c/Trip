import { useEffect, useState } from 'react'
export function useScrolled(threshold=20){
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{
    const onScroll=()=> setScrolled(window.scrollY>threshold)
    onScroll()
    window.addEventListener('scroll',onScroll,{passive:true})
    return ()=> window.removeEventListener('scroll',onScroll)
  },[threshold])
  return scrolled
}
export function useCountUp(target,active, duration=1600){
  const [val,setVal]=useState(0)
  useEffect(()=>{
    if(!active) return
    let raf, start
    const step=(ts)=>{
      if(!start) start=ts
      const p=Math.min((ts-start)/duration,1)
      const eased=1-Math.pow(1-p,3)
      setVal(Math.floor(eased*target))
      if(p<1) raf=requestAnimationFrame(step)
      else setVal(target)
    }
    raf=requestAnimationFrame(step)
    return ()=> cancelAnimationFrame(raf)
  },[target,active,duration])
  return val
}
