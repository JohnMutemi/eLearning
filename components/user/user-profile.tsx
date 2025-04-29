"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Twitter, Linkedin, Globe, MapPin, Calendar, UserIcon, Edit } from "lucide-react"
import { userService, type User, type LearnerProfile, type TutorProfile } from "@/services/user-service"

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional().nullable(),
  location: z.string().max(100, { message: "Location must not exceed 100 characters." }).optional().nullable(),
  twitter: z.string().max(100).optional().nullable(),
  linkedin: z.string().max(100).optional().nullable(),
  website: z.string().max(100).optional().nullable(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface UserProfileProps {
  userId: number
}

export function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null)
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null)
  const [tutorProfile, setTutorProfile] = useState<TutorProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      location: "",
      twitter: "",
      linkedin: "",
      website: "",
    },
  })

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)

        const userData = await userService.getUserById(userId)
        setUser(userData)

        if (userData?.role === "learner") {
          const learnerData = await userService.getLearnerProfile(userId)
          setLearnerProfile(learnerData)
        } else if (userData?.role === "tutor") {
          const tutorData = await userService.getTutorProfile(userId)
          setTutorProfile(tutorData)
        }

        // Populate form if user data exists
        if (userData) {
          form.reset({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            bio: userData.bio || "",
            location: userData.location || "",
            twitter: userData.socialLinks?.twitter || "",
            linkedin: userData.socialLinks?.linkedin || "",
            website: userData.socialLinks?.website || "",
          })
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId, form, toast])

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // Update user profile
      const updatedUser = await userService.updateProfile(userId, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        bio: data.bio,
        location: data.location,
        socialLinks: {
          twitter: data.twitter || undefined,
          linkedin: data.linkedin || undefined,
          website: data.website || undefined,
        },
      })

      setUser(updatedUser)
      setIsEditing(false)

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading || !user) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-7 w-1/3 bg-muted rounded"></div>
          <div className="h-5 w-1/2 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-32 w-32 rounded-full bg-muted"></div>
            <div className="space-y-2 flex-1">
              <div className="h-7 w-1/2 bg-muted rounded"></div>
              <div className="h-5 w-full bg-muted rounded"></div>
              <div className="h-5 w-3/4 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information and profile details</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user.profileImage || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback>{user.firstName[0] + user.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <FormDescription className="mt-2">JPG, GIF or PNG. Max size of 2MB.</FormDescription>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value || ""}
                        placeholder="Tell us about yourself"
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormDescription>Brief description for your profile. Max 500 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} placeholder="City, Country" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Social Links</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Twitter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input {...field} value={field.value || ""} placeholder="username" className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input {...field} value={field.value || ""} placeholder="username" className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              value={field.value || ""}
                              placeholder="https://yourwebsite.com"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    )
  }

  // Display profile view
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>View and manage your personal profile</CardDescription>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic profile info */}
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="text-2xl">{user.firstName[0] + user.lastName[0]}</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span className="capitalize">{user.role}</span>
            </div>

            {user.bio && <p className="text-muted-foreground">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 pt-2">
              {user.location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.joined).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Role-specific stats */}
        {user.role === "learner" && learnerProfile && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">{learnerProfile.enrolledCourses}</div>
              <div className="text-sm text-muted-foreground">Enrolled Courses</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">{learnerProfile.completedCourses}</div>
              <div className="text-sm text-muted-foreground">Completed Courses</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">{learnerProfile.certificatesEarned}</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">{learnerProfile.averageGrade}%</div>
              <div className="text-sm text-muted-foreground">Average Grade</div>
            </div>
          </div>
        )}

        {user.role === "tutor" && tutorProfile && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">{tutorProfile.coursesCreated}</div>
              <div className="text-sm text-muted-foreground">Courses Created</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">{tutorProfile.studentsCount}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold flex items-center">
                {tutorProfile.ratings.average}
                <span className="text-yellow-500 ml-1">★</span>
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">{tutorProfile.ratings.count}</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
          </div>
        )}

        {/* Social links */}
        {(user.socialLinks?.twitter || user.socialLinks?.linkedin || user.socialLinks?.website) && (
          <>
            <Separator />
            <div>
              <h3 className="mb-3 text-lg font-medium">Social Links</h3>
              <div className="flex flex-wrap gap-3">
                {user.socialLinks?.twitter && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a
                      href={`https://twitter.com/${user.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  </Button>
                )}

                {user.socialLinks?.linkedin && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a
                      href={`https://linkedin.com/in/${user.socialLinks.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                  </Button>
                )}

                {user.socialLinks?.website && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Learner interests */}
        {user.role === "learner" && learnerProfile && (
          <>
            <Separator />
            <div>
              <h3 className="mb-3 text-lg font-medium">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {learnerProfile.interests.map((interest, index) => (
                  <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {interest}
                  </div>
                ))}
              </div>

              <h3 className="mb-3 mt-6 text-lg font-medium">Current Goals</h3>
              <ul className="list-disc pl-5 space-y-1">
                {learnerProfile.currentGoals.map((goal, index) => (
                  <li key={index} className="text-muted-foreground">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Tutor specializations */}
        {user.role === "tutor" && tutorProfile && (
          <>
            <Separator />
            <div>
              <h3 className="mb-3 text-lg font-medium">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {tutorProfile.specializations.map((specialization, index) => (
                  <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {specialization}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="mb-3 text-lg font-medium">Education</h3>
                  <ul className="space-y-2">
                    {tutorProfile.education.map((edu, index) => (
                      <li key={index} className="text-muted-foreground">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Experience</h3>
                  <ul className="space-y-2">
                    {tutorProfile.experience.map((exp, index) => (
                      <li key={index} className="text-muted-foreground">
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
