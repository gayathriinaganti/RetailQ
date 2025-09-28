import { useState } from "react";
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  GitCompare,
  Store
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Products", url: "/products", icon: Package },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Compare", url: "/compare", icon: GitCompare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={`transition-all duration-300 ${isCollapsed ? "w-[72px]" : "w-64"}`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">RetailQ</span>
              <span className="text-xs text-muted-foreground">E-commerce Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`h-11 ${isActive(item.url) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
                  >
                    <NavLink 
                      to={item.url} 
                      end
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar trigger for mobile */}
      <div className="absolute -right-4 top-4 md:hidden">
        <SidebarTrigger className="h-8 w-8 rounded-full bg-background shadow-md border" />
      </div>
    </Sidebar>
  );
}