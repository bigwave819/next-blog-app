'use client'

import { z } from "zod"
import { Button } from "@/components/ui/button" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { createPost } from "@/actions/post-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const postSchema = z.object({
    title: z
        .string()
        .min(3, "title must be at least 3 characters long")
        .max(255, "title must be less than 255 characters"),
    description: z
        .string()
        .min(5, "description must be at least 5 characters long")
        .max(255, "description must be less than 255 characters"),
    content: z
        .string()
        .min(10, "content must be at least 10 characters long"),
})

type PostFormValues = z.infer<typeof postSchema>

function PostForm() {

    const [ isPending, startTransition ] = useTransition();
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            description: '',
            content: ''
        }
    });

    const onFormSubmit = async (data: PostFormValues) => {
        startTransition(async () => {
            try {
                const formData = new FormData()
                formData.append('title', data.title)
                formData.append('description', data.description)
                formData.append("content", data.content)

                let res;

                res = await createPost(formData);

                console.log("res", res);
                

                if (res.success) {
                    toast("post created successfully!!")
                    router.refresh()
                    router.push("/")
                }
            } catch (error) {
                toast("Failed to create post!!")
            }
        })
    } 
    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-bold">
                    Title
                </label>
                <input
                    id="title"
                    placeholder="Enter the post title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition"
                    {...register('title')}
                    disabled={isPending}
                />
                {
                    errors?.title && 
                    <p className="text-sm text-red-600">{errors.title.message}</p>
                }
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-bold">
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="Enter a short post description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition resize-none"
                    rows={3}
                    {...register('description')}
                    disabled={isPending}
                />
                {
                    errors?.description && 
                    <p className="text-sm text-red-600">{errors.description.message}</p>
                }
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-bold">
                    Content
                </label>
                <textarea
                    id="content"
                    placeholder="Enter full post content"
                    className="w-full px-4 py-2 min-h-[250px] border border-gray-300 rounded-lg shadow-sm focus:outline-none transition resize-none"
                    {...register('content')}
                    disabled={isPending}
                />
                {
                    errors?.content && 
                    <p className="text-sm text-red-600">{errors.content.message}</p>
                }
            </div>

            <div>
                <Button className="mt-5 w-full cursor-pointer" type="submit" disabled={isPending}>
                    { isPending ? 'Saving post ...' : 'Create A post'}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
