"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { CheckCircle, ChevronRight } from "lucide-react"

interface AnimatedStepProps {
  step: {
    id: number
    title: string
    description: string
  }
  isActive: boolean
  isCompleted: boolean
  onClick: () => void
  autoAdvance?: boolean
  onComplete?: () => void
  disableProgress?: boolean
}

export default function AnimatedStep({
  step,
  isActive,
  isCompleted,
  onClick,
  autoAdvance = false,
  onComplete,
  disableProgress = false,
}: AnimatedStepProps) {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const textControls = useAnimation()
  const progressRef = useRef<HTMLDivElement>(null)
  const progressAnimationRef = useRef<Animation | null>(null)


  useEffect(() => {
    if (isActive || isCompleted) {
      controls.start({
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      })
      textControls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, duration: 0.4 },
      })
    } else {
      controls.start({
        scale: 0.95,
        opacity: 0.7,
        y: 10,
        transition: { duration: 0.3 },
      })
      textControls.start({
        opacity: 0.5,
        y: 5,
        transition: { duration: 0.3 },
      })
    }
  }, [isActive, isCompleted, controls, textControls])

  // Progress animation for active step
  useEffect(() => {
    // Clean up existing animation
    if (progressAnimationRef.current) {
      progressAnimationRef.current.cancel()
      progressAnimationRef.current = null
    }
  
    // Only create new animation if step is active, autoAdvance is on, 
    // step is NOT already completed, and progress is not disabled
    if (isActive && autoAdvance && !isCompleted && !disableProgress && progressRef.current) {
      // Create new animation - 4 seconds
      const animation = progressRef.current.animate([{ width: "0%" }, { width: "100%" }], {
        duration: 3000,
        easing: "linear",
        fill: "forwards",
      })
  
      progressAnimationRef.current = animation
  
      // Auto advance to next step when progress completes
      if (onComplete) {
        animation.onfinish = () => {
          onComplete()
        }
      }
  
      return () => {
        if (animation) {
          animation.cancel()
        }
        progressAnimationRef.current = null
      }
    }
  }, [isActive, autoAdvance, onComplete, disableProgress, isCompleted])

  // Scroll into view when active
  useEffect(() => {
    if (isActive) {
      const element = document.getElementById(`step-${step.id}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [isActive, step.id])

  return (
    <motion.div
      id={`step-${step.id}`}
      className={`
        relative rounded-l-sm overflow-hidden cursor-pointer  shadow-md
        ${isActive || isCompleted ? "bg-white shadow-lg" : "bg-gray-50"}
        ${isCompleted ? "border-l-4 border-green-500" : "border-none"}
        transition-colors duration-300
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Progress bar for active step - only show if active AND not already completed */}
      {isActive && !isCompleted && !disableProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
          <div ref={progressRef} className="h-full bg-black" />
        </div>
      )}


      <div className="p-5 flex items-start gap-4">
        {/* Step number or completion icon */}
        <div className="flex-shrink-0">
          <motion.div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${
                isCompleted
                  ? "bg-green-100 text-green-600"
                  : isActive
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600"
              }
            `}
            initial={{ scale: 0.8 }}
            animate={{
              scale: isActive || isCompleted ? 1 : 0.9,
              rotate: isCompleted ? [0, 360] : 0,
            }}
            transition={{
              duration: 0.5,
              rotate: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            {isCompleted ? <CheckCircle size={20} /> : <span className="font-bold">{step.id}</span>}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.h3
            className={`text-lg font-semibold mb-1 ${isActive ? "text-black" : isCompleted ? "text-green-700" : "text-gray-700"}`}
            animate={textControls}
          >
            {step.title}
          </motion.h3>

          <motion.p className="text-sm text-gray-600" animate={textControls}>
            {step.description}
          </motion.p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          animate={{
            x: isHovered ? 5 : 0,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 ${isCompleted ? "text-green-500" : "text-indigo-500"}`}
        >
          <ChevronRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  )
}