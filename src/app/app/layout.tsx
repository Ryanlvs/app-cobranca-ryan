import NavBar from "./_components/nav-bar";

export default function AppLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
