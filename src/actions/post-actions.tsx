'use server'


import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { post } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { eq } from "drizzle-orm"
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