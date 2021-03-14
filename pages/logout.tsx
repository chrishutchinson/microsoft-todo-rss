import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false, callbackUrl: "/" }).then(() => {
      router.push("/");
    });
  }, []);

  return null;
};

export default Logout;
