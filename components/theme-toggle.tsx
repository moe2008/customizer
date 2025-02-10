"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useIsMobileView } from "./view-toggle"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const isMobileView = useIsMobileView()

  useEffect(() => {
    const isDarkStored = localStorage.getItem("darkMode") === "true"
    setIsDark(isDarkStored)
    if (isDarkStored) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!isDark).toString())
  }

  return (
    <button
      onClick={toggleDark}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      style={{ fontSize: isMobileView ? "0.875rem" : "1rem" }}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  )
}

