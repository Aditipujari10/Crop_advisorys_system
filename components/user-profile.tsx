"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Leaf,
  Settings,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Camera,
  Save,
  Award,
  TrendingUp,
} from "lucide-react"

interface UserProfile {
  name: string
  phone: string
  email: string
  location: string
  farmSize: string
  primaryCrops: string[]
  experience: string
  language: string
  joinDate: string
}

interface FarmStats {
  totalQueries: number
  pestDetections: number
  weatherAlerts: number
  marketAlerts: number
  successfulHarvests: number
}

const mockProfile: UserProfile = {
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  email: "rajesh.kumar@example.com",
  location: "Indore, Madhya Pradesh",
  farmSize: "5.2 acres",
  primaryCrops: ["Rice", "Wheat", "Cotton"],
  experience: "15 years",
  language: "Hindi",
  joinDate: "January 2024",
}

const mockStats: FarmStats = {
  totalQueries: 127,
  pestDetections: 23,
  weatherAlerts: 45,
  marketAlerts: 12,
  successfulHarvests: 8,
}

export function UserProfile() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState({
    weather: true,
    pest: true,
    market: false,
    advisory: true,
    sms: true,
    email: false,
  })

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic would go here
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/farmer-portrait.png" />
                <AvatarFallback className="text-lg font-semibold bg-primary/20 text-primary">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-semibold text-xl text-balance">{profile.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="h-4 w-4" />
                Member since {profile.joinDate}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  <Leaf className="h-3 w-3 mr-1" />
                  {profile.experience} experience
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {profile.farmSize}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Farm Statistics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Farm Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">{mockStats.totalQueries}</div>
              <div className="text-xs text-muted-foreground">Total Queries</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-orange-500">{mockStats.pestDetections}</div>
              <div className="text-xs text-muted-foreground">Pest Detections</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-blue-500">{mockStats.weatherAlerts}</div>
              <div className="text-xs text-muted-foreground">Weather Alerts</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-green-500">{mockStats.marketAlerts}</div>
              <div className="text-xs text-muted-foreground">Market Alerts</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-purple-500">{mockStats.successfulHarvests}</div>
              <div className="text-xs text-muted-foreground">Successful Harvests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmSize">Farm Size</Label>
              <Input
                id="farmSize"
                value={profile.farmSize}
                onChange={(e) => handleInputChange("farmSize", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Farming Experience</Label>
              <Input
                id="experience"
                value={profile.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Primary Crops</Label>
            <div className="flex flex-wrap gap-2">
              {profile.primaryCrops.map((crop, index) => (
                <Badge key={index} variant="secondary">
                  {crop}
                  {isEditing && (
                    <button className="ml-2 text-xs hover:text-red-500" onClick={() => {}}>
                      ×
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" className="h-6 bg-transparent">
                  + Add Crop
                </Button>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Weather Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified about weather changes</p>
              </div>
              <Switch
                checked={notifications.weather}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weather: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Pest Detection Alerts</Label>
                <p className="text-sm text-muted-foreground">Notifications for pest and disease detection</p>
              </div>
              <Switch
                checked={notifications.pest}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pest: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Market Price Alerts</Label>
                <p className="text-sm text-muted-foreground">Price change notifications for your crops</p>
              </div>
              <Switch
                checked={notifications.market}
                onCheckedChange={(checked) => setNotifications({ ...notifications, market: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Advisory Recommendations</Label>
                <p className="text-sm text-muted-foreground">Farming tips and recommendations</p>
              </div>
              <Switch
                checked={notifications.advisory}
                onCheckedChange={(checked) => setNotifications({ ...notifications, advisory: checked })}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Delivery Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <Label>SMS Notifications</Label>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <Label>Email Notifications</Label>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Preferred Language</Label>
            <Select value={profile.language} onValueChange={(value) => handleInputChange("language", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Telugu">తెలుగు (Telugu)</SelectItem>
                <SelectItem value="Tamil">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="Kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Voice Commands</Label>
              <p className="text-sm text-muted-foreground">Enable voice input for queries</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Offline Mode</Label>
              <p className="text-sm text-muted-foreground">Download content for offline access</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Data Saver</Label>
              <p className="text-sm text-muted-foreground">Reduce data usage</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Support & Help */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Support & Help
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help Center
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Phone className="h-4 w-4 mr-2" />
            Contact Support
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Globe className="h-4 w-4 mr-2" />
            Community Forum
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Policy
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Award className="h-4 w-4 mr-2" />
            Rate the App
          </Button>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>

            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Smart Crop Advisory System v1.0.0
                <br />
                Made with care for farmers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
