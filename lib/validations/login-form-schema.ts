import { useTranslations } from "next-intl";

import { z } from "zod";

export default function loginFormSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    username: z.string().min(2, {
      message: t("global.loginForm.validation.userName"),
    }),
    password: z.string().min(8, {
      message: t("global.loginForm.validation.password"),
    }),
  });
}

export type LoginFormSchema = z.infer<ReturnType<typeof loginFormSchema>>;
