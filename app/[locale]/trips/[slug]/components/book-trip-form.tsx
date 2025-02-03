"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import bookTrip from "@/lib/mutations/book-trip";
import bookTripFormSchema, {
  BookTripSchema,
} from "@/lib/validations/bookTripSchema";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import CustomFormField from "@/components/common/custom-form-field";
import {
  Baby,
  CircleCheckBig,
  CircleX,
  Hotel,
  Mail,
  MessageSquare,
  Pen,
  PersonStanding,
  PhoneCall,
  User,
} from "lucide-react";
import { DatePicker } from "./date-picker";
import { CountryComboBox } from "./country-combo-box";
import FormSubmitButton from "@/components/common/form-submit-button";
import { sendTicketMail } from "@/lib/mutations/send-ticket-mail";
import { useToast } from "@/hooks/use-toast";

export default function BookTripForm({ tripSlug }: { tripSlug: string }) {
  const t = useTranslations();
  const formRef = useRef(null);
  const { toast } = useToast();
  // const captcha = useRef(null);
  // const [isCaptchaSuccess, setIsCaptchaSuccess] = useState(false);
  // const onChange = () => {
  //   setIsCaptchaSuccess(true);
  // };
  const methods = useForm<BookTripSchema>({
    mode: "onSubmit",
    resolver: zodResolver(bookTripFormSchema(t)),
    defaultValues: {
      email: "",
      message: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      hotelName: "",
      checkDate: undefined, // Default value for check-in date
      childCount: 0,
      babiesCount: 0,
      adultCount: 1,
      country: "",
      tripSlug: tripSlug,
    },
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: BookTripSchema) => {
    const formattedDate = format(new Date(data.checkDate), "yyyy-MM-dd");
    try {
      await bookTrip({ ...data, checkDate: formattedDate });
      await sendTicketMail({ ...data, checkDate: formattedDate });
      console.log("ticket send");
      toast({
        description: t("global.toasts.messageToast.successMessage"),
        variant: "success",
        icon: <CircleCheckBig className="size-7" />,
      });
      console.log("toast show");
      setTimeout(() => {
        reset();
      }, 1000);
      // TODO:Revalidate the admin path
      // if (isCaptchaSuccess) {
      //   // toast({
      //   //   description: t("global.toasts.messageToast.successMessage"),
      //   //   variant: "success",
      //   //   icon: <IoMdCheckmarkCircleOutline className="size-7" />,
      //   // });
      //   // setTimeout(() => {
      //   //   reset();
      //   //   if (captcha.current) {
      //   //     captcha.current.reset();
      //   //     setIsCaptchaSuccess(false);
      //   //   }
      //   // }, 1000);
      // }
    } catch (e) {
      toast({
        description: t("global.toasts.messageToast.failedMessage"),
        variant: "destructive",
        icon: <CircleX className="size-7" />,
      });
    }
  };

  return (
    <Form {...methods}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="border-[#cac8c85d] border rounded-md shadow-md bg-white"
      >
        <div className="flex flex-col gap-8  p-4">
          <CustomFormField
            icon={<Pen className="size-4 text-main" />}
            control={control}
            name="firstName"
            type="text"
            placeholder={t("global.bookTripForm.firstName")}
          />

          <CustomFormField
            icon={<Pen className="size-4 text-main" />}
            control={control}
            name="lastName"
            type="text"
            placeholder={t("global.bookTripForm.lastName")}
          />

          <CustomFormField
            icon={<Mail className="size-4 text-main" />}
            control={control}
            name="email"
            type="email"
            placeholder={t("global.bookTripForm.email")}
          />

          <CustomFormField
            icon={<PhoneCall className="size-4 text-main" />}
            control={control}
            name="phoneNumber"
            type="text"
            placeholder={t("global.bookTripForm.phoneNumber")}
          />
          <CustomFormField
            icon={<Hotel className="size-4 text-main" />}
            control={control}
            name="hotelName"
            type="text"
            placeholder={t("global.bookTripForm.hotelName")}
          />

          <FormField
            control={control}
            name="checkDate"
            render={({ field }) => {
              return (
                <FormItem className="w-full relative">
                  <FormControl>
                    <DatePicker
                      placeholder={t("global.bookTripForm.checkDate")}
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormControl>
                  <input
                    type="text"
                    name={field.name}
                    hidden
                    defaultValue={
                      field.value
                        ? format(
                            new Date(field.value),
                            "dd MMMM, hh:mm a, yyyy"
                          )
                        : ""
                    }
                  />
                  <FormMessage className="text-red-600 text-[16px]" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => {
              return (
                <FormItem className="w-full relative">
                  <FormControl>
                    <CountryComboBox
                      selectCountry={field.value}
                      onSelectCountry={field.onChange}
                    />
                  </FormControl>
                  <input
                    type="text"
                    name={field.name}
                    hidden
                    defaultValue={field.value}
                  />
                  <FormMessage className="text-red-600 text-[16px]" />
                </FormItem>
              );
            }}
          />

          <div className="flex flex-col  gap-8 lg:gap-5 ">
            <div>
              <span className="text-grayDesc">
                {t("global.bookTripForm.adult")}
              </span>
              <CustomFormField
                icon={<User className="size-4 text-main" />}
                control={control}
                name="adultCount"
                type="number"
              />
            </div>
            <div>
              <span className="text-grayDesc">
                {t("global.bookTripForm.child")}
              </span>
              <CustomFormField
                icon={<PersonStanding className="size-4 text-main" />}
                control={control}
                name="childCount"
                type="number"
              />
            </div>
            <div>
              <span className="text-grayDesc">
                {t("global.bookTripForm.babies")}
              </span>
              <CustomFormField
                icon={<Baby className="size-4 text-main" />}
                control={control}
                name="babiesCount"
                type="number"
              />
            </div>
          </div>
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    icon={<MessageSquare className="size-4 text-main" />}
                    {...field}
                    className="text-[16px] ps-7 pt-0 pb-0 pe-0 focus-visible:ring-transparent h-[120px] focus:placeholder:text-main border-t-0 border-l-0 border-r-0 border-b-[2px] rounded-none shadow-none focus:border-b-main transition-[border,placeholder] duration-500"
                    placeholder={t("global.bookTripForm.message")}
                    id="message-2"
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-[16px]" />
              </FormItem>
            )}
          />

          {/* <ReCAPTCHA
            className="recaptcha"
            ref={captcha}
            sitekey={import.meta.env.VITE_SITE_KEY}
            onChange={onChange}
          /> */}

          <FormSubmitButton
            isSubmitting={isSubmitting}
            loadingText={t("global.loadingText")}
          >
            {t("global.bookTripForm.bookTripFormButtonLabel")}
          </FormSubmitButton>
        </div>
      </form>
    </Form>
  );
}
