import NavBar from "./_components/nav-bar";

export default function AppLayout({ children }: any) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
