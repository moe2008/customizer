"use client"
import { Video, ImageIcon, FileText, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FontPairSelector } from "./font-pair-selector"
import type React from "react"

interface ResourceSidebarProps {
  open: boolean
  onClose: () => void
  side?: "left" | "right"
  onFontChange: (headingFont: string, bodyFont: string) => void
}

const SIDEBAR_WIDTH_MOBILE = "300px"

export function ResourceSidebar({ open, onClose, side = "left", onFontChange }: ResourceSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onClose} className="!bg-white">
      <SheetContent
        data-sidebar="sidebar"
        data-mobile="true"
        className="w-[--sidebar-width] p-0 text-sidebar-foreground [&>button]:hidden"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
        side={side}
      >
        <div className="h-full w-full bg-white px-4 py-6 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Ressourcen hinzufügen</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="mt-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Schriftart auswählen</h3>
              <FontPairSelector onSelect={onFontChange} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Video hinzufügen</h3>
              <div className="space-y-2">
                <Label htmlFor="video-title">Titel</Label>
                <Input id="video-title" placeholder="Video Titel eingeben" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-description">Beschreibung</Label>
                <Textarea id="video-description" placeholder="Video Beschreibung eingeben" />
              </div>
              <div className="space-y-2">
                <Label>Video hochladen</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Video className="h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-primary">Klicken zum Hochladen</span> oder per Drag & Drop
                    </div>
                    <div className="text-xs text-gray-400">MP4, WebM oder OGG</div>
                  </div>
                </div>
              </div>
              <Button className="w-full custom-bg hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Video hinzufügen
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bilder hinzufügen</h3>
              <div className="space-y-2">
                <Label htmlFor="image-title">Titel</Label>
                <Input id="image-title" placeholder="Bild Titel eingeben" />
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-primary">Klicken zum Hochladen</span> oder per Drag & Drop
                  </div>
                  <div className="text-xs text-gray-400">PNG, JPG oder GIF</div>
                </div>
              </div>
              <Button className="w-full custom-bg hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Bild hinzufügen
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dokumente hinzufügen</h3>
              <div className="space-y-2">
                <Label htmlFor="doc-title">Titel</Label>
                <Input id="doc-title" placeholder="Dokument Titel eingeben" />
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-primary">Klicken zum Hochladen</span> oder per Drag & Drop
                  </div>
                  <div className="text-xs text-gray-400">PDF, DOC oder TXT</div>
                </div>
              </div>
              <Button className="w-full custom-bg hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Dokument hinzufügen
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

