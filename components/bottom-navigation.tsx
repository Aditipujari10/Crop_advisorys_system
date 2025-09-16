"use client"

import { Home, Leaf, Bug, CloudRain, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "advisory", label: "Advisory", icon: Leaf },
  { id: "pest", label: "Pest", icon: Bug },
  { id: "weather", label: "Weather", icon: CloudRain },
  { id: "market", label: "Market", icon: TrendingUp },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/98 backdrop-blur-lg supports-[backdrop-filter]:bg-card/95 border-t border-border z-50 shadow-lg">
      <div className="flex items-center justify-around px-1 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs flex-1 min-h-[72px] rounded-2xl active:scale-95 transition-all duration-150",
                isActive
                  ? "text-primary-foreground bg-primary shadow-sm" // Use primary background with white text for better contrast
                  : "text-foreground hover:text-foreground hover:bg-accent/50",
              )}
              onClick={() => onTabChange(item.id)}
            >
              <div
                className={cn(
                  "p-1 rounded-full transition-all duration-150",
                  isActive ? "bg-primary-foreground/20" : "", // Use white background with opacity for active icon container
                )}
              >
                <Icon className={cn("h-6 w-6 transition-all duration-150", isActive ? "scale-110" : "")} />
              </div>
              <span
                className={cn(
                  "text-[11px] leading-tight text-center font-medium transition-all duration-150",
                  isActive ? "text-primary-foreground" : "text-foreground", // Use white text for active navigation labels
                )}
              >
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
      <div className="h-1 bg-background/50 rounded-full mx-auto w-32 mb-1"></div>
    </div>
  )
}
