// app/speakers/page.tsx
// Server component — fetches speakers data and passes to client shell

import { getSpeakers } from "@/lib/data/speakers"
import { SpeakersPageClient } from "@/components/speakers/speakers-page-client"
import type { Speaker } from "@/lib/data/speakers"

// ISR — revalidate every 5 minutes
export const revalidate = 300

export default async function SpeakersPage() {
  const speakers: Speaker[] = await getSpeakers()

  return (
    <SpeakersPageClient
      speakers={speakers}
    />
  )
}
