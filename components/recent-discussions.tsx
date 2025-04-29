import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

const discussions = [
  {
    id: 1,
    title: "How to structure React components?",
    course: "Introduction to React",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      initials: "AJ",
    },
    replies: 12,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    title: "Best practices for Python error handling",
    course: "Advanced Python Programming",
    author: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
      initials: "MG",
    },
    replies: 8,
    lastActive: "5 hours ago",
  },
  {
    id: 3,
    title: "Visualizing large datasets efficiently",
    course: "Data Science Fundamentals",
    author: {
      name: "James Wilson",
      avatar: "/placeholder.svg",
      initials: "JW",
    },
    replies: 5,
    lastActive: "1 day ago",
  },
]

export function RecentDiscussions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Discussions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Link key={discussion.id} href={`/discussions/${discussion.id}`}>
              <div className="flex cursor-pointer flex-col space-y-2 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <h3 className="font-medium">{discussion.title}</h3>
                <p className="text-sm text-muted-foreground">{discussion.course}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{discussion.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    <span>{discussion.replies}</span>
                    <span className="mx-1">•</span>
                    <span>{discussion.lastActive}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
