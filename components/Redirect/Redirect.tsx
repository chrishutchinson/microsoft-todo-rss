import { useRouter } from "next/router";
import { useEffect } from "react";

export const Redirect: React.FC<{
  to: string;
}> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
};
