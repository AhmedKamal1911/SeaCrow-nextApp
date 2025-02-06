import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import loginFormSchema, {
  LoginFormSchema,
} from "@/lib/validations/login-form-schema";
import { useTranslations } from "next-intl";
import { Form } from "@/components/ui/form";
import FormSubmitButton from "@/components/common/form-submit-button";
import CustomFormField from "@/components/common/custom-form-field";
import { LockKeyhole, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// import { User as UserType } from "@/lib/types/shared";
import signIn from "@/lib/mutations/sign-in";

export function LoginForm({
  onSubmit,
}: {
  onSubmit: Dispatch<SetStateAction<string>>;
}) {
  const t = useTranslations();

  const methods = useForm<LoginFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(loginFormSchema(t)),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = methods;
  // ...

  const handleLogin = async (loginCredentials: LoginFormSchema) => {
    try {
      const user = await signIn({
        identifier: loginCredentials.username,
        password: loginCredentials.password,
      });
      if (user?.jwt) {
        onSubmit(user?.jwt);
      } else {
        setError("username", {
          type: "manual",
          message: t("global.loginForm.validation.invalidCredentials"),
        });
      }
      // reset();
    } catch (e) {
      setError("username", {
        type: "manual",
        message: t("global.loginForm.validation.invalidCredentials"), // Assign the error message to the username field
      });
    }
  };
  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-8 h-full">
        <CustomFormField
          icon={<User className="size-4 text-main" />}
          control={control}
          name={"username"}
          placeholder={t("global.loginForm.userName")}
        />
        <CustomFormField
          icon={<LockKeyhole className="size-4 text-main" />}
          control={control}
          name={"password"}
          placeholder={t("global.loginForm.password")}
          type="password"
        />

        <FormSubmitButton
          isSubmitting={isSubmitting}
          loadingText={t("global.loadingText")}
        >
          {t("global.bookTripForm.bookTripFormButtonLabel")}
        </FormSubmitButton>
      </form>
    </Form>
  );
}

export default LoginForm;
