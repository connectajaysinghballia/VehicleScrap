"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  background: string
  border: string
  hoverBorder: string
  iconBg: string
  titleHover: string
}

export const getColorScheme = (index: number): ColorScheme => {
  const schemes: ColorScheme[] = [
    {
      primary: "from-blue-500 to-blue-600",
      secondary: "from-blue-400 to-blue-500",
      accent: "text-blue-400",
      background: "bg-blue-500/10",
      border: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
      iconBg: "from-blue-500/20 to-blue-600/20",
      titleHover: "group-hover:text-blue-400",
    },
    {
      primary: "from-purple-500 to-purple-600",
      secondary: "from-purple-400 to-purple-500",
      accent: "text-purple-400",
      background: "bg-purple-500/10",
      border: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/40",
      iconBg: "from-purple-500/20 to-purple-600/20",
      titleHover: "group-hover:text-purple-400",
    },
    {
      primary: "from-orange-500 to-orange-600",
      secondary: "from-orange-400 to-orange-500",
      accent: "text-orange-400",
      background: "bg-orange-500/10",
      border: "border-orange-500/20",
      hoverBorder: "hover:border-orange-500/40",
      iconBg: "from-orange-500/20 to-orange-600/20",
      titleHover: "group-hover:text-orange-400",
    },
    {
      primary: "from-pink-500 to-pink-600",
      secondary: "from-pink-400 to-pink-500",
      accent: "text-pink-400",
      background: "bg-pink-500/10",
      border: "border-pink-500/20",
      hoverBorder: "hover:border-pink-500/40",
      iconBg: "from-pink-500/20 to-pink-600/20",
      titleHover: "group-hover:text-pink-400",
    },
    {
      primary: "from-green-500 to-green-600",
      secondary: "from-green-400 to-green-500",
      accent: "text-green-400",
      background: "bg-green-500/10",
      border: "border-green-500/20",
      hoverBorder: "hover:border-green-500/40",
      iconBg: "from-green-500/20 to-green-600/20",
      titleHover: "group-hover:text-green-400",
    },
    {
      primary: "from-teal-500 to-teal-600",
      secondary: "from-teal-400 to-teal-500",
      accent: "text-teal-400",
      background: "bg-teal-500/10",
      border: "border-teal-500/20",
      hoverBorder: "hover:border-teal-500/40",
      iconBg: "from-teal-500/20 to-teal-600/20",
      titleHover: "group-hover:text-teal-400",
    },
    {
      primary: "from-indigo-500 to-indigo-600",
      secondary: "from-indigo-400 to-indigo-500",
      accent: "text-indigo-400",
      background: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      hoverBorder: "hover:border-indigo-500/40",
      iconBg: "from-indigo-500/20 to-indigo-600/20",
      titleHover: "group-hover:text-indigo-400",
    },
    {
      primary: "from-red-500 to-red-600",
      secondary: "from-red-400 to-red-500",
      accent: "text-red-400",
      background: "bg-red-500/10",
      border: "border-red-500/20",
      hoverBorder: "hover:border-red-500/40",
      iconBg: "from-red-500/20 to-red-600/20",
      titleHover: "group-hover:text-red-400",
    },
    {
      primary: "from-amber-500 to-amber-600",
      secondary: "from-amber-400 to-amber-500",
      accent: "text-amber-400",
      background: "bg-amber-500/10",
      border: "border-amber-500/20",
      hoverBorder: "hover:border-amber-500/40",
      iconBg: "from-amber-500/20 to-amber-600/20",
      titleHover: "group-hover:text-amber-400",
    },
    {
      primary: "from-lime-500 to-lime-600",
      secondary: "from-lime-400 to-lime-500",
      accent: "text-lime-400",
      background: "bg-lime-500/10",
      border: "border-lime-500/20",
      hoverBorder: "hover:border-lime-500/40",
      iconBg: "from-lime-500/20 to-lime-600/20",
      titleHover: "group-hover:text-lime-400",
    },
  ]

  return schemes[index % schemes.length]
}

interface CardData {
  title: string
  description: string
  icon?: LucideIcon
  number?: string
  colorScheme: ColorScheme
}

interface ColorfulCardSectionProps {
  title: string
  subtitle?: string
  cards: CardData[]
  className?: string
  isSquare?: boolean
}

export default function ColorfulCardSection({
  title,
  subtitle,
  cards,
  className = "",
  isSquare = false,
}: ColorfulCardSectionProps) {
  const gridCols = isSquare
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"

  return (
    <section className={`py-8 sm:py-12 lg:py-16 xl:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
            {title.split(" ").map((word, index) => {
              const isHighlighted = word === "Services" || word === "Decision" || word === "Serve"
              return (
                <span key={index} className={isHighlighted ? "text-green-400" : ""}>
                  {word}{" "}
                </span>
              )
            })}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm lg:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className={`grid ${gridCols} gap-3 sm:gap-4 md:gap-6 lg:gap-8`}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="scroll-animate"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`bg-gray-800/50 ${card.colorScheme.border} ${card.colorScheme.hoverBorder} transition-all duration-300 group ${
                  isSquare ? "aspect-square" : "h-full"
                }`}
              >
                <CardContent
                  className={`p-3 sm:p-4 lg:p-6 ${isSquare ? "h-full flex flex-col justify-center" : ""} ${card.icon && !card.number ? "text-center" : ""}`}
                >
                  {card.icon && !card.number && (
                    <div
                      className={`w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${card.colorScheme.iconBg} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <card.icon className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${card.colorScheme.accent}`} />
                    </div>
                  )}

                  {card.number && (
                    <div className="flex items-start mb-2 sm:mb-3 lg:mb-4">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${card.colorScheme.primary} rounded-lg flex items-center justify-center mr-2 sm:mr-3 lg:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                      >
                        <span className="text-white font-bold text-xs sm:text-sm lg:text-lg">{card.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-white mb-1 sm:mb-2 transition-colors duration-300 ${card.colorScheme.titleHover} leading-tight`}
                        >
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {card.icon && !card.number && (
                    <h3
                      className={`text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-white mb-2 sm:mb-3 transition-colors duration-300 ${card.colorScheme.titleHover} leading-tight`}
                    >
                      {card.title}
                    </h3>
                  )}

                  <p className={`text-xs sm:text-sm text-gray-300 leading-relaxed ${isSquare ? "line-clamp-4" : ""}`}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
