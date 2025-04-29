"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Download, ThumbsUp } from "lucide-react"
import type { Lesson } from "./course-detail"

interface CourseContentProps {
  lesson: Lesson | undefined
}

export function CourseContent({ lesson }: CourseContentProps) {
  const [isCompleted, setIsCompleted] = useState(lesson?.completed || false)

  if (!lesson) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">Select a lesson to begin</p>
      </div>
    )
  }

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted)
    // In a real app, you would update this on the server
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Tabs defaultValue="content" className="flex flex-1 flex-col">
        <div className="border-b px-4 md:px-6">
          <TabsList className="h-12">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {lesson.type === "video" && (
              <div className="overflow-hidden rounded-lg border bg-black">
                <video
                  controls
                  className="aspect-video w-full"
                  poster="/placeholder.svg?height=400&width=800"
                  src={lesson.content.videoUrl}
                />
              </div>
            )}

            {lesson.type === "quiz" && (
              <Card>
                <CardHeader>
                  <CardTitle>Module Quiz</CardTitle>
                  <CardDescription>Test your knowledge of the concepts covered in this module</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lesson.content.questions.map((question: any, index: number) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-medium">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`question-${index}-option-${optionIndex}`}
                              name={`question-${index}`}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                              htmlFor={`question-${index}-option-${optionIndex}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button>Submit Quiz</Button>
                </CardFooter>
              </Card>
            )}

            {lesson.type === "assignment" && (
              <Card>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>Due: {lesson.content.dueDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-medium">Instructions</h3>
                    <p>{lesson.content.instructions}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex w-full items-center gap-4">
                    <Button>Upload Submission</Button>
                    <p className="text-sm text-muted-foreground">Max file size: 10MB</p>
                  </div>
                </CardFooter>
              </Card>
            )}

            <div className="space-y-4 rounded-lg border p-6">
              <h2 className="text-xl font-bold">{lesson.title}</h2>
              <div className="prose max-w-none dark:prose-invert">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl
                  aliquam nisl, eu aliquam nisl nisl eu nisl.
                </p>
                <p>
                  Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed
                  euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
                </p>
                <h3>Key Concepts</h3>
                <ul>
                  <li>First important concept explained in detail</li>
                  <li>Second important concept with examples</li>
                  <li>Third concept with practical applications</li>
                </ul>
                <p>
                  Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed
                  euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Helpful
                </Button>
              </div>
              <Button onClick={handleMarkComplete} variant={isCompleted ? "default" : "outline"}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {isCompleted ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Lesson Resources</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Lesson Slides</h3>
                  <p className="text-sm text-muted-foreground">PDF, 2.4 MB</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Code Examples</h3>
                  <p className="text-sm text-muted-foreground">ZIP, 1.8 MB</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Additional Reading</h3>
                  <p className="text-sm text-muted-foreground">PDF, 3.2 MB</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discussion" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-4 text-xl font-bold">Discussion</h2>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <img src="/placeholder.svg" alt="User avatar" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Alex Johnson</h3>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="mt-2 text-sm">
                        I'm having trouble understanding the concept of props drilling. Can someone explain it in
                        simpler terms?
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>12</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-12 rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <img src="/placeholder.svg" alt="User avatar" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Sarah Johnson</h3>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          Instructor
                        </span>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="mt-2 text-sm">
                        Props drilling is when you pass props through multiple components that don't need those props
                        themselves but only pass them down to child components. It's like passing a bucket of water
                        through multiple people to reach the person who actually needs it.
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>8</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <img src="/placeholder.svg" alt="User avatar" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Michael Chen</h3>
                        <span className="text-xs text-muted-foreground">12 hours ago</span>
                      </div>
                      <p className="mt-2 text-sm">
                        The video explanation was really helpful! I finally understand how to use the useEffect hook
                        properly.
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>5</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <img src="/placeholder.svg" alt="Your avatar" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <textarea
                    className="min-h-[100px] w-full rounded-lg border p-3 text-sm"
                    placeholder="Add your comment to the discussion..."
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <Button>Post Comment</Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="notes" className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">My Notes</h2>
            <textarea
              className="min-h-[300px] w-full rounded-lg border p-4 text-sm"
              placeholder="Take notes for this lesson here..."
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Clear</Button>
              <Button>Save Notes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
