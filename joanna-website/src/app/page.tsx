import HomeClient from "@/components/HomeClient"
import TravelPost from "@/components/TravelPost"

export const dynamic = "force-dynamic"

export default function Page() {
  return <HomeClient travel={<TravelPost />} />
}
