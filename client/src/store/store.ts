import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CommentProps } from "../types/styles";

interface CommentsStore {
  data: CommentProps[];
  setData: (data: CommentProps[] | ((prev: CommentProps[]) => CommentProps[])) => void;

  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  setCurrentUser: (user: any) => void;
  openComment: boolean;
  setOpenComment: (open: boolean) => void;
  openCommentId: string[] | null;
  setOpenCommentId: (id: string[] | null) => void;
}

export const useCommentsStore = create<CommentsStore>()(
  persist(
    (set) => ({
      data: [],
      setData: (updater) =>
        set((state) => ({
          data: typeof updater === "function" ? updater(state.data) : updater,
        })),
      currentUser: {
        image: {
          png: "/images/avatars/image-juliusomo.png",
          webp: "/images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      setCurrentUser: (user) => set(() => ({ currentUser: user })),
      openComment: false,
      setOpenComment: (open) => set(() => ({ openComment: open })),
      openCommentId: null,
      setOpenCommentId: (id) => set(() => ({ openCommentId: id })),
    }),
    {
      name: "comments-storage", // unique name for the storage
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
    }
  )
);
