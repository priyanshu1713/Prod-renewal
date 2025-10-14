import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { Homepage } from "@/components/Homepage";
import { HelpButton } from "@/components/HelpButton";
import { QuickActionButton } from "@/components/QuickActionButton";

const Index = () => {
  return (
    <SidebarProvider defaultOpen={false} className="min-h-screen">
      <div className="flex min-h-screen w-full bg-background">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-hidden lg:border-l border-border">
            <Homepage />
          </main>
        </div>
        
        <HelpButton />
        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default Index;