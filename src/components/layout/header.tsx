'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";
import ThemeToggle from "../theme/theme-toggle";


function Header() {

    const { data: session, isPending } = useSession()

    const navItems = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Create",
            href: "/post/create"
        }
    ]
    return (
        <header className="border-b bg-background sticky top-0 z-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href={"/"} className="font-extrabold text-2xl">
                        Nextj 15 blog
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        {
                            navItems.map((navitem) =>
                                <Link
                                    key={navitem.href}
                                    href={navitem.href}
                                    className={cn('text-sm font-medium transition-colors hover:text-primary')}
                                >
                                    {navitem.label}
                                </Link>
                            )
                        }
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        {/** keep an placeholder for search */}
                    </div>
                    {/** keep an placeholder for Theme toggle */}
                    <ThemeToggle />
                    <div className="flec items-center gap-2">
                        {
                            isPending ? null :
                                session?.user ?
                                    <UserMenu user={session?.user} /> :
                                    <Button variant={"default"} asChild>
                                        <Link href={"/auth"} >Login</Link>
                                    </Button>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;