"use client";
import useToast from "@/hooks/useToast";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {

   const { toaster } = useToast();

   const queryClient = new QueryClient();

   return (
      <>
         <QueryClientProvider client={queryClient}>
            {children}
            {toaster()}
         </QueryClientProvider>
      </>
   );
}
