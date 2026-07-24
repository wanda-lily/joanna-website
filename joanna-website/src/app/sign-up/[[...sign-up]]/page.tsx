import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <SignUp />
    </div>
  )
}
