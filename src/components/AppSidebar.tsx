import { useState } from "react";
import { MessageSquare, History, ChevronRight, ChevronDown, Building2, Search, Plus, Settings, User, Edit2, Trash2 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, SidebarInput, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { StartupFormModal } from "@/components/StartupFormModal";
import { useStartupContext } from "@/hooks/useStartupContext";

// Import agent profile images
const ViraAvatar = "https://i.ibb.co/TB072BQ1/Vira.png";
const BizzyAvatar = "https://i.ibb.co/xq7CpvL7/Bizzy.png";
const ArtieAvatar = "https://i.ibb.co/C5Z5b9Mb/Artie.png";
const MakAvatar = "https://i.ibb.co/W4xQfq9D/Mak.jpg";
const modules = [{
  title: "Vira",
  url: "/vira",
  avatar: ViraAvatar,
  description: "Virtual Co-Founder, helps in making business decisions",
  isDefault: true,
  color: "#9575CD"
}, {
  title: "Bizzy",
  url: "/bizzy",
  avatar: BizzyAvatar,
  description: "Business strategist, guides in growth and market expansion",
  color: "#4A90E2"
}, {
  title: "Artie",
  url: "/artie",
  avatar: ArtieAvatar,
  description: "Creative designer, assists with visuals and branding",
  color: "#E573B5"
}, {
  title: "Mak",
  url: "/mak",
  avatar: MakAvatar,
  description: "Social media handler, automates posts and generates captions",
  color: "#66BB6A"
}];
const chatHistory = [{
  id: 1,
  title: "SaaS Platform for Remote Teams",
  timestamp: "2 hours ago"
}, {
  id: 2,
  title: "AI-Powered Content Generator",
  timestamp: "1 day ago"
}, {
  id: 3,
  title: "Sustainable Fashion Marketplace",
  timestamp: "3 days ago"
}];
export function AppSidebar() {
  const {
    state,
    isMobile
  } = useSidebar();
  const { theme } = useTheme();
  const { hasStartupData } = useStartupContext();
  const location = useLocation();
  const isCollapsed = state === "collapsed" && !isMobile; // Never collapse on mobile
  const [isModulesExpanded, setIsModulesExpanded] = useState(true);
  const [showStartupModal, setShowStartupModal] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  
  // Determine which logo to show based on theme
  const logoSrc = theme === "light" 
    ? "/lovable-uploads/3661269c-226c-4091-834a-d29b93d8d54f.png"
    : "/lovable-uploads/60c9d900-181b-42b8-88fc-44cc13f5c207.png";
  
  return <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-4 sm:p-6 border-b border-sidebar-border">
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
          <div className="w-10 h-10 bg-surface border border-border rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <img src={logoSrc} alt="Logo" className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground tracking-wide">Productica</h2>
              <p className="text-xs text-text-muted font-light">AI Business Validation</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="p-3">
        {/* New Chat + Search */}
        <div className="space-y-2 mb-6">
          <Button 
            variant="secondary"
            className="w-full h-10 justify-center rounded-xl bg-surface border border-border hover:bg-sidebar-hover text-sidebar-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span className="font-medium">New Chat</span>}
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <SidebarInput
              placeholder={isCollapsed ? "Search" : "Search conversations"}
              className="pl-9 pr-3 h-10 rounded-xl bg-surface border border-border text-sm placeholder:text-text-muted/70 focus-visible:ring-0 focus:border-sidebar-ring shadow-sm"
            />
          </div>
        </div>

        {/* My Startup Button */}
        <div className="mb-6">
          <Button 
            variant="secondary" 
            onClick={() => setShowStartupModal(true)}
            className="w-full justify-start gap-3 border border-border transition-all duration-300 hover:bg-sidebar-hover rounded-xl h-11 group"
          >
            <Building2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span className="font-medium">My Startup</span>}
          </Button>
        </div>

        {/* AI Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-sidebar-foreground text-xs font-semibold mb-3 flex items-center gap-2 cursor-pointer hover:text-sidebar-foreground transition-all duration-300 tracking-wider uppercase", 
            !isCollapsed && "px-2 py-1.5 rounded-lg hover:bg-sidebar-hover"
          )} onClick={() => setIsModulesExpanded(!isModulesExpanded)}>
            {!isCollapsed && (
              <>
                {isModulesExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                AI Agents
              </>
            )}
            {isCollapsed && "Agents"}
          </SidebarGroupLabel>
          
          {(isModulesExpanded || isCollapsed) && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {modules.map((module) => (
                  <SidebarMenuItem key={module.title}>
                    <NavLink 
                      to={module.url} 
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group w-full relative",
                        "hover:bg-sidebar-hover text-sidebar-foreground border-2 border-transparent",
                        !isCollapsed && "ml-2",
                        isActive(module.url) && "bg-surface/50 border-border shadow-lg"
                      )}
                      style={isActive(module.url) ? { borderColor: module.color } : {}}
                    >
                      {/* Glow effect on active */}
                      {isActive(module.url) && (
                        <div 
                          className="absolute inset-0 rounded-xl opacity-20 blur-xl"
                          style={{ backgroundColor: module.color }}
                        />
                      )}
                      
                      {/* Circular Avatar with Ring - slightly smaller */}
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-opacity-50 transition-all duration-300"
                          style={{ 
                            ringColor: module.color,
                            transitionDelay: '0ms'
                          }}>
                          <AvatarImage src={module.avatar} alt={`${module.title} avatar`} />
                          <AvatarFallback className="text-xs font-semibold">{module.title[0]}</AvatarFallback>
                        </Avatar>
                        {isActive(module.url) && (
                          <div 
                            className="absolute -inset-1 rounded-full opacity-50 blur-sm animate-pulse"
                            style={{ backgroundColor: module.color }}
                          />
                        )}
                      </div>
                      
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">
                            {module.title}
                          </div>
                          <div className="text-xs text-text-muted truncate">
                            {module.description}
                          </div>
                        </div>
                      )}
                      {!isCollapsed && <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300" />}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* Chat History */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-sidebar-foreground text-xs font-semibold mb-3 flex items-center gap-2 tracking-wider uppercase">
            <History className="w-3.5 h-3.5" />
            {!isCollapsed ? "Recent Chats" : "History"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {chatHistory.map(chat => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="h-auto p-0">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sidebar-hover transition-all duration-300 w-full text-left group">
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 text-sidebar-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-sidebar-foreground truncate font-medium">{chat.title}</div>
                          <div className="text-xs text-sidebar-foreground opacity-60 font-light">{chat.timestamp}</div>
                        </div>
                      )}
                      {/* Actions */}
                      {!isCollapsed && (
                        <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-text-muted hover:text-foreground" aria-label="Edit chat">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-text-muted hover:text-foreground" aria-label="Delete chat">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - fixed to bottom */}
      <SidebarFooter className="mt-auto border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost" className="flex-1 justify-start h-10 rounded-lg hover:bg-sidebar-hover">
            <Settings className="w-4 h-4 mr-2" />
            {!isCollapsed && <span>Settings</span>}
          </Button>
          <Button variant="ghost" className="flex-1 justify-start h-10 rounded-lg hover:bg-sidebar-hover">
            <User className="w-4 h-4 mr-2" />
            {!isCollapsed && <span>Profile</span>}
          </Button>
        </div>
      </SidebarFooter>
      
      <StartupFormModal 
        open={showStartupModal} 
        onOpenChange={setShowStartupModal} 
      />
    </Sidebar>;
}