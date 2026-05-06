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
  formatTeamForAI,
  formatAgendaForAI
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
  const [speakers, partners, influencers] = await Promise.all([
    getCachedSpeakers(),
    getCachedPartners(),
    getCachedInfluencers(),
  ]);

  const brandSponsors = partners.filter(p => p.section === "brand_sponsors");
  const diterIntellectualSponsors = partners.filter(p => p.section === "diter_intellectual_sponsors");
  const technicalAlignment = partners.filter(p => p.section === "technical_alignment");
  const institutionalEcosystem = partners.filter(p => p.section === "institutional_ecosystem");
  const mediaPartners = partners.filter(p => p.section === "media_partners");

  return `
--- OFFICIAL DNS 2026 OVERVIEW ---
Event: ${STATIC_DNS_CONTEXT.event_name} (${STATIC_DNS_CONTEXT.acronym})
Tagline: ${STATIC_DNS_CONTEXT.tagline}
Hero: ${STATIC_DNS_CONTEXT.hero_phrase}
Date: ${STATIC_DNS_CONTEXT.date}
Location: ${STATIC_DNS_CONTEXT.venue} - ${STATIC_DNS_CONTEXT.address}
Website: ${STATIC_DNS_CONTEXT.website}
Description: ${STATIC_DNS_CONTEXT.short_description}
Positioning (EN): ${STATIC_DNS_CONTEXT.core_positioning.english}
Positioning (ES): ${STATIC_DNS_CONTEXT.core_positioning.spanish}

--- PRESENTED BY ---
Org: ${STATIC_DNS_CONTEXT.organizer_info.presented_by}
About: ${STATIC_DNS_CONTEXT.organizer_info.description}
Focus: ${STATIC_DNS_CONTEXT.organizer_info.focus_areas.join(", ")}
Website: ${STATIC_DNS_CONTEXT.organizer_info.website}

--- VALUE PROPOSITIONS ---
${STATIC_DNS_CONTEXT.value_proposition.map(v => `- For ${v.audience}: ${v.value}`).join("\n")}

--- SUMMIT PILLARS ---
${STATIC_DNS_CONTEXT.summit_pillars.map(p => `* ${p.title} (${p.theme}): ${p.description}`).join("\n")}

--- TICKETS ---
${formatTicketsForAI(STATIC_DNS_CONTEXT.tickets)}

--- AGENDA ---
${formatAgendaForAI(STATIC_DNS_CONTEXT.agenda)}

--- PARTNERSHIP & SPONSORSHIP STRUCTURES ---
Categories: ${STATIC_DNS_CONTEXT.sponsor_categories.join(", ")}
Tiers:
${STATIC_DNS_CONTEXT.partnership_structures.map(s => `- ${s.name}: ${s.price}. Focus: ${s.focus}`).join("\n")}
Notes: ${STATIC_DNS_CONTEXT.important_notes.custom_partnerships} | ${STATIC_DNS_CONTEXT.important_notes.small_support}

--- FLAGSHIP VENTURE: ZARI MOBILITY ---
Title: ${STATIC_DNS_CONTEXT.zari_mobility.title}
Desc: ${STATIC_DNS_CONTEXT.zari_mobility.description}
Investor Info: ${STATIC_DNS_CONTEXT.zari_mobility.investor_access}

--- STRATEGIC REPORT: DITER 2026 ---
Title: ${STATIC_DNS_CONTEXT.diter_2026.title}
Subtitle: ${STATIC_DNS_CONTEXT.diter_2026.subtitle}
Desc: ${STATIC_DNS_CONTEXT.diter_2026.description}
Academic/Institutional Partners: ${STATIC_DNS_CONTEXT.diter_2026.partners.join(", ")}
Note: DITER is not a normal partner logo. It is an intellectual framework and strategic assessment. Supporting organizations are represented through Intellectual Sponsors, Technical Alignment, and Institutional Ecosystem.

--- DYNAMIC DIRECTORY (LIVE FROM AIRTABLE/SUPABASE) ---
SPEAKERS:
${formatSpeakersForAI(speakers)}

PARTNERS FROM SUPABASE — SOURCE OF TRUTH

Brand Sponsors & Partners:
Brand Sponsors & Partners supporting the DNS ecosystem.
${formatPartnersForAI(brandSponsors)}

DITER 2026 Intellectual Sponsors:
DITER 2026 Intellectual Sponsors. These are tied to the Dominican Innovation & Transnational Export Report.
${formatPartnersForAI(diterIntellectualSponsors)}

Technical Alignment:
Organizations in technical alignment with the DITER 2026 framework. These must NOT be called sponsors unless their partner_type/category says so.
${formatPartnersForAI(technicalAlignment)}

Institutional & Ecosystem Alignment:
Institutional and ecosystem collaborators advancing innovation, exports, entrepreneurship, investment, and global competitiveness.
${formatPartnersForAI(institutionalEcosystem)}

Media Partners:
Media, content, press, influencer, or distribution partners.
${formatPartnersForAI(mediaPartners)}

INFLUENCERS:
${formatInfluencersForAI(influencers)}

--- TEAM & CONTACT ---
Team Members:
${formatTeamForAI(STATIC_DNS_CONTEXT.team || [])}
Contact Email: ${STATIC_DNS_CONTEXT.contact.email}
CEO Contact: ${STATIC_DNS_CONTEXT.contact.ceo_email}
Instagram: ${STATIC_DNS_CONTEXT.contact.instagram}

--- LOGISTICS & LANGUAGE ---
Language Rule: ${STATIC_DNS_CONTEXT.important_notes.language}
Airport: ${STATIC_DNS_CONTEXT.logistics.airport}
Transport: ${STATIC_DNS_CONTEXT.logistics.transportation}
Weather: ${STATIC_DNS_CONTEXT.logistics.weather}
Currency: ${STATIC_DNS_CONTEXT.logistics.currency}
  `.trim();
}
