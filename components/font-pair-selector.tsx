"use client"

import React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const fontPairs = [
  { name: "Modern", heading: "Roboto", body: "Open Sans" },
  { name: "Classic", heading: "Merriweather", body: "Source Sans Pro" },
  { name: "Elegant", heading: "Playfair Display", body: "Lato" },
  { name: "Minimalist", heading: "Montserrat", body: "Roboto" },
  { name: "Futuristic", heading: "Orbitron", body: "Exo 2" },
]

interface FontPairSelectorProps {
  onSelect: (headingFont: string, bodyFont: string) => void
}

export function FontPairSelector({ onSelect }: FontPairSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? fontPairs.find((pair) => pair.name === value)?.name : "Schriftart auswählen..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Schriftart suchen..." />
          <CommandList>
            <CommandEmpty>Keine Schriftart gefunden.</CommandEmpty>
            <CommandGroup>
              {fontPairs.map((pair) => (
                <CommandItem
                  key={pair.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    onSelect(pair.heading, pair.body)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === pair.name ? "opacity-100" : "opacity-0")} />
                  {pair.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

