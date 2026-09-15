import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Global defaults — cinematic, premium ease
gsap.defaults({ ease: 'power3.out', duration: 0.9 })

// Shared cinematic easing
export const easeCinematic = [0.22, 1, 0.36, 1]
export const easeCinematicStr = 'power3.out'

// Helper: refresh after images/fonts load, debounced
let refreshTimer
export function refreshScrollTrigger() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120)
}

// Helper: wait for images inside container then refresh
export function refreshAfterImages(container) {
  if (!container) return
  const imgs = container.querySelectorAll('img')
  if (!imgs.length) { refreshScrollTrigger(); return }
  let loaded = 0
  const total = imgs.length
  const done = () => { loaded++; if (loaded >= total) refreshScrollTrigger() }
  imgs.forEach(img => {
    if (img.complete) done()
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }) }
  })
  // safety fallback
  setTimeout(() => ScrollTrigger.refresh(), 1400)
}

export { gsap, ScrollTrigger }
export default gsap
