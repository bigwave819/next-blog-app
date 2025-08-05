// app/profile/page.tsx or wherever you're placing the page

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { headers } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function ProfilePage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session || !session.user) {
        redirect("/auth");
    }

    const { user } = session;

    return (
        <div className="max-w-xl mx-auto mt-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">My Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-5">
                    {user.image && (
                        <Image
                            src={user.image}
                            alt={user.name || "User profile image"}
                            width={80}
                            height={80}
                            className="rounded-full border"
                        />
                    )}
                    <div>
                        <p className="text-lg font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProfilePage;
