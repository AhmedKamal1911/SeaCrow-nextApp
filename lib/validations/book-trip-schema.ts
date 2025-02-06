import { useTranslations } from "next-intl";
import { z } from "zod";
const phoneNumberRegex =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,}$/;
// const numberRegex = /^[0-9]+$/; //
const bookTripFormSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t("global.bookTripForm.validation.emailRequired") })
      .email({ message: t("global.bookTripForm.validation.emailInvalid") }),
    message: z
      .string()
      .min(1, { message: t("global.bookTripForm.validation.messageRequired") }),
    firstName: z
      .string()
      .min(2, { message: t("global.bookTripForm.validation.firstNameMin") })
      .max(50, { message: t("global.bookTripForm.validation.firstNameMax") }),
    lastName: z
      .string()
      .min(2, { message: t("global.bookTripForm.validation.lastNameMin") })
      .max(50, { message: t("global.bookTripForm.validation.lastNameMax") }),
    phoneNumber: z
      .string()
      .min(10, { message: t("global.bookTripForm.validation.phoneNumberMin") })
      .regex(phoneNumberRegex, {
        message: t("global.bookTripForm.validation.phoneNumberInvalid"),
      }),
    hotelName: z.string().min(1, {
      message: t("global.bookTripForm.validation.hotelNameRequired"),
    }),

    adultCount: z.coerce
      .number()
      .gt(0, { message: t("global.bookTripForm.validation.adultNumberMin") }),

    childCount: z.coerce
      .number()
      .gt(-1, {
        message: t("global.bookTripForm.validation.childNumberNegative"),
      })
      .optional(),
    babiesCount: z.coerce
      .number()
      .gt(-1, {
        message: t("global.bookTripForm.validation.babiesNumberNegative"),
      })
      .optional(),

    checkDate: z.date({
      required_error: t("global.bookTripForm.validation.checkDateRequired"),
    }),

    country: z
      .string()
      .min(1, { message: t("global.bookTripForm.validation.countryRequired") }),

    tripSlug: z.string(),
  });
};

export default bookTripFormSchema;

export type BookTripSchema = z.infer<ReturnType<typeof bookTripFormSchema>>;
