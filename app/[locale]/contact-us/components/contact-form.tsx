"use client";

import { CircleCheckBig, CircleX } from "lucide-react";

import FaqInput from "./faq-form-fields";
import { Textarea } from "@/components/ui/textarea";
import FormSubmitButton from "@/components/common/form-submit-button";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@conform-to/react";
import sendMailAction from "@/lib/actions/send-mail-action";
import { parseWithZod } from "@conform-to/zod";
import questionFormSchema from "@/lib/validations/questionsFormSchema";
import FormMessage from "@/components/common/form-message";
export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations();

  const { toast } = useToast();
  const [lastResult, action, isPending] = useActionState(
    sendMailAction,
    undefined
  );
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: questionFormSchema(t) });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  // TODO: handle show toast after success
  // const methods = useForm({
  //   mode: "onBlur",
  //   resolver: zodResolver(questionFormSchema(t)),
  //   defaultValues: {
  //     email: "",
  //     message: "",
  //     name: "",
  //     subject: "",
  //   },
  // });
  // const {
  //   reset,
  //   handleSubmit,
  //   control,
  //   formState: { isSubmitting },
  // } = methods;

  // useLangAwareForm(t, reset, questionFormSchema);

  const sendEmail = () => {
    // return emailjs
    //   .sendForm(serviceId, templateId, formRef.current, {
    //     publicKey: import.meta.env.VITE_EMAILJS_FORM_PUBLIC_KEY,
    //   })
    //   .then(
    //     () => {
    //       toast({
    //         description: t("global.toasts.messageToast.successMessage"),
    //         variant: "success",
    //         icon: <CircleCheckBig className="w-7 h-7" />,
    //       });
    //       setTimeout(() => {
    //         reset();
    //       }, 1000);
    //     },
    //     () => {
    //       toast({
    //         description: t("global.toasts.messageToast.failedMessage"),
    //         variant: "destructive",
    //         icon: <CircleX className="w-6 h-6" />,
    //       });
    //     }
    //   );
  };
  // await sendEmail();
  console.log({ test: fields.email, forms: form.allErrors });
  return (
    <form
      id={form.id}
      action={action}
      onSubmit={form.onSubmit}
      className="border-[#cac8c85d] border rounded-md shadow-md flex-1"
      noValidate
    >
      <div className="flex flex-col gap-8  p-3 md:p-8 h-full">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="flex flex-col gap-3 flex-1">
            <input type="hidden" name="locale" value={locale} />
            <FaqInput
              name="fullName"
              type="text"
              placeholder={t("global.contactForm.name")}
            />
            <FormMessage
              id={fields.fullName.id}
              className="text-red-600 text-[16px] block"
            >
              {fields.fullName?.errors}
            </FormMessage>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <FaqInput
              name="email"
              type="email"
              placeholder={t("global.contactForm.email")}
            />
            <FormMessage
              id={fields.email.id}
              className="text-red-600 text-[16px]"
            >
              {fields.email?.errors}
            </FormMessage>
          </div>
        </div>
        <FaqInput
          name="subject"
          type="text"
          placeholder={t("global.contactForm.subject")}
        />
        <FormMessage
          id={fields.subject.id}
          className="text-red-600 text-[16px]"
        >
          {fields.subject?.errors}
        </FormMessage>

        <div className="space-y-2 flex-1">
          {/* <FormControl> */}
          <Textarea
            name="message"
            className="text-[16px] p-0 focus-visible:ring-transparent h-[180px] resize-none focus:placeholder:text-main border-t-0 border-l-0 border-r-0 border-b-[2px] rounded-none shadow-none focus:border-b-main transition-[border,placeholder] duration-500"
            placeholder={t("global.contactForm.message")}
            id="message-2"
          />
          {/* </FormControl> */}
          <FormMessage
            id={fields.message.id}
            className="text-red-600 text-[16px]"
          >
            {fields.message?.errors}
          </FormMessage>
        </div>

        <FormSubmitButton
          isSubmitting={isPending}
          loadingText={t("global.loadingText")}
        >
          {t("global.contactForm.contactFormButtonLabel")}
        </FormSubmitButton>
      </div>
    </form>
  );
}
