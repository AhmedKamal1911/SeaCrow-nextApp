import { TripTicket } from "../types/shared";

// Example in a React component
export async function sendTicketMail(data: TripTicket) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/bookTrip`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error(JSON.stringify((await response.json()).message));
  }
  const result = await response.json();
  return result;
}
