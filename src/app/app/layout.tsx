import NavBar from "./_components/nav-bar";
import { auth } from "@/services/auth";
import NotAuthenticated from "./_components/not-authenticated";

export default async function AppLayout({ children }: any) {
  const session = await auth();
  if (!session) return <NotAuthenticated />;

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
