import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function PolkaDotsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [60, 140])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setScrollProgress(value)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      drawDots()
    }

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const dotRadius = 3
      const spacing = 40
      const cols = Math.ceil(canvas.offsetWidth / spacing) + 2
      const rows = Math.ceil(canvas.offsetHeight / spacing) + 2

      ctx.fillStyle = '#FF7A18'

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing
          const waveOffset = Math.sin((i * 0.5 + scrollProgress * 10)) * 10
          const y = j * spacing + waveOffset

          const opacity = 0.3 + Math.sin(scrollProgress * Math.PI * 2 + i * 0.3) * 0.15
          ctx.globalAlpha = opacity

          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dotRadius = 3
    const spacing = 40
    const cols = Math.ceil(canvas.offsetWidth / spacing) + 2
    const rows = Math.ceil(canvas.offsetHeight / spacing) + 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#FF7A18'

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing
        const waveOffset = Math.sin((i * 0.5 + scrollProgress * 10)) * 10
        const y = j * spacing + waveOffset

        const opacity = 0.3 + Math.sin(scrollProgress * Math.PI * 2 + i * 0.3) * 0.15
        ctx.globalAlpha = opacity

        ctx.beginPath()
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.globalAlpha = 1
  }, [scrollProgress])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col items-center pt-32 pb-24 overflow-hidden bg-black">
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Glass Heading */}
      <div className="relative z-10 text-center mb-16 px-6 -mt-[8vh]">
  <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white/40 backdrop-blur-sm">
    <span className="line-through">Artificial Intelligence</span>
  </h1>

  <h2 className="text-4xl md:text-6xl font-bold leading-tight mt-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-white drop-shadow-[0_0_25px_rgba(255,122,24,0.5)]">
    All Doctor's Intelligence
  </h2>
</div>


      {/* Glass Card */}
      <motion.div
        style={{ y: y1 }}
        className="relative z-10 max-w-lg w-full px-6 -mt-[8vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-6 md:p-7 backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
            Dictate. Generate. Send.
          </h2>

          <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-3">
            Speak naturally and generate a prescription in seconds. Share instantly. Works along with other softwares as well.
          </p>

          <p className="text-sm font-semibold text-orange-300">
            Doctor is in control. Doctor is the commander in chief.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
