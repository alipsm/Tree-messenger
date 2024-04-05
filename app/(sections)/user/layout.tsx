
import FadeIn from '@/components/animations/FadeIn';
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
    <FadeIn delay={.5} className='w-full h-full'>
      <FadeIn resetWithNavigate={true} className='w-full h-full'>
        {children}
      </FadeIn>
    </FadeIn>
  );
}
