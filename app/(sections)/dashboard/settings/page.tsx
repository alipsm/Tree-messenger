import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MdOpenInNew } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { FaHeart } from "react-icons/fa6";

import ListItems from "@/components/ui/list";
import Switcher from "@/components/elements/switcher";
import SettingPage from "@/components/pages/settings";

export const metadata: Metadata = {
   title: "settings",
   description: "edit user profile",
};

export default function page() {




   return (
<SettingPage/>
   );
}
