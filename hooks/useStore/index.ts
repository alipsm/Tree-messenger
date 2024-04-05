import {create} from "zustand"

type State = {
    user:{
        username:string,
        quick_id:number
    }
}

type Action = {
    updateUserData : (user:object)=>void
}
const useAppStore = create<State & Action>((set) => ({
    user: {
        username:"",
        quick_id:0o00,
    },
    updateUserData:(data:object)=>set((state) => ({ user: Object.assign(state.user,data)})),
}))
// increasePopulation: () => set((state:any) => ({ bears: state.bears + 1 })),
// decreasePopulation: () => set((state:any) => ({ bears: state.bears - 1 })),
// removeAllBears: () => set({ bears: 0 }),
  export default useAppStore