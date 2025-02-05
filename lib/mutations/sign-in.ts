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
    const response = await customFetch({
      pathname: `auth/local`,
      query: undefined,
      method: "POST",
      body: credentials,
    });

    const result = AuthResponseSchema.safeParse(response);

    return result.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}
