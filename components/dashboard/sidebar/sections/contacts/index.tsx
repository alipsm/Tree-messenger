import React from 'react'
import SideBarCard from '../../layouts/card'
import { BsFillTreeFill } from 'react-icons/bs'

export default function Contacts() {

  const statusColor = {
    online:"#38E54D",
    offline:"#FDFF00"
 }
  return (
     <div>
        <SideBarCard
           title="parsa"
           ico={<BsFillTreeFill color={statusColor["online"]} />}
           rightText={"12:36"}
           subtitle="tree-6985"
        />
        <SideBarCard
           title="melika"
           ico={<BsFillTreeFill color={statusColor["online"]} />}
           rightText={"15:23"}
           subtitle="tree-7543"
        />
        <SideBarCard
           title="javad"
           ico={<BsFillTreeFill color={statusColor["online"]} />}
           rightText={"05:48"}
           subtitle="tree-5689"
        />
        <SideBarCard
           title="reza"
           ico={<BsFillTreeFill color={statusColor["offline"]} />}
           rightText={"23:16"}
           subtitle="tree-4523"
        />
     </div>
  );
}
