import NavBar from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="p-5 full md:max-w-[1440px]">{children}</div>
    </>
  );
};

export default MainLayout;
