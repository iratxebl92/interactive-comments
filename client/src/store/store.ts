
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { CommentProps } from '../types/styles'

interface CommentsStore {
data: CommentProps[];
setData: (data: CommentProps[]) => void;
currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string
  };
setCurrentUser: (user: any) => void;
}

export const useCommentsStore = create<CommentsStore>()(
    persist(
        (set) => ({
            data: [],
            setData: (data) => set(() => ({ data })),
            currentUser: {
                image: {
                    png: "/images/avatars/image-juliusomo.png",
                    webp: "/images/avatars/image-juliusomo.webp"
                },
                username: "juliusomo"
            },
            setCurrentUser: (user) => set(() => ({ currentUser: user }))
        }),
        {
            name: 'comments-storage', // unique name for the storage
            storage: createJSONStorage (() => localStorage) // use localStorage as the storage
        }
    )
)