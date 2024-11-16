import MainLayout from "@/layouts/MainLayout";
import { SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <MainLayout>
      <main className="w-full h-svh flex flex-col min-w-0">
        <div className="p-2">
          <SidebarTrigger />
        </div>
        <div className="flex-1">main chat</div>
        <div>Chat box </div>
      </main>
    </MainLayout>
  );
}

export default App;
