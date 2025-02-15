import { Metadata } from "next";
import LoginFormContainer from "./components/login-form-container";
export const metadata: Metadata = {
  title: "Sea Crow - Admin",
  description: "Admin page only for admins",
};
export default function Admin() {
  return (
    <div className="min-h-screen py-36 flex items-center justify-center ">
      <LoginFormContainer />
    </div>
  );
}
