"use client";
import toast, { Toaster } from "react-hot-toast";

export default function useToast() {
   function success(message: string) {
      toast.success(message);
   }

   function error(message: any) {
      toast.error(message);
   }

   function toaster() {
      return (
         <Toaster
            position="top-center"
            toastOptions={{
               duration: 4000,
               style: {
                  borderRadius: "8px",
                  background: "#181C20",
                  color: "#F3F3F3",
               },
            }}
         />
      );
   }

   return { toaster, success, error };
}
