import { auth } from "@/auth";
import { Header } from "@/components/header";
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
    <div className="flex flex-col gap-16">
      <Header />
      {children}
    </div>
  );
}
