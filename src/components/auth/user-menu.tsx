
'use client'

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "better-auth";
import Link from "next/link";
import { LogOut, PenSquare, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

interface UserMenuProps {
    user: User
}


function UserMenu({ user }: UserMenuProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const getInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase()
    }
    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast("you have been logout successfully!")
                        router.refresh()
                    }
                }
            })
        } catch (error) {
            console.log(error);
            toast("failed to logout please try Again")            
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="relative h-8 w-8 rounded-full">
                    <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarFallback>
                            {getInitials(user?.name) || "User"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/profile`} className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>
                            Profile
                        </span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/post/create`} className="cursor-pointer">
                        <PenSquare className="mr-2 h-4 w-4" />
                        <span>
                            Create Post
                        </span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isLoading} className="cursor-pointer">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>{isLoading ? "logging out ..." : "Logout"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;