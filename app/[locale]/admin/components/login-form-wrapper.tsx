import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import LoginForm from "./login-form";

import { useTranslations } from "next-intl";

export default function LoginFormWrapper({
  onSubmit,
}: {
  onSubmit: Dispatch<SetStateAction<string>>;
}) {
  const t = useTranslations();

  return (
    <div className="flex w-full max-w-[450px] border-[1px] border-main shadow-md md:max-w-[800px] md:min-h-[700px] bg-white rounded-lg overflow-hidden">
      <div className="flex-1 md:block hidden">
        <Image
          src={"/images/login-background.jpg"}
          alt="login background"
          width={380}
          height={700}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 md:p-5 flex gap-10 md:gap-36 flex-col justify-center py-5 md:py-10">
        <h3 className="text-center text-4xl md:text-5xl">
          {t("global.loginForm.loginText")}
        </h3>
        <div className="flex-1 px-5 md:p-0">
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
