
import FadeIn from '@/components/auth/animations/FadeIn';
import SideBar from '@/components/dashboard/sidebar';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "dashboard",
  description: "Sign up and login page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <FadeIn delay={.5} className='flex justify-stretch items-start w-full h-full'>
      <SideBar/>
      <FadeIn resetWithNavigate={true} duration={.5} className='w-full h-full'>
        {children}
      </FadeIn>
    </FadeIn>
  );
}
