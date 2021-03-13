import { useSession } from "next-auth/client";

import { RedirectToLogin } from "../Redirect/RedirectToLogin";

export const RequireAuth: React.FC = ({ children }) => {
  const [session, loading] = useSession();

  if (loading) {
    return null;
  }

  if (!session) {
    return <RedirectToLogin />;
  }

  return <>{children}</>;
};
