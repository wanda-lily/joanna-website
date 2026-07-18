import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

async function TravelPost() {
  const posts = await prisma.post.findMany({
    where: {
      section: "TRAVEL",
    },
  })

  return (
    <div>
      {posts.map((item) => (
        <Card key={item.id} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{item.body}</p>
          </CardContent>

          <CardFooter>{item.section}</CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default TravelPost
