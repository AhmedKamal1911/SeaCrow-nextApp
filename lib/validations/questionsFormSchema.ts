import { useTranslations } from "next-intl";
import { z } from "zod";

function questionFormSchema(t: ReturnType<typeof useTranslations>) {
  // FIXME: set error requierd message for fullname and subject and message and translate it
  return z.object({
    email: z
      .string({ message: t("global.contactForm.validation.emailRequired") })
      // .min(1, {})
      .email({
        message: t("global.contactForm.validation.emailInvalid"),
      }),
    fullName: z
      .string({ message: "The full name is requierd" })
      .min(2, { message: t("global.contactForm.validation.nameMin") })
      .max(50, { message: t("global.contactForm.validation.nameMax") }),
    subject: z
      .string({ message: "Subject is requierd" })
      .min(2, { message: t("global.contactForm.validation.subjectMin") })
      .max(30, {
        message: t("global.contactForm.validation.subjectMax"),
      }),
    message: z.string({ message: "Message is Requierd" }).min(1, {
      message: t("global.contactForm.validation.messageRequired"),
    }),
  });
}

export default questionFormSchema;
