import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const joinjoyStore = (set) => ({
  user: null,
  token: null,
  activities: [],
  participants: [],
  participantLoading: false,
  participantError: null,
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:3000/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getAllActivity: async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/activities");
      set({ activities: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getAllParticipants: async (token) => {
    
    if (!token) return;

    set({ participantLoading: true, participantError: null });
    try {
      const res = await axios.get("http://localhost:3000/api/participants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ participants: res.data, participantLoading: false });
    } catch (error) {
      set({
        participantError: error.message,
        participantLoading: false,
      });
    }
  },
});

const usePersist = {
  name: "joinjoy-store",
  storage: createJSONStorage(() => localStorage),
};

const useJoinjoyStore = create(persist(joinjoyStore, usePersist));

export default useJoinjoyStore;
