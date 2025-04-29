"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { userService, type User } from "@/services/user-service"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Lock, Bell, Mail, Moon, Shield } from "lucide-react"

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(true),
})

const securityFormSchema = z
  .object({
    twoFactorAuth: z.boolean().default(false),
    passwordUpdate: z.string().min(8, { message: "Password must be at least 8 characters." }).optional(),
    passwordConfirm: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.passwordUpdate && data.passwordUpdate !== data.passwordConfirm) {
        return false
      }
      return true
    },
    {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    },
  )

const appearanceFormSchema = z.object({
  darkMode: z.boolean().default(false),
})

type NotificationFormValues = z.infer<typeof notificationFormSchema>
type SecurityFormValues = z.infer<typeof securityFormSchema>
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

interface UserSettingsProps {
  userId: number
}

export function UserSettings({ userId }: UserSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  // Notification form
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
    },
  })

  // Security form
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
      passwordUpdate: "",
      passwordConfirm: "",
    },
  })

  // Appearance form
  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      darkMode: false,
    },
  })

  // Fetch user data and preferences
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const userData = await userService.getUserById(userId)

        if (userData) {
          setUser(userData)

          // Set form defaults from user preferences
          notificationForm.reset({
            emailNotifications: userData.preferences.emailNotifications,
            smsNotifications: userData.preferences.smsNotifications,
            marketingEmails: userData.preferences.marketingEmails,
          })

          securityForm.reset({
            twoFactorAuth: userData.preferences.twoFactorAuth,
          })

          appearanceForm.reset({
            darkMode: userData.preferences.darkMode,
          })
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        toast({
          title: "Error",
          description: "Failed to load user settings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId, toast, notificationForm, securityForm, appearanceForm])

  // Handle notification settings submission
  const onNotificationSubmit = async (data: NotificationFormValues) => {
    try {
      setIsLoading(true)

      await userService.updatePreferences(userId, {
        emailNotifications: data.emailNotifications,
        smsNotifications: data.smsNotifications,
        marketingEmails: data.marketingEmails,
      })

      toast({
        title: "Notification settings saved",
        description: "Your notification preferences have been updated.",
      })
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "There was a problem saving your notification settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle security settings submission
  const onSecuritySubmit = async (data: SecurityFormValues) => {
    try {
      setIsLoading(true)

      // Update two-factor auth setting
      await userService.updatePreferences(userId, {
        twoFactorAuth: data.twoFactorAuth,
      })

      // If password fields are filled, update password (this would connect to an API)
      if (data.passwordUpdate) {
        // Implementation would depend on your backend API
        console.log("Password would be updated here")
      }

      toast({
        title: "Security settings saved",
        description: "Your security settings have been updated.",
      })

      // Reset password fields
      securityForm.reset({
        ...data,
        passwordUpdate: "",
        passwordConfirm: "",
      })
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "There was a problem saving your security settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle appearance settings submission
  const onAppearanceSubmit = async (data: AppearanceFormValues) => {
    try {
      setIsLoading(true)

      await userService.updatePreferences(userId, {
        darkMode: data.darkMode,
      })

      toast({
        title: "Appearance settings saved",
        description: "Your appearance settings have been updated.",
      })
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "There was a problem saving your appearance settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !user) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-7 w-1/3 bg-muted rounded"></div>
          <div className="h-5 w-1/2 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-10 w-1/2 bg-muted rounded"></div>
          <div className="space-y-4">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences and settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Form {...notificationForm}>
              <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>

                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Notifications
                            </div>
                          </FormLabel>
                          <FormDescription>
                            Receive email notifications about course updates and announcements.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              SMS Notifications
                            </div>
                          </FormLabel>
                          <FormDescription>
                            Receive text message notifications for important updates and reminders.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Marketing Emails
                            </div>
                          </FormLabel>
                          <FormDescription>
                            Receive emails about new courses, promotions, and special offers.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Notification Settings"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Form {...securityForm}>
              <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Settings</h3>

                  <FormField
                    control={securityForm.control}
                    name="twoFactorAuth"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Two-Factor Authentication
                            </div>
                          </FormLabel>
                          <FormDescription>
                            Add an extra layer of security to your account by enabling two-factor authentication.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <h3 className="text-lg font-medium">Change Password</h3>

                  <FormField
                    control={securityForm.control}
                    name="passwordUpdate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="password" placeholder="Enter new password" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>Password must be at least 8 characters long.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="password" placeholder="Confirm new password" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Security Settings"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Form {...appearanceForm}>
              <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Interface Settings</h3>

                  <FormField
                    control={appearanceForm.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              Dark Mode
                            </div>
                          </FormLabel>
                          <FormDescription>
                            Enable dark mode for a more comfortable viewing experience in low light.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Appearance Settings"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
