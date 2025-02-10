"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceToggleProps {
  onClick: () => void
}

export function ResourceToggle({ onClick }: ResourceToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 left-4 z-50 h-8 w-8 md:h-10 md:w-10"
      onClick={onClick}
      aria-label="Toggle resource sidebar"
    >
      <Menu className="h-4 w-4 md:h-5 md:w-5" />
    </Button>
  )
}

