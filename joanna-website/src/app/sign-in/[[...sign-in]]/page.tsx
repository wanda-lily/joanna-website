import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <SignIn />
    </div>
  )
}
