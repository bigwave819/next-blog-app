import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { post } from "./schema";


//get all post
export async function getAllPost() {
    try {
        const allPosts = await db.query.post.findMany({
            orderBy: [desc(post.createdAt)],
            with: {
                author: true 
            }
        })

        return allPosts
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const posts = await db.query.post.findFirst({
            where: eq(post.slug, slug),
            with: {
                author: true
            }
        })

        return posts
    } catch (error) {
        console.log(error);
        return null
    }
}