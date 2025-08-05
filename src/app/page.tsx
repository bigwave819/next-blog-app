import PostList from "@/components/post/post-list";
import { getAllPost } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nex.js 15 blog Platform",
  description: "Nex.js 15 blog Platform"
}

export default async function Home() {

  const post = await getAllPost()
  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to the blog PlATFORM!</h1>
        {
          post.length === 0 ? 
          <div className="text-center py-10">
            <h2 className="text-xl font-medium">No Post yet</h2>
          </div> : <PostList posts={post}/>
        }
      </div>
    </main>
  );
}
