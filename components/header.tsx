"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Globe, Menu, Home, Leaf, Bug, CloudRain, TrendingUp } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "mr", name: "Marathi", native: "मराठी" },
]

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "advisory", label: "Advisory", icon: Leaf },
  { id: "pest", label: "Pest Detection", icon: Bug },
  { id: "weather", label: "Weather", icon: CloudRain },
  { id: "market", label: "Market", icon: TrendingUp },
]

interface HeaderProps {
  title: string
  showNotifications?: boolean
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Header({ title, showNotifications = true, activeTab = "home", onTabChange }: HeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [notificationCount, setNotificationCount] = useState(3)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-12 w-12 p-0 rounded-full active:scale-95 transition-transform"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => {
                      onTabChange?.(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      "flex items-center gap-4 cursor-pointer h-14 px-4 rounded-lg active:scale-95 transition-all",
                      activeTab === item.id ? "bg-primary/10 text-primary" : "",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-base font-medium">{item.label}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-semibold text-lg md:text-xl text-balance truncate">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 h-12 px-3 rounded-full active:scale-95 transition-transform"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{selectedLanguage.native}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => setSelectedLanguage(language)}
                  className={cn(
                    "h-14 px-4 rounded-lg active:scale-95 transition-all",
                    selectedLanguage.code === language.code ? "bg-primary/10 text-primary" : "",
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-base">{language.native}</span>
                    <span className="text-sm text-muted-foreground">{language.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {showNotifications && (
            <Button
              variant="ghost"
              size="sm"
              className="relative h-12 w-12 p-0 rounded-full active:scale-95 transition-transform"
            >
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground text-sm flex items-center justify-center font-bold shadow-lg">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
