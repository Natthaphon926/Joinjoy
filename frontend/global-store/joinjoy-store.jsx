import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const joinjoyStore = (set) => ({
  user: null,
  token: null,
  activities: [],
  actionLogin: async(form)=>{
        const res = await axios.post('http://localhost:3000/api/login',form)
        set({
            user:res.data.payload,
            token:res.data.token
        })
        return res
    },
    getAllActivity : async () => {
        try {
          const res = await axios.get('http://localhost:3000/api/activities')
          set({activities:res.data});
        } catch (err) {
          console.log(err);
        }
    }
});







const usePersist = {
  name: "joinjoy-store",
  storage: createJSONStorage(() => localStorage),
};

const useJoinjoyStore = create(persist(joinjoyStore, usePersist));

export default useJoinjoyStore;
