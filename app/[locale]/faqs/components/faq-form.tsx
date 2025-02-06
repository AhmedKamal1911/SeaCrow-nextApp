"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRef } from "react";

import { useTranslations } from "next-intl";
import questionFormSchema, {
  QuestionFormSchema,
} from "@/lib/validations/questions-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "@/components/common/custom-form-field";
import { CircleCheckBig, CircleX, Mail, Pen } from "lucide-react";
import FormSubmitButton from "@/components/common/form-submit-button";
import { Textarea } from "@/components/ui/textarea";
import { sendMail } from "@/lib/mutations/send-email";
import { useToast } from "@/hooks/use-toast";

const FaqForm = () => {
  const formRef = useRef(null);
  const { toast } = useToast();
  const t = useTranslations();

  const methods = useForm<QuestionFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(questionFormSchema(t)),
    defaultValues: {
      email: "",
      message: "",
      fullName: "",
      subject: "",
    },
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: QuestionFormSchema) => {
    try {
      await sendMail(data);
      toast({
        description: t("global.toasts.messageToast.successMessage"),
        variant: "success",
        icon: <CircleCheckBig className="size-7" />,
      });
      setTimeout(() => {
        reset();
      }, 1000);
    } catch (error) {
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
        <div className="flex flex-col gap-8  p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <CustomFormField
              icon={<Pen className="size-4 text-main" />}
              control={control}
              name="fullName"
              type="text"
              placeholder={t("global.contactForm.name")}
            />

            <CustomFormField
              icon={<Mail className="size-4 text-main" />}
              control={control}
              name="email"
              type="email"
              placeholder={t("global.contactForm.email")}
            />
          </div>
          <CustomFormField
            icon={<Pen className="size-4 text-main" />}
            control={control}
            name="subject"
            type="text"
            placeholder={t("global.contactForm.subject")}
          />

          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    {...field}
                    className="text-[16px] p-0 focus-visible:ring-transparent h-[180px] resize-none focus:placeholder:text-main border-t-0 border-l-0 border-r-0 border-b-[2px] rounded-none shadow-none focus:border-b-main transition-[border,placeholder] duration-500"
                    placeholder={t("global.contactForm.message")}
                    id="message-2"
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-[16px]" />
              </FormItem>
            )}
          />

          <FormSubmitButton
            isSubmitting={isSubmitting}
            loadingText={t("global.loadingText")}
          >
            {t("global.contactForm.contactFormButtonLabel")}
          </FormSubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default FaqForm;
