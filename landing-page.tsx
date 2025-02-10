"use client"
import "./app/global.css"
import "./app/globals.css"
import { useMediaQuery } from "react-responsive"
import type React from "react"
import { Editor, EditorState, ContentState } from "draft-js"
import { RichUtils as RichUtilsDraft, KeyBindingUtil, getDefaultKeyBinding } from "draft-js"
import "draft-js/dist/Draft.css"

import {
  ThumbsUpIcon,
  StarIcon,
  MessageCircleIcon,
  FlagIcon,
  CrownIcon,
  MessageSquareIcon,
  PlayIcon,
  ShieldIcon,
  AwardIcon,
  BarChartIcon,
  BriefcaseIcon,
  PiggyBankIcon,
  TrendingUpIcon,
  UserCheckIcon,
  LightbulbIcon,
  RocketIcon,
  HeartIcon,
  GlobeIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "./components/theme-toggle"
import { ViewToggle, useIsMobileView } from "./components/view-toggle"
import { ColorPicker, useSelectedColor } from "./components/color-picker"
import { ResourceSidebar } from "./components/resource-sidebar"
import { ResourceToggle } from "./components/resource-toggle"
import { useState, useEffect, useRef, useCallback } from "react"

function AnimatedIcon({ Icon, index, totalIcons }) {
  const iconRef = useRef(null)

  useEffect(() => {
    const iconElement = iconRef.current
    let animationFrameId

    const animate = () => {
      if (iconElement) {
        const rect = iconElement.getBoundingClientRect()
        const containerWidth = totalIcons * 100 // Gesamtbreite des Containers
        if (rect.right < 0) {
          iconElement.style.transform = `translateX(${containerWidth}px)`
        } else {
          iconElement.style.transform = `translateX(${Number.parseFloat(iconElement.style.transform.replace("translateX(", "").replace("px)", "")) - 0.5}px)`
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [totalIcons])

  return (
    <div
      ref={iconRef}
      className="absolute top-1/2 -translate-y-1/2 flex-shrink-0 w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md"
      style={{
        left: `${index * 100}px`,
        transform: `translateX(0px)`,
      }}
    >
      <Icon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
    </div>
  )
}

function LogoBanner({ icons }) {
  return (
    <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-800 py-12 mt-12">
      <div className="logo-banner-container">
        <div className="logo-banner">
          {icons.map((Icon, index) => (
            <div
              key={`icon-1-${index}`}
              className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md"
            >
              <Icon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            </div>
          ))}
          {icons.map((Icon, index) => (
            <div
              key={`icon-2-${index}`}
              className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md"
            >
              <Icon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const isMobileView = useMediaQuery({ maxWidth: 767 }) || useIsMobileView()
  const selectedColor = useSelectedColor()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [headingFont, setHeadingFont] = useState("Roboto")
  const [bodyFont, setBodyFont] = useState("Open Sans")

  const icons = [
    AwardIcon,
    BarChartIcon,
    BriefcaseIcon,
    PiggyBankIcon,
    TrendingUpIcon,
    UserCheckIcon,
    LightbulbIcon,
    RocketIcon,
    HeartIcon,
    GlobeIcon,
    PhoneIcon,
    MailIcon,
  ]

  const [isEditing, setIsEditing] = useState(false)
  const [headerEditorState, setHeaderEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText("Gerade hat Stefan Müller an Dein Portemonaie gedacht!")),
  )
  const [paragraphEditorState, setParagraphEditorState] = useState(() => EditorState.createEmpty())
  const [buttonEditorState, setButtonEditorState] = useState(() => EditorState.createEmpty())
  const inputRef = useRef(null)

  const handleEditClick = useCallback(() => {
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [])

  const handleInputBlur = useCallback(() => {}, [])

  const handleHeaderChange = useCallback((newState: EditorState) => {
    setHeaderEditorState(newState)
  }, [])

  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtilsDraft.handleKeyCommand(editorState, command)
      if (newState) {
        handleHeaderChange(newState)
        return "handled"
      }
      return "not-handled"
    },
    [handleHeaderChange],
  )

  const mapKeyToEditorCommand = useCallback((e: React.KeyboardEvent) => {
    if (e.keyCode === 66 /* B */ && KeyBindingUtil.hasCommandModifier(e)) {
      return "bold"
    }
    if (e.keyCode === 85 /* U */ && KeyBindingUtil.hasCommandModifier(e)) {
      return "underline"
    }
    return getDefaultKeyBinding(e)
  }, [])

  const toggleInlineStyle = useCallback(
    (inlineStyle: string) => {
      handleHeaderChange(RichUtilsDraft.toggleInlineStyle(headerEditorState, inlineStyle))
    },
    [handleHeaderChange, headerEditorState],
  )

  const handleSaveClick = useCallback(() => {
    setIsEditing(false)
  }, [])

  const [paragraphText, setParagraphText] = useState(
    "Klingt doch unglaublich: 100.000€ für Dich, OHNE dabei einen zusätzlichen Euro aus Deiner Tasche investieren zu müssen, oder?! Funktioniert das für Jeden? NEIN! Aber im Schnitt bei 8 von 10 Menschen",
  )
  const [buttonText, setButtonText] = useState("Mehr erfahren")
  const [isEditingParagraph, setIsEditingParagraph] = useState(false)
  const [isEditingButton, setIsEditingButton] = useState(false)
  const paragraphInputRef = useRef(null)
  const buttonInputRef = useRef(null)

  const handleParagraphEditClick = useCallback(() => {
    setIsEditingParagraph(true)
    setTimeout(() => paragraphInputRef.current?.focus(), 0)
  }, [])

  const handleParagraphInputBlur = useCallback(() => {
    setIsEditingParagraph(false)
  }, [])

  const handleParagraphInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParagraphText(e.target.value)
  }, [])

  const handleButtonEditClick = useCallback(() => {
    setIsEditingButton(true)
    setTimeout(() => buttonInputRef.current?.focus(), 0)
  }, [])

  const handleButtonInputBlur = useCallback(() => {
    setIsEditingButton(false)
  }, [])

  const handleButtonInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText(e.target.value)
  }, [])

  const handleFontChange = useCallback((newHeadingFont: string, newBodyFont: string) => {
    setHeadingFont(newHeadingFont)
    setBodyFont(newBodyFont)
  }, [])

  useEffect(() => {
    const link = document.createElement("link")
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont.replace(" ", "+")}&family=${bodyFont.replace(" ", "+")}&display=swap`
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [headingFont, bodyFont])

  const isMobile = useIsMobileView() 

  return (
    <div
      className={`flex flex-col items-center dark:bg-gray-900 dark:text-white ${isMobile ? "mobile-view" : ""}`}
      style={
        {
          "--heading-font": headingFont,
          "--body-font": bodyFont,
        } as React.CSSProperties
      }
    >
      <ResourceToggle onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <ThemeToggle />
      <ViewToggle />
      <ColorPicker />
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--heading-font), sans-serif;
        }
        body, p, div, span {
          font-family: var(--body-font), sans-serif;
        }
        .custom-bg {
          background-color: var(--custom-color, #EF4444);
        }
        .custom-text {
          color: var(--custom-color, #EF4444);
        }
        .custom-border {
          border-color: var(--custom-color, #EF4444);
        }
      `}</style>

      {/* Wrapper für den gesamten Inhalt */}
      <div className="flex w-full flex-col">
        <ResourceSidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onFontChange={handleFontChange} />
        <div className="flex-1">
          <div className={`w-full ${isMobile ? "px-4" : "max-w-6xl mx-auto"}`}>
            {/* Sektion 1 - Hero */}
            <section className="w-full bg-white dark:bg-gray-900 py-8 md:py-12 px-4">
              <div className="text-center mb-8">
                <h1 className={`font-bold mb-4 ${isMobile ? "text-2xl" : "text-4xl md:text-5xl"} group relative`}>
                  {isEditing ? (
                    <>
                      <div className="mb-2 flex items-center">
                        <button
                          onClick={() => toggleInlineStyle("BOLD")}
                          className="mr-2 p-1 bg-gray-200 rounded text-xs"
                          aria-label="Bold"
                        >
                          B
                        </button>
                        <button
                          onClick={() => toggleInlineStyle("ITALIC")}
                          className="mr-2 p-1 bg-gray-200 rounded text-xs italic"
                          aria-label="Italic"
                        >
                          I
                        </button>
                        <button
                          onClick={() => toggleInlineStyle("UNDERLINE")}
                          className="mr-2 p-1 bg-gray-200 rounded text-xs underline"
                          aria-label="Underline"
                        >
                          U
                        </button>
                        <button
                          onClick={() => toggleInlineStyle("STRIKETHROUGH")}
                          className="mr-2 p-1 bg-gray-200 rounded text-xs line-through"
                          aria-label="Strikethrough"
                        >
                          S
                        </button>
                        <button
                          onClick={() => toggleInlineStyle("RED_TEXT")}
                          className="mr-2 p-1 bg-gray-200 rounded text-xs text-red-500"
                          aria-label="Red Text"
                        >
                          R
                        </button>
                        <button
                          onClick={handleSaveClick}
                          className="p-1 bg-blue-500 text-white rounded"
                          aria-label="Save"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <Editor
                        editorState={headerEditorState}
                        onChange={handleHeaderChange}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={mapKeyToEditorCommand}
                      />
                    </>
                  ) : (
                    <>
                      {headerEditorState
                        .getCurrentContent()
                        .getBlocksAsArray()
                        .map((block, i) => {
                          const text = block.getText()
                          const inlineStyles = block.getCharacterList().map((c) => c.getStyle())
                          return (
                            <span key={i}>
                              {text.split("").map((char, j) => {
                                const style: React.CSSProperties = {}
                                if (inlineStyles.get(j).has("BOLD")) style.fontWeight = "bold"
                                if (inlineStyles.get(j).has("ITALIC")) style.fontStyle = "italic"
                                if (inlineStyles.get(j).has("UNDERLINE")) style.textDecoration = "underline"
                                if (inlineStyles.get(j).has("STRIKETHROUGH")) style.textDecoration = "line-through"
                                if (inlineStyles.get(j).has("RED_TEXT")) style.color = "red"
                                return (
                                  <span key={j} style={style}>
                                    {char}
                                  </span>
                                )
                              })}
                            </span>
                          )
                        })}
                      <button
                        onClick={handleEditClick}
                        className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Edit header"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </>
                  )}
                </h1>
                <div className="relative w-full h-12 -mt-4 mb-4">
                  <svg
                    viewBox="0 0 800 100"
                    className="absolute left-1/2 -translate-x-1/2 w-[120%] sm:w-[100%] max-w-3xl"
                    preserveAspectRatio="none"
                  >
                    {/* Main brush stroke */}
                    <path
                      d="M20,50 C150,20 250,80 400,50 C550,20 650,80 780,50"
                      className="stroke-[var(--custom-color)] fill-none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      style={{
                        filter: "url(#turbulence)",
                        strokeDasharray: "2000",
                        strokeDashoffset: "2000",
                        animation: "dash 2s ease-in-out forwards",
                      }}
                    />

                    {/* Paint splatters */}
                    <g className="fill-[var(--custom-color)] opacity-20">
                      <circle cx="150" cy="45" r="4" />
                      <circle cx="350" cy="55" r="3" />
                      <circle cx="650" cy="48" r="5" />
                      <circle cx="750" cy="52" r="3" />
                      <circle cx="450" cy="45" r="2" />
                    </g>

                    {/* Artistic elements */}
                    <path
                      d="M100,45 Q150,35 200,45 T300,45"
                      className="stroke-[var(--custom-color)] fill-none opacity-10"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M500,55 Q550,65 600,55 T700,55"
                      className="stroke-[var(--custom-color)] fill-none opacity-10"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <defs>
                      <filter id="turbulence">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="2" />
                        <feDisplacementMap in="SourceGraphic" scale="10" />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 group relative text-sm md:text-base">
                  {isEditingParagraph ? (
                    <textarea
                      ref={paragraphInputRef}
                      value={paragraphText}
                      onChange={handleParagraphInputChange}
                      onBlur={handleParagraphInputBlur}
                      className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
                      rows={3}
                    />
                  ) : (
                    <>
                      {paragraphText}
                      <button
                        onClick={handleParagraphEditClick}
                        className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Edit paragraph"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </>
                  )}
                </p>

                <div className="relative inline-block group">
                  {isEditingButton ? (
                    <input
                      ref={buttonInputRef}
                      type="text"
                      value={buttonText}
                      onChange={handleButtonInputChange}
                      onBlur={handleButtonInputBlur}
                      className="custom-bg text-white px-8 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <>
                      <button className="custom-bg text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity mb-6">
                        {buttonText}
                      </button>
                      <button
                        onClick={handleButtonEditClick}
                        className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Edit button text"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900"
                      />
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">
                      <span className="font-semibold">4,98/5</span> von über{" "}
                      <span className="font-semibold">3.000 Kunden</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8 md:mb-12">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man-76202_1280.jpg-HdGMfIR8i4qi8lT2wmdOaL4h2LhSCz.jpeg"
                  alt="Business professionals silhouettes in front of world map"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                    <PlayIcon className="w-8 h-8" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-gray-800 text-white px-2 py-1 text-sm rounded">AI</div>
              </div>

              {/* Animated Logo Banner */}
              <LogoBanner icons={icons} />
            </section>

            {/* Sektion 2 - Statistiken */}
            <section className="w-full py-8 px-4 md:py-12 bg-white dark:bg-gray-900">
              <h2 className={`font-bold mb-6 md:mb-8 ${isMobile ? "text-xl" : "text-3xl"} text-center`}>
                Jeder kann kann mal falsch liegen! Aber gilt das auch für so Viele?
              </h2>
              <div
                className={`grid gap-4 md:gap-6 mb-6 md:mb-8 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
              >
                {/* First stat card - Light background */}
                <div className="bg-[#FFF1F1] dark:bg-red-900/10 p-6 rounded-2xl">
                  <div className="flex items-center custom-text mb-2">
                    <ThumbsUpIcon className="w-12 h-12" />
                    <span className="text-6xl font-bold ml-2">91</span>
                  </div>
                  <p className="custom-text text-lg">
                    Sascha wird stets gerne und regelmäßig von seinen Kunden an gute Freunde weiterempfohlen
                  </p>
                </div>

                {/* Second stat card - Solid background */}
                <div className="custom-bg p-6 rounded-2xl text-white">
                  <div className="flex items-center mb-2">
                    <span className="text-6xl font-bold">5.0</span>
                    <div className="flex ml-2">
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8" />
                    </div>
                  </div>
                  <p className="text-lg">
                    vergeben unsere Kundinnen und Kunden für die Beratungsgespräche mit Sascha Emmerich
                  </p>
                </div>
              </div>

              <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"}`}>
                {/* Third stat card - Solid background */}
                <div className="custom-bg p-6 rounded-2xl text-white">
                  <div className="flex items-center mb-2">
                    <MessageCircleIcon className="w-12 h-12" />
                    <span className="text-6xl font-bold ml-2">85%</span>
                  </div>
                  <p className="text-lg">
                    lieben unseren <span className="font-bold">24/7 Chat</span> für unkomplizierte und schnelle Hilfe
                  </p>
                </div>

                {/* Fourth stat card - Light background */}
                <div className="bg-[#FFF1F1] dark:bg-red-900/10 p-6 rounded-2xl">
                  <div className="flex items-center custom-text mb-2">
                    <span className="text-6xl font-bold">4,7</span>
                    <div className="flex ml-2">
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8" />
                      <StarIcon className="w-8 h-8 opacity-50" />
                    </div>
                  </div>
                  <p className="custom-text text-lg">
                    vergaben unsere Kundinnen und Kunden für gleichbleibend hohes Servicelevel
                  </p>
                </div>

                {/* Fifth stat card - Light background */}
                <div className="bg-[#FFF1F1] dark:bg-red-900/10 p-6 rounded-2xl">
                  <div className="flex items-center custom-text mb-2">
                    <ShieldIcon className="w-12 h-12" />
                    <span className="text-6xl font-bold ml-2">92%</span>
                  </div>
                  <p className="custom-text text-lg">
                    schätzen unsere gezielten Absicherungen <span className="font-bold">ohne unnötige Kosten</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Sektion 3 - Features */}
            <section className="w-full py-8 px-4 md:py-12 bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <h2 className={`font-bold mb-2 ${isMobile ? "text-xl" : "text-3xl"}`}>Was mich besonders macht?</h2>
                <h3 className={`font-bold mb-4 ${isMobile ? "text-lg" : "text-2xl"}`}>Alles aus einer Hand.</h3>
                <div className="max-w-3xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
                  <p className="mb-2">
                    Ein Ansprechpartner, der für Dich arbeitet und nicht für die Versicherung oder Bank.
                  </p>
                  <p className="mb-2">
                    Eine Rufnummer, der Du nicht hinterher telefonieren muss oder in Warteschleifen hängst.
                  </p>
                  <p>Ein Wort.</p>
                </div>

                <div className={`grid gap-6 md:gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"}`}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4">
                      <FlagIcon className="w-full h-full text-gray-600 dark:text-gray-300" />
                    </div>
                    <h4 className="font-bold mb-2">Starte kostenlos</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Teste mich völlig kostenlos indem Du mich völlig unverbindlich eine Aufgabe für Dich lösen lässt.
                      So kannst Du dich vorab überzeugen.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4">
                      <CrownIcon className="w-full h-full text-gray-600 dark:text-gray-300" />
                    </div>
                    <h4 className="font-bold mb-2">Der Kunde ist König</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Hier wird nicht nur von Service gesprochen - dein Anliegen und dein Wunsch ist mein Antrieb und
                      ich übertreffe gerne Deine Erwartungen.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4">
                      <MessageSquareIcon className="w-full h-full text-gray-600 dark:text-gray-300" />
                    </div>
                    <h4 className="font-bold mb-2">Kein Aufwand</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Unkomplizierte Kommunikationswege. Im Schadenfall einfach eine WhatsApp schreiben. Na klar! Den
                      Rest machen wir!
                    </p>
                  </div>
                </div>

                <button className="mt-8 md:mt-12 custom-bg text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:opacity-90 transition-opacity text-sm md:text-base">
                  Mehr erfahren
                </button>

                <div className="mt-6 md:mt-8 flex flex-col items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
                    ))}
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2">4.98/5 von über 3.000 Kunden</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Sektion 4 - Schutz */}
            <section className="w-full py-8 px-4 md:py-12 bg-white dark:bg-gray-900">
              <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12`}>
                <div className={isMobile ? "w-full" : "md:w-1/2"}>
                  <div className="relative">
                    <Image
                      src="/placeholder.svg"
                      alt="Schutzausrüstung"
                      width={500}
                      height={400}
                      className="rounded-lg"
                    />
                    <div className="absolute -top-4 -right-4">
                      
                      <ShieldIcon className="w-12 h-12 text-red-500" />
                    </div>
                  </div>
                </div>
                <div className={isMobile ? "w-full" : "md:w-1/2"}>
                  <h2 className={`font-bold mb-4 ${isMobile ? "text-xl" : "text-3xl"}`}>
                    Schütze Dich und Deine Familie, <br className="hidden md:inline" />
                    ABER richtig
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    Ich mache nicht einfach irgend etwas oder das Offensichtliche. Anhand deines individuellen
                    Risikoprofils finde ich die Absicherung, die deine Familie wirklich braucht. Eine, die wirkt, wenn
                    das Schicksal zuschlägt.
                  </p>
                </div>
              </div>
              <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-8 md:mt-16`}>
                <div className={isMobile ? "w-full" : "md:w-1/2"}>
                  <h2 className={`font-bold mb-4 ${isMobile ? "text-xl" : "text-3xl"}`}>
                    Ich sage: Es ist nicht deine Schuld...
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    ...das Du keine Lust auf solche Themen hast. Woher solltest Du auch wissen, was das Richtige oder
                    warum etwas gut oder schlecht ist. Wir ist es wichtig, dass deine Probleme gelöst werden und du dich
                    verstanden und abgeholt fühlst.
                  </p>
                </div>
                <div className={isMobile ? "w-full" : "md:w-1/2"}>
                  <div className="relative">
                    <Image
                      src="/placeholder.svg"
                      alt="Stapel von Büchern mit Fragezeichen"
                      width={500}
                      height={400}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Sektion 5 - Kundenstimmen */}
            <section className="w-full py-8 px-4 md:py-12 bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <h2 className={`font-bold mb-6 md:mb-8 ${isMobile ? "text-xl" : "text-3xl"}`}>
                  Das sagen unsere Kunden
                </h2>
                <div
                  className={`grid gap-4 md:gap-6 mb-8 md:mb-12 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"}`}
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} className="w-5 h-5 text-yellow-400" />
                        ))}
                      </div>
                      <p className="italic mb-4">
                        "Hervorragende Beratung und immer erreichbar wenn man Hilfe braucht!"
                      </p>
                      <p className="font-semibold">- Zufriedener Kunde</p>
                    </div>
                  ))}
                </div>{" "}
                <button className="custom-bg text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:opacity-90 transition-opacity text-sm md:text-base">
                  Jetzt Beratungstermin vereinbaren
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

