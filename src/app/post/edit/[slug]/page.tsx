import Container from "@/components/layout/container";
import PostForm from "@/components/post/post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function EditPostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        redirect("/auth");
    }

    const post = await getPostBySlug(slug);

    if (!post) {
        return notFound();
    }

    if (post.authorId !== session.user.id) {
        redirect("/");
    }

    return ( 
        <Container>
            <Card className="my-10">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold">
                            Create new Post
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PostForm 
                            isEditing={true}
                            post={{
                                id: post.id,
                                title: post.title,
                                description: post.description,
                                content: post.content,
                                slug: post.slug
                            }}
                        />
                    </CardContent>
                </Card>
        </Container>
    );
}

export default EditPostPage;
