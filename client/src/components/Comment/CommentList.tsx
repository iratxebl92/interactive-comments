import { Comment } from "./Comment"
import datos from '../../data/comments.json'


export const CommentList = () => {
  console.log(datos)
  return (
    <div className="flex flex-col gap-4">

   {
    datos.comments.map((comment) => (
      <Comment data={comment} key={comment.id} />
    ) )
   }
    </div>
  
  )
}
