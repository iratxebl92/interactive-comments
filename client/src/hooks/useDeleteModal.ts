import { useEffect } from "react";
import { useCommentsStore } from "../store/store";
import type { CommentProps } from "../types/styles";


export const useDeleteModal = ({data}: {data: CommentProps}) => {
      const {
        data: storeData,
        setData,
        deleteOpenModal,
      } = useCommentsStore();

     useEffect(() => {
        if (deleteOpenModal) {
          document.body.classList.add("overflow-hidden");
        }
        //Aseguramos que al cerrar el modal se recargue bien, se le llama al desmontarse el modal. Se llama "cleanup function".
        return () => {
          document.body.classList.remove("overflow-hidden");
        };
      }, [deleteOpenModal]);

        //Función recursiva
        function deleteCommentById(
          comments: CommentProps[],
          idToDelete: string
        ): CommentProps[] {
          return comments //devuelve array de comentarios actualizada tras hacer filter y map
            .filter((comment) => comment.id !== idToDelete) // elimina el comentario con ese id en este nivel
            .map((comment) => ({
              ...comment,
              // si tiene replies, aplicamos la función recursiva
              replies: comment.replies
                ? deleteCommentById(comment.replies, idToDelete)
                : undefined,
            }));
        }
        const handleDeleteComment = () => {
          const commentsUpdated = deleteCommentById(storeData, data.id);
          setData(commentsUpdated);
        };
  return {
handleDeleteComment
  }
}
