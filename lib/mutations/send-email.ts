import { QuestionFormSchema } from "../validations/questions-form-schema";

// Example in a React component
export async function sendMail(data: QuestionFormSchema) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/help`,
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
