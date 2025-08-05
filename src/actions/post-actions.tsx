'use server'


import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { post } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { eq, ne, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"



export const createPost = async (formData: FormData) => {
    try {
        //get the current user 
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session || !session?.user) {
            return {
                success: false,
                message: "you must be logged in to access this page"
            }
        }

        //get the form data 

        const title = formData.get('title') as string;
        const description = formData.get("description") as string;
        const content = formData.get("content") as string;

        //create the slug
        const slug = slugify(title);

        //check if the slug exists
        const existingPost = await db.query.post.findFirst({
            where: eq(post.slug, slug)
        })

        if (existingPost) {
            return {
                success: false,
                message: "the post with this name exists!! try with the different title"
            }
        }

        const [newPost] = await db.insert(post).values({
            title, 
            description, 
            slug, 
            content,
            authorId: session.user.id
        }).returning()

        //revalidate the page to get the latest posts 
        revalidatePath('/')
        revalidatePath(`/post/${slug}`)
        revalidatePath("/profile")


        return {
            success: true,
            message: "Post created Successfully!!",
            slug
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to Create the Post!!",
            error: error
        }
    }
}

export async function updatePost(postId: number, formData: FormData) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session || !session.user) {
            return {
                success: false,
                message: "You must log in order to edit the post"
            }
        }

        //get the form data 

        const title = formData.get('title') as string;
        const description = formData.get("description") as string;
        const content = formData.get("content") as string;

        const slug = slugify(title)

        const existingPost = await db.query.post.findFirst({
            where: and(eq(post.slug, slug), ne(post.id, postId))
        })

        if (existingPost) {
            return {
                success: false,
                message: "the post with this name exists!! try with the different title"
            }
        }

        //check if the id exists
        const posts = await db.query.post.findFirst({
            where: eq(post.id, postId)
        });

        if (posts?.authorId !== session.user.id) {
            return {
                success: false,
                message: "You can only edit your post"
            }
        }

        await db.update(post).set({
            title, description, content, slug, updatedAt: new Date()
        }).where(eq(post.id, postId));

        //revalidate the page to get the latest posts 
        revalidatePath('/')
        revalidatePath(`/post/${slug}`)
        revalidatePath("/profile")

         return {
            success: true,
            message: "Post updated Successfully!!",
            slug
        }

    } catch (error) {
         return {
            success: false,
            message: "Failed to edit the post",
            error
        }
    }
}

export async function deletePost(postId: number) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session || !session.user) {
            return {
                success: false,
                message: "You must be logged in to delete the post"
            }
        }

        // Find the post first
        const existingPost = await db.query.post.findFirst({
            where: eq(post.id, postId)
        })

        if (!existingPost) {
            return {
                success: false,
                message: "Post not found"
            }
        }

        // Make sure the logged-in user owns the post
        if (existingPost.authorId !== session.user.id) {
            return {
                success: false,
                message: "You can only delete your own posts"
            }
        }

        // Perform the delete operation
        await db.delete(post).where(eq(post.id, postId))

        // Revalidate paths
        revalidatePath('/')
        revalidatePath("/profile")

        return {
            success: true,
            message: "Post deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: "Failed to delete the post",
            error
        }
    }
}