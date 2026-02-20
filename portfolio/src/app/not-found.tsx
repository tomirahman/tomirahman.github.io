import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Page Not Found</p>
            <Button asChild>
                <Link to="/">Return Home</Link>
            </Button>
        </div>
    );
}
