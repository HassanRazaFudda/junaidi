export function whatsappUrl(
  number: string,
  parts: { packageName?: string; season?: string; travellers?: number; topic?: string },
) {
  const lines = ["Assalam o Alaikum,"];
  if (parts.packageName) {
    lines.push(
      `I'm asking about ${parts.packageName}${parts.season ? ` (${parts.season})` : ""}${
        parts.travellers ? ` for ${parts.travellers} travellers` : ""
      }.`,
    );
  } else if (parts.topic) {
    lines.push(`I'd like to ask about ${parts.topic}.`);
  } else {
    lines.push("I'd like to ask about your services.");
  }
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(lines.join(" "))}`;
}
