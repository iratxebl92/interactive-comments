import { CommentList, NewComment } from "../components/Comment"

export const Home = () => {
  return (
 
    <div className="p-2 w-[calc(100vw-20px)] md:w-[45rem] mt-4">
    <CommentList/>
    <NewComment/>
    </div>
  )
}
