import {create} from "zustand"

type State = {
    user:{
        username:string,
        quick_id:number
    }
}

type Action = {
    updateUserData : (user:object)=>void,
    resetUserData : ()=>void
}
const init_user:State={
    user:{
        quick_id:0o00,
        username:""
    }
}
const useAppStore = create<State & Action>((set) => ({
    user: {
        username:"",
        quick_id:0o00,
    },
    updateUserData:(data:object)=>set((state) => ({ user: Object.assign(state.user,data)})),
    resetUserData:()=>set((state) => ({ user: init_user.user })),
}))

export default useAppStore