import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Header from "@/components/Header"

export default function AdminDashboard() {
  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <Header section={"Admin"} />

      <Card className=" rounded-md">
        <CardHeader>
          <CardTitle>New post</CardTitle>
          <CardDescription>Write and publish a new post</CardDescription>
          <Link href="/admin/new" className="text-decoration-line: underline">
            Create
          </Link>
        </CardHeader>
      </Card>

      <Card className=" rounded-md">
        <CardHeader>
          <CardTitle>Manage posts</CardTitle>
          <CardDescription>Edit or delete existing posts</CardDescription>
          <Link href="/admin/posts" className="text-decoration-line: underline">
            View all
          </Link>
        </CardHeader>
      </Card>
    </div>
  )
}
