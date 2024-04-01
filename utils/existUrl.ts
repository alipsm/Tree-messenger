import { usePathname } from "next/navigation";

export default function ExistUrl(url:string):boolean {
    const pathname = usePathname();
    const isExist = !!pathname?.split("/").includes(url);
    return isExist
}