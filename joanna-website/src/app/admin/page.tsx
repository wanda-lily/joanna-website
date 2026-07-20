import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Admin</h1>

      <Card>
        <CardHeader>
          <CardTitle>New post</CardTitle>
          <CardDescription>Write and publish a new post</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <Button asChild variant="link">
            <Link href="/admin/new">Create</Link>
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage posts</CardTitle>
          <CardDescription>Edit or delete existing posts</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <Button asChild variant="link">
            <Link href="/admin/posts">View all</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
