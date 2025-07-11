import { useEffect } from "react"
import { useCommentsStore } from "../../store/store"
import { Button } from "../core/Button"
import type { CommentProps } from "../../types/styles"

export const DeleteModal = ({data}: {data: CommentProps}) => {
  const {data:storeData, setData, deleteOpenModal,setDeleteOpenModal} = useCommentsStore()
console.log(data, "data en delete")
  useEffect(() => {
    if(deleteOpenModal){
      document.body.classList.add('overflow-hidden');
    } 
    //Aseguramos que al cerrar el modal se recargue bien, se le llama al desmontarse el modal. Se llama "cleanup function".
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [deleteOpenModal])

  //Función recursiva
function deleteCommentById(comments: CommentProps[], idToDelete: string): CommentProps[] {
  return comments //devuelve array de comentarios actualizada tras hacer filter y map
    .filter(comment => comment.id !== idToDelete) // elimina el comentario con ese id en este nivel
    .map(comment => ({
      ...comment,
      // si tiene replies, aplicamos la función recursiva
      replies: comment.replies ? deleteCommentById(comment.replies, idToDelete) : undefined
    }));
}
const handleDeleteComment = () => {
  const commentsUpdated = deleteCommentById(storeData, data.id);
  console.log(commentsUpdated);
  // actualizar el estado con newComments
  setData(commentsUpdated)
}
  return (
    <>
    <div className=" fixed inset-0 z-40  bg-gray-400/20">
        <div className="absolute inset-0 z-50 transition duration-300 ease-in-out m-auto space-y-2 h-[14rem] w-[400px] p-5 rounded-3xl content-center text-start leading-7 shadow-xl bg-neutral-white">
          <p className="text-neutral-grey-800 font-bold text-xl">Delete comment</p>
          <p className="text-neutral-500 leading-6">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="flex justify-around mt-4">
            <Button className="bg-neutral-grey-800" onClick={() => setDeleteOpenModal(false)}> NO, CANCEL </Button>
            <Button className="bg-primary-pink-400" onClick={handleDeleteComment}> YES, DELETE </Button>

          </div>
        </div>
    </div>
    </>
  )
}
