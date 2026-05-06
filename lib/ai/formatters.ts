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
  if (partners.length === 0) return "None active.";
  
  return partners
    .map(p => {
      const label = p.short_label || p.partner_type || p.category || "Partner";
      const status = p.status || "Active";
      const website = p.website_url || p.websiteUrl ? `Website: ${p.website_url || p.websiteUrl}` : "No website available";
      
      let details = `- ${p.name} — ${label} — ${status} — ${website}`;
      if (p.description) details += `\n  Description: ${p.description}`;
      if (p.initiative) details += `\n  Initiative: ${p.initiative}`;
      if (p.country) details += `\n  Country: ${p.country}`;
      return details;
    })
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

export function formatTeamForAI(team: any[]): string {
  if (!team || team.length === 0) return "Team information is currently unavailable.";
  
  return team
    .map(m => `- ${m.name} (${m.role}): ${m.bio}`)
    .join("\n");
}
