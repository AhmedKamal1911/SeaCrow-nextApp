import { z } from "zod";
import { customFetch } from "../helpers/custom-fetch";
const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  provider: z.any(), // Using z.any() since the type is unknown
  confirmed: z.boolean(),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const AuthResponseSchema = z.object({
  jwt: z.string(),
  user: UserSchema,
});

export default async function signIn(credentials: {
  identifier: string;
  password: string;
}) {
  try {
    const response = await customFetch(
      `auth/local`,
      undefined,
      "POST"
      // credentials
    );

    const result = AuthResponseSchema.safeParse(response);
    // TODO:revalidate path admin
    return result.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}
