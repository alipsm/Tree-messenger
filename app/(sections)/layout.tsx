"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";

import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import useAppStore from "@/hooks/useStore";
import { existRouteInUrl } from "@/utils/existUrl";

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
            <GetUserData />
         </QueryClientProvider>
      </>
   );
}

function GetUserData() {
   const { get } = useApi();
   const { updateUserData } = useAppStore();
   const router = useRouter();
   const mutation = useMutation({
      mutationFn: async () => {
         try {
            const data: any = await get("/user/core");
            const token = data?.token;
            if (token) {
               return Promise.resolve(data);
            }
         } catch (error: any) {
            return Promise.reject(error.message);
         }

         return Promise.reject("Sorry..., Try again later");
      },
      onSuccess: async (data: any) => {
         updateUserData(data);
         !existRouteInUrl("dashboard") && router.push("/dashboard");
      },
      onError: async (e) => {
         !existRouteInUrl("login") && router.replace("/dashboard/logout");
      },
   });

   useEffect(() => {
      mutation.mutate();
   }, []);

   return <></>;
}
