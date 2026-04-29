import { Speaker } from "@/lib/airtable-speakers";
import { Partner } from "@/lib/data/partners";
import { Influencer } from "@/lib/data/influencers";

export function formatSpeakersForAI(speakers: Speaker[]): string {
  if (speakers.length === 0) return "The current speaker list is temporarily unavailable.";
  
  return speakers
    .map(s => `- ${s.fullName}: ${s.jobTitle} at ${s.company}. Topic: ${s.sessionTitle || "General Innovation"}. Profile: https://digitalnomadsummit.co/speakers/${s.slug}`)
    .join("\n");
}

export function formatPartnersForAI(partners: Partner[]): string {
  if (partners.length === 0) return "The current partner or sponsor list is temporarily unavailable.";
  
  return partners
    .map(p => `- ${p.name} (${p.category}): Based in ${p.category === 'Sponsor' ? 'Global' : 'Strategic Area'}. Website: ${p.websiteUrl}`)
    .join("\n");
}

export function formatInfluencersForAI(influencers: Influencer[]): string {
  if (influencers.length === 0) return "The current influencer list is temporarily unavailable.";
  
  return influencers
    .map(i => `- ${i.name}: ${i.role || "Content Creator"} on ${i.platform}. Followers: ${i.followers.toLocaleString()}. Profile: ${i.platformUrl}`)
    .join("\n");
}

export function formatTicketsForAI(tickets: any[]): string {
  return tickets
    .map(t => `${t.name}: ${t.price}. Includes: ${t.includes.join(", ")}. ${t.description}`)
    .join("\n\n");
}

export function formatAgendaForAI(agenda: any): string {
  const formatDay = (dayKey: string, day: any) => {
    return `### ${dayKey.toUpperCase()} - ${day.date}\nTheme: ${day.theme}\n- Morning: ${day.morning.join(", ")}\n- Midday: ${day.midday.join(", ")}\n- Afternoon: ${day.afternoon.join(", ")}\n- Evening: ${day.evening.join(", ")}`;
  };
  
  return `${formatDay("Day 1", agenda.day_1)}\n\n${formatDay("Day 2", agenda.day_2)}`;
}
