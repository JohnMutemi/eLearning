import { CourseDetail } from "@/components/course/course-detail"

// This would typically fetch course data from the API
async function getCourseData(courseId: string) {
  // In a real implementation, this would be an API call
  return {
    id: Number.parseInt(courseId),
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React, including components, props, state, and hooks. Build your first React application from scratch and understand the core concepts of modern web development.",
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      bio: "Sarah has been teaching web development for over 5 years and has worked with companies like Google and Facebook.",
      avatar: "/placeholder.svg",
    },
    coverImage: "/placeholder.svg?height=400&width=800",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    reviewCount: 245,
    enrolledCount: 1243,
    lastUpdated: "March 15, 2025",
    modules: [
      {
        id: 1,
        title: "Getting Started with React",
        lessons: [
          {
            id: 101,
            title: "Introduction to React",
            duration: "10:30",
            type: "video",
            completed: true,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          },
          {
            id: 102,
            title: "Setting Up Your Development Environment",
            duration: "15:45",
            type: "video",
            completed: true,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            },
          },
          {
            id: 103,
            title: "Your First React Component",
            duration: "12:20",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            },
          },
        ],
      },
      {
        id: 2,
        title: "React Components and Props",
        lessons: [
          {
            id: 201,
            title: "Component Composition",
            duration: "14:15",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            },
          },
          {
            id: 202,
            title: "Props and PropTypes",
            duration: "11:50",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            },
          },
          {
            id: 203,
            title: "Module Quiz: Components and Props",
            type: "quiz",
            completed: false,
            content: {
              questions: [
                {
                  question: "What is the primary purpose of props in React?",
                  options: [
                    "To manage internal component state",
                    "To pass data from parent to child components",
                    "To handle HTTP requests",
                    "To define component styling",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
          },
        ],
      },
      {
        id: 3,
        title: "State and Lifecycle",
        lessons: [
          {
            id: 301,
            title: "Introduction to State",
            duration: "13:45",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            },
          },
          {
            id: 302,
            title: "useState Hook",
            duration: "16:20",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            },
          },
          {
            id: 303,
            title: "Component Lifecycle",
            duration: "18:10",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            },
          },
          {
            id: 304,
            title: "useEffect Hook",
            duration: "20:05",
            type: "video",
            completed: false,
            content: {
              videoUrl:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            },
          },
        ],
      },
      {
        id: 4,
        title: "Handling Events and Forms",
        lessons: [
          {
            id: 401,
            title: "Event Handling in React",
            duration: "12:30",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            },
          },
          {
            id: 402,
            title: "Controlled Components",
            duration: "14:45",
            type: "video",
            completed: false,
            content: {
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            },
          },
          {
            id: 403,
            title: "Form Submission and Validation",
            duration: "16:20",
            type: "video",
            completed: false,
            content: {
              videoUrl:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            },
          },
          {
            id: 404,
            title: "Assignment: Build a Contact Form",
            type: "assignment",
            completed: false,
            content: {
              instructions:
                "Create a contact form with the following fields: name, email, subject, and message. Implement form validation and display appropriate error messages.",
              dueDate: "May 15, 2025",
            },
          },
        ],
      },
    ],
  }
}

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const courseData = await getCourseData(params.courseId)
  return <CourseDetail course={courseData} />
}
