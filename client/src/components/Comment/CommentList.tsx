import { Comment } from "./Comment"
import datos from '../../data/comments.json'
import { useEffect } from "react"
import { useCommentsStore } from '../../store/store';


export const CommentList = () => {
  const { data, setData} = useCommentsStore()

  useEffect(() => {
    // Cargar los datos iniciales desde el JSON
    setData(datos.comments);
    
  }, [])
  return (
    <div className="flex flex-col gap-4">

   {
    data.map((comment) => (
      <>
      <Comment data={comment} key={comment.id}  />
      </>
    ) )
   }
    </div>
  
  )
}
