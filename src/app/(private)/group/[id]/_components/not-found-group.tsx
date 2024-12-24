import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Contact, Home } from "lucide-react";

export function NotFoundGroup() {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-8 justify-center h-full">
      <h1 className="font-bold text-6xl sm:text-8xl text-center">
        Sorry, we couldn't find that group.
      </h1>
      <p className="text-muted-foreground text-lg text-center">
        Please try again. If you think this is a mistake, please contact us.
      </p>
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href="/" className="flex items-center gap-1">
            <Home />
            Go back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact-us" className="flex items-center gap-1">
            <Contact />
            Contact us
          </Link>
        </Button>
      </div>
    </div>
  );
}
