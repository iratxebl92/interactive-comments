import { CommentList } from "../components/Comment"
import { Reply } from "../components/Reply"

export const Home = () => {
  return (
    <div className="p-2 w-[calc(100vw-20px)] md:w-[45rem]">
    <CommentList/>
    <Reply/>
    </div>
  )
}
