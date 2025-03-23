
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ClipboardList, 
  GitPullRequest, 
  BarChart3, 
  Calendar, 
  Settings, 
  Users, 
  Kanban, 
  Star,
  GitMerge,
  PlusCircle,
  ChevronDown,
  BarChart4,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent 
} from '@/components/ui/collapsible';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const mainNav = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Boards', icon: Kanban, path: '/board' },
    { name: 'Backlog', icon: ClipboardList, path: '/backlog' },
    { name: 'Sprints', icon: GitPullRequest, path: '/sprints' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
  ];
  
  const projects = [
    { name: 'AI Chatbot', path: '/projects/ai-chatbot' },
    { name: 'E-commerce Website', path: '/projects/ecommerce' },
    { name: 'Mobile App', path: '/projects/mobile-app' },
    { name: 'Landing Page', path: '/projects/landing-page' },
  ];
  
  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-14 flex items-center px-4 border-b border-sidebar-border/50">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white">AI-Kanban</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <div className="px-3 mb-6">
            <Button variant="default" className="w-full justify-start bg-sidebar-primary hover:bg-sidebar-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </div>
          
          <div className="space-y-1 px-3">
            {mainNav.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-white font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-6 px-3">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-sidebar-foreground/90">
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Recent Projects</span>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pt-1">
                {projects.map((project) => (
                  <Link
                    key={project.name}
                    to={project.path}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md transition-colors ml-6",
                      location.pathname === project.path
                        ? "bg-sidebar-accent text-white font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                    )}
                  >
                    {project.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="mt-6 px-3">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-sidebar-foreground/90">
                <div className="flex items-center">
                  <GitMerge className="mr-2 h-4 w-4" />
                  <span>Development</span>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pt-1">
                <Link
                  to="/code"
                  className="flex items-center px-3 py-2 text-sm rounded-md transition-colors ml-6 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                >
                  Code
                </Link>
                <Link
                  to="/pull-requests"
                  className="flex items-center px-3 py-2 text-sm rounded-md transition-colors ml-6 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                >
                  Pull Requests
                </Link>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
        
        <div className="border-t border-sidebar-border/50 p-3 space-y-1">
          <Link
            to="/settings"
            className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white transition-colors"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
          <Link
            to="/team"
            className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white transition-colors"
          >
            <Users className="mr-2 h-4 w-4" />
            Team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
