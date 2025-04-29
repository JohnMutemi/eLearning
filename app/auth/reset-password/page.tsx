"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This would be replaced with actual API call to your Django backend
      // const response = await authService.resetPassword(email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "If an account exists with this email, you'll receive a password reset link.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending the reset link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
        <BookOpen className="h-8 w-8 text-primary" />
        <span>Edu-LMS</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
        </CardHeader>

        {!isSubmitted ? (
          <form onSubmit={handleResetPassword}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending reset link..." : "Send reset link"}
              </Button>

              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
              <div className="mt-2 text-center">
                <Link href="/" className="text-sm text-primary hover:underline">
                  ← Back to Home
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="mb-2 text-sm">
                If an account exists with the email <strong>{email}</strong>, we've sent instructions to reset your
                password.
              </p>
              <p className="text-sm text-muted-foreground">Please check your email inbox and spam folder.</p>
            </div>

            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link href="/auth/login">Back to login</Link>
              </Button>
            </div>
            <div className="mt-2 flex justify-center">
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
