import { create } from "zustand";
import axios from "@/utils/axios";

interface notes {
  notes: noteItem[];
  note: noteItem | null;
  fetchNotes: () => void;
  fetchNote: (id: string | string[]) => void;
  addNote: (note: noteItem) => void;
  deleteNote: (id: string | string[]) => void;
  editNote: (note: noteItem) => void;
  loading: boolean;
}

interface noteItem {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

const useNotesStore = create<notes>((set) => ({
  notes: [],
  note: null,
  loading: true,
  fetchNotes: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("api/notes");
      if (response.data.status !== 400) {
        set({ notes: response.data.data });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  fetchNote: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`api/notes/${id}`);
      if (response.data.status !== 400) {
        set({ note: response.data.data });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  addNote: async (note) => {
    set({ loading: true });
    try {
      const response = await axios.post("api/notes", note);
      if (response.data.status !== 400) {
        set((state) => ({ notes: [...state.notes, response.data.data] }));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  deleteNote: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.delete(`api/notes/${id}`);
      if (response.data.status !== 400) {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  editNote: async (note) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`api/notes/${note.id}`, note);
      if (response.data.status !== 400) {
        set((state) => ({
          note: response.data.data,
        }));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useNotesStore;
