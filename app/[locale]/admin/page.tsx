import { Locale } from "@/i18n/routing";
import LoginFormContainer from "./components/login-form-container";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return {
    title: "Sea Crow - Admin",
    description: "Admin page only for admins",
    metadatabase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    openGraph: {
      title: `Sea Crow - Admin`,
      description: "Admin page only for admins",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/admin`,
      siteName: "SeaCrow",
      locale: locale,
    },
  };
}

export default function Admin() {
  return (
    <div className="min-h-screen py-36 flex items-center justify-center ">
      <LoginFormContainer />
    </div>
  );
}
