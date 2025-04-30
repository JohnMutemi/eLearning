"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { authService } from "@/services/auth-service"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  GraduationCap, 
  Home, 
  LogOut, 
  Settings, 
  User, 
  Users,
  FileText,
  Calendar,
  MessageSquare,
  ChevronDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    const role = authService.getUserRole()
    setUserRole(role)
    setIsLoading(false)

    if (!role) {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push("/auth/login")
  }

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { href: "/dashboard", icon: Home, label: "Home" },
      { href: "/dashboard/profile", icon: User, label: "Profile" },
      { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    ]

    const roleSpecificItems = {
      admin: [
        { href: "/dashboard/admin/users", icon: Users, label: "Users" },
        { href: "/dashboard/admin/courses", icon: BookOpen, label: "Courses" },
        { href: "/dashboard/admin/reports", icon: FileText, label: "Reports" },
      ],
      tutor: [
        { href: "/dashboard/tutor/courses", icon: BookOpen, label: "My Courses" },
        { href: "/dashboard/tutor/students", icon: Users, label: "Students" },
        { href: "/dashboard/tutor/schedule", icon: Calendar, label: "Schedule" },
        { href: "/dashboard/tutor/messages", icon: MessageSquare, label: "Messages" },
      ],
      learner: [
        { href: "/dashboard/learner/courses", icon: BookOpen, label: "My Courses" },
        { href: "/dashboard/learner/progress", icon: GraduationCap, label: "Progress" },
        { href: "/dashboard/learner/messages", icon: MessageSquare, label: "Messages" },
      ],
    }

    return [
      ...commonItems,
      ...(userRole ? roleSpecificItems[userRole as keyof typeof roleSpecificItems] || [] : []),
    ]
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!userRole) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6" />
            <span>Edu-LMS</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {getNavItems().map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Account</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to login again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 