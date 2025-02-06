"use server";
import { parseWithZod } from "@conform-to/zod";
import questionFormSchema from "../validations/questions-form-schema";
import { getTranslations } from "next-intl/server";

export default async function sendMailAction(
  prevState: unknown,
  formData: FormData
) {
  const t = await getTranslations({ locale: formData.get("locale") });
  formData.delete("locale");
  const submission = parseWithZod(formData, {
    schema: questionFormSchema(t),
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // redirect("/dashboard");
}
