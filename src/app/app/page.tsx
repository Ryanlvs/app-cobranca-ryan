import { auth, signOut } from "@/services/auth";
import Dashboard from "./_components/dashboard";

export default async function Page() {
  const session = await auth();

  const logoff = async () => {
    "use server";
    await signOut();
  };

  return <Dashboard user={session.user} />;

  // return (
  //   <>
  //     <pre>{JSON.stringify(session, null, 1)}</pre>
  //     <form action={logoff}>
  //       <button type="submit">Sing Out</button>
  //     </form>
  //   </>
  // );
}
