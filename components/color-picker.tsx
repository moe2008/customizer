"use client"

import { useState, useEffect, useCallback } from "react"
import { HexColorPicker } from "react-colorful"
import { Palette } from "lucide-react"
import { useIsMobile } from "@/hooks/useIsMobile"

// Globaler Zustand für die ausgewählte Farbe
let globalSelectedColor = "#EF4444" // Standard: Rot
let listeners: Array<(color: string) => void> = []

function setGlobalSelectedColor(color: string) {
  globalSelectedColor = color
  listeners.forEach((listener) => listener(color))
  document.documentElement.style.setProperty("--custom-color", color)
  localStorage.setItem("customColor", color)
}

export function useSelectedColor() {
  const [selectedColor, setSelectedColor] = useState(globalSelectedColor)

  useEffect(() => {
    function handleChange(newColor: string) {
      setSelectedColor(newColor)
    }
    listeners.push(handleChange)
    return () => {
      listeners = listeners.filter((listener) => listener !== handleChange)
    }
  }, [])

  return selectedColor
}

export function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(globalSelectedColor)
  const isMobileView = useIsMobile()

  useEffect(() => {
    const storedColor = localStorage.getItem("customColor")
    if (storedColor) {
      setSelectedColor(storedColor)
      setGlobalSelectedColor(storedColor)
    }
  }, [])

  const handleColorChange = useCallback((color: string) => {
    setSelectedColor(color)
    setGlobalSelectedColor(color)
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-16 right-4 z-50 p-2 rounded-full transition-colors"
        style={{ backgroundColor: selectedColor, fontSize: isMobileView ? "0.875rem" : "1rem" }}
        aria-label="Farbe auswählen"
      >
        <Palette className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative bg-white p-4 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <HexColorPicker color={selectedColor} onChange={handleColorChange} />
            <div className="mt-4 flex justify-between items-center">
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="border rounded px-2 py-1 text-sm w-24"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Auswählen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

