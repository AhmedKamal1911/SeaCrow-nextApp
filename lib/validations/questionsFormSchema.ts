import { useTranslations } from "next-intl";
import { z } from "zod";

function questionFormSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    email: z
      .string({ message: t("global.contactForm.validation.emailRequired") })
      // .min(1, {})
      .email({
        message: t("global.contactForm.validation.emailInvalid"),
      }),
    fullName: z
      .string({ message: "global.contactForm.validation.fullNameRequierd" })
      .min(2, { message: t("global.contactForm.validation.nameMin") })
      .max(50, { message: t("global.contactForm.validation.nameMax") }),
    subject: z
      .string({ message: "global.contactForm.validation.subjectRequierd" })
      .min(2, { message: t("global.contactForm.validation.subjectMin") })
      .max(30, {
        message: t("global.contactForm.validation.subjectMax"),
      }),
    message: z
      .string({ message: "global.contactForm.validation.messageRequierd" })
      .min(1, {
        message: t("global.contactForm.validation.messageRequired"),
      }),
  });
}

export default questionFormSchema;
export type QuestionFormSchema = z.infer<ReturnType<typeof questionFormSchema>>;
