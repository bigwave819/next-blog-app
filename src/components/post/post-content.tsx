
import { PostContentProps } from "@/lib/types/index"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteButton from "./delete-button";

function PostContent({ post, isAuthor }: PostContentProps) {
    return ( 
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">
                   {post.title}
                </CardTitle>
                 <CardDescription>
                    By - { post.author.name } - { formatDate(post.createdAt) }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-lg mb-6 ">{ post.description }</p>
                <p className="text-black font-semibold dark:text-white text-lg mb-6 ">{ post.content }</p>
            </CardContent>
            {
                isAuthor && (
                    <CardFooter>
                        <div className="flex space-x-3">
                            <Button asChild size="sm">
                                <Link href={`/post/edit/${post.slug}`}>
                                    <Pencil className="h-4 w-4 mr-2"/>
                                    Edit
                                </Link>
                            </Button>
                            <DeleteButton postId={post.id}/>
                        </div>
                    </CardFooter>
                )
            }
        </Card>
     );
}

export default PostContent;