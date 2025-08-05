'use client'

import { DeleteButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";


function DeleteButton({ postId }: DeleteButtonProps) {
    return ( 
        <>
            <Button variant={"destructive"} size="sm" className="cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2"/>
                Delete
            </Button>
        </>
     );
}

export default DeleteButton;