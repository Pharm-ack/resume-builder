"use client";

import getInitials, { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "";
  const initials = getInitials(userName);
  console.log(initials);
  return (
    <header
      id="no-print"
      className="container sticky top-0 z-50 h-16 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="flex h-16 w-full items-center justify-between">
        <div className="text-black">PH</div>
        <div className="gap-4">
          {/* <ModeToggle /> */}
          {session ? (
            <div className="flex items-center justify-center gap-x-5">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "px-4",
                )}
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src={
                          session?.user?.image ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-4",
              )}
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
