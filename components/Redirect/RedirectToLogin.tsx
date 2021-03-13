import { signIn } from "next-auth/client";
import { useEffect } from "react";

export const RedirectToLogin: React.FC = () => {
  useEffect(() => {
    signIn();
  }, []);

  return null;
};
