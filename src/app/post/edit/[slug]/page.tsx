import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";




async function EditPostPage({ params }: { params: { slug: string } }) {

    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        redirect("/auth")
    }
    return ( 
        <div>
            <h1>EditPostPage</h1>
        </div>
     );
}

export default EditPostPage;