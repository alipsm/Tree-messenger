
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "",
  description: "Sign up and login page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" w-full h-full ">
      <nav></nav>
      {children}
    </section>
  );
}
