import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import PostContent from "@/components/post/post-content"




async function PostDetailsPage({ params }: { params: { slug: string } }) {

    const { slug } = await params
    const post = await getPostBySlug(slug)
    

    const session = await auth.api.getSession({
        headers: await headers()
    })


    if (!post) {
        notFound()
    }

    //get author Info
    const isAuthor = session?.user?.id === post.authorId
    return ( 
        <main className="py-10">
            <div className="max-w-4xl mx-auto">
                <PostContent post={post} isAuthor={isAuthor} />
            </div>
        </main>
     );
}

export default PostDetailsPage;