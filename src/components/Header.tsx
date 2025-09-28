import { Search, Bell, Settings, Moon, Sun, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Mobile menu and search */}
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger className="h-8 w-8" />
          
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products, orders, customers..."
              className="pl-10 pr-4 bg-muted/50 border-none focus:bg-background"
            />
          </div>
        </div>

        {/* Right side - Actions and user menu */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className="h-9 w-9 p-0"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
                <Bell className="h-4 w-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have 3 unread notifications</p>
              </div>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">Order #12345 for $299.99</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Low stock alert</p>
                  <p className="text-xs text-muted-foreground">Wireless Headphones - 5 left</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Customer review</p>
                  <p className="text-xs text-muted-foreground">5-star review on Smart Watch</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Store Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                API Keys
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User avatar */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {userInitial}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Retailer</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}