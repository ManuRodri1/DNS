import { unstable_cache } from "next/cache";
import { getSpeakers } from "@/lib/airtable-speakers";
import { getPartners } from "@/lib/data/partners";
import { getInfluencers } from "@/lib/data/influencers";
import { STATIC_DNS_CONTEXT } from "./static-dns-context";
import { 
  formatSpeakersForAI, 
  formatPartnersForAI, 
  formatInfluencersForAI, 
  formatTicketsForAI, 
  formatAgendaForAI,
  formatTeamForAI
} from "./formatters";

// Cached Speakers
const getCachedSpeakers = unstable_cache(
  async () => {
    try {
      return await getSpeakers();
    } catch (error) {
      console.error("[AI Context] Failed to fetch speakers:", error);
      return [];
    }
  },
  ["dns-speakers-context"],
  { revalidate: 300, tags: ["speakers"] }
);

// Cached Partners
const getCachedPartners = unstable_cache(
  async () => {
    try {
      return await getPartners();
    } catch (error) {
      console.error("[AI Context] Failed to fetch partners:", error);
      return [];
    }
  },
  ["dns-partners-context"],
  { revalidate: 300, tags: ["partners"] }
);

// Cached Influencers
const getCachedInfluencers = unstable_cache(
  async () => {
    try {
      return await getInfluencers();
    } catch (error) {
      console.error("[AI Context] Failed to fetch influencers:", error);
      return [];
    }
  },
  ["dns-influencers-context"],
  { revalidate: 300, tags: ["influencers"] }
);

export async function buildDNSContext() {
  // Temporary: Call directly without cache for diagnostic
  const [speakers, partners, influencers] = await Promise.all([
    getSpeakers(),
    getPartners(),
    getInfluencers(),
  ]);

  const sponsors = partners.filter(p => p.category === "Sponsor");
  const strategicPartners = partners.filter(p => p.category === "Strategic Partner");
  const mediaPartners = partners.filter(p => p.category === "Media Partner");

  return `
--- OFFICIAL DNS 2026 INFO ---
Event: ${STATIC_DNS_CONTEXT.event_name} (${STATIC_DNS_CONTEXT.acronym})
Date: ${STATIC_DNS_CONTEXT.date}
Location: ${STATIC_DNS_CONTEXT.venue} - ${STATIC_DNS_CONTEXT.address}
Description: ${STATIC_DNS_CONTEXT.short_description}
Vision: ${STATIC_DNS_CONTEXT.vision}

--- TICKETS ---
${formatTicketsForAI(STATIC_DNS_CONTEXT.tickets)}

--- AGENDA ---
${formatAgendaForAI(STATIC_DNS_CONTEXT.agenda_base)}

--- DYNAMIC DIRECTORY (REAL-TIME) ---

SPEAKERS:
${formatSpeakersForAI(speakers)}

SPONSORS:
${formatPartnersForAI(sponsors)}

STRATEGIC PARTNERS:
${formatPartnersForAI(strategicPartners)}

MEDIA PARTNERS:
${formatPartnersForAI(mediaPartners)}

INFLUENCERS:
${formatInfluencersForAI(influencers)}

--- ORGANIZERS ---
Organized by: ${STATIC_DNS_CONTEXT.organizer_info.primary_organizer}
About Organizers: ${STATIC_DNS_CONTEXT.organizer_info.description}
Key Partners: ${STATIC_DNS_CONTEXT.organizer_info.partners.join(", ")}

--- TEAM (Behind DNS 2026) ---
${formatTeamForAI(STATIC_DNS_CONTEXT.team)}

--- CONTACT & SOCIAL ---
Email: ${STATIC_DNS_CONTEXT.contact.email}
Instagram: ${STATIC_DNS_CONTEXT.contact.instagram}
ZARI Mobility: ${STATIC_DNS_CONTEXT.zari_mobility.description} (${STATIC_DNS_CONTEXT.zari_mobility.url})

--- TRAVEL & LOGISTICS ---
Airport: ${STATIC_DNS_CONTEXT.logistics.airport}
Transport: ${STATIC_DNS_CONTEXT.logistics.transportation}
Hotels: ${STATIC_DNS_CONTEXT.logistics.accommodation.join(", ")}
Venue: ${STATIC_DNS_CONTEXT.venue_details.hotel_name} - ${STATIC_DNS_CONTEXT.venue_details.features}

--- DOMINICAN REPUBLIC CONTEXT ---
Visa/Entry: ${STATIC_DNS_CONTEXT.dr_context.visa_info}
Weather: ${STATIC_DNS_CONTEXT.dr_context.weather}
Currency: ${STATIC_DNS_CONTEXT.dr_context.currency}

--- DESTINATION & CONNECTIVITY ---
Why SD: ${STATIC_DNS_CONTEXT.destination_highlights.connectivity}
Culture: ${STATIC_DNS_CONTEXT.destination_highlights.culture}

--- PARTICIPATION & FAQ ---
Language: ${STATIC_DNS_CONTEXT.participation_faq.language}
Call for Speakers: ${STATIC_DNS_CONTEXT.participation_faq.call_for_speakers}
Press/Media: ${STATIC_DNS_CONTEXT.participation_faq.press_media}
Recordings: ${STATIC_DNS_CONTEXT.participation_faq.recordings}
  `.trim();
}
