import { auth, signOut } from "@/services/auth";

export default async function Page() {
  const session = await auth();

  const logoff = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <pre>{JSON.stringify(session, null, 1)}</pre>
      <form action={logoff}>
        <button type="submit">Sing Out</button>
      </form>
    </>
  );
}
