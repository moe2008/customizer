"use client"

import { Smartphone, Monitor } from "lucide-react"
import { useEffect, useState } from "react"

// Globaler Zustand für den Ansichtsmodus
let globalIsMobileView = false
let listeners: Array<(isMobileView: boolean) => void> = []

function setGlobalIsMobileView(value: boolean) {
  globalIsMobileView = value
  listeners.forEach((listener) => listener(value))
  // Anwenden der mobilen Ansichtsstile auf das Root-Element
  document.documentElement.classList.toggle("mobile-view", value)
}

export function useIsMobileView() {
  const [isMobileView, setIsMobileView] = useState(globalIsMobileView)

  useEffect(() => {
    function handleChange(newValue: boolean) {
      setIsMobileView(newValue)
    }
    listeners.push(handleChange)
    return () => {
      listeners = listeners.filter((listener) => listener !== handleChange)
    }
  }, [])

  return isMobileView
}

export function ViewToggle() {
  const [isMobileView, setIsMobileView] = useState(globalIsMobileView)

  const toggleView = () => {
    const newValue = !isMobileView
    setIsMobileView(newValue)
    setGlobalIsMobileView(newValue)
  }

  return (
    <button
      onClick={toggleView}
      className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      style={{ fontSize: isMobileView ? "0.875rem" : "1rem" }}
      aria-label="Ansichtsmodus umschalten"
    >
      {isMobileView ? <Monitor className="w-4 h-4 md:w-5 md:h-5" /> : <Smartphone className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  )
}

