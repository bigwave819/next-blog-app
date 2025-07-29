import { Button } from "@/components/ui/button";
import Link from "next/link";



function NotFound() {
    return ( 
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">OOPS! Page not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                the page you are looking for doesn't exist or it's been removed
            </p>
            <Button asChild>
                <Link href={`/`}>go to Home Page</Link>
            </Button>
        </div>
     );
}

export default NotFound;