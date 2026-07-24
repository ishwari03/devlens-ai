import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen flex-col bg-[#020617]">
      <Navbar />

      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;