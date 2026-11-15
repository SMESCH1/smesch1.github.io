"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"
import { formatoNumero } from "@/lib/numeros"
import type { Idioma } from "@/lib/preferencias"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
  /** adaptado: los separadores del idioma (1,225 / 1.225) */
  idioma?: Idioma
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  idioma = "en",
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const reducir = useReducedMotion() // adaptado: con movimiento reducido, el número final sin contar
  const formato = (n: number) => formatoNumero(n, decimalPlaces, idioma)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (reducir) return
    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value)
      }, delay * 1000)
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer)
      }
    }
  }, [motionValue, isInView, delay, value, direction, startValue, reducir])

  useEffect(() => {
    // adaptado: al cambiar de idioma, el número que ya contó se vuelve a escribir con sus separadores
    if (ref.current && !reducir) ref.current.textContent = formato(springValue.get())
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formato(latest)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [springValue, decimalPlaces, idioma, reducir])

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums", // adaptado: sin color ni tracking propios; los pone quien lo usa
        className
      )}
      {...props}
    >
      {formato(reducir ? value : startValue)}
    </span>
  )
}
