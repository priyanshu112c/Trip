import { useState } from 'react'

const FALLBACK = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'

export default function SafeImage({ src, alt='', className='', style, loading='lazy', decoding='async', onLoad, fallback = FALLBACK, ...rest }){
  const [err, setErr] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const handleError = (e)=>{
    if(!err){
      setErr(true)
      e.currentTarget.src = fallback
    }
  }
  const handleLoad = (e)=>{
    setLoaded(true)
    onLoad && onLoad(e)
  }
  return (
    <img
      src={err ? fallback : src}
      alt={alt}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
      style={style}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  )
}
