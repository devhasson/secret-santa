import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-col gap-16 min-h-screen">
      <Header />
      <div className="flex flex-1">{children}</div>
      <div className="flex flex-col gap-4">
        <Separator className="opacity-55"/>
        <Footer />
      </div>
    </div>
  );
}
