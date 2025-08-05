'use client'

import { useTransition } from "react";
import { DeleteButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deletePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";

function DeleteButton({ postId }: DeleteButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const res = await deletePost(postId);
            if (res.success) {
                router.push("/")
                router.refresh();
            } else {
                alert(res.message); // show error if any
            }
        });
    };

    return (
        <Button 
            variant="destructive" 
            size="sm" 
            className="cursor-pointer" 
            onClick={handleDelete}
            disabled={isPending}
        >
            <Trash2 className="h-4 w-4 mr-2" />
            {isPending ? "Deleting..." : "Delete"}
        </Button>
    );
}

export default DeleteButton;
