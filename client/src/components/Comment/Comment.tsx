 import clsx from "clsx";
import { MinusIcon, PlusIcon } from "../Icons";
import { Reply } from '../Icons/Reply';

type CommentProps = {
  id: number;
  createdAt: string;
  score: number;
  content: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
    replies?: ReplyProps[];
  };
}
type ReplyProps = CommentProps & {  
  replyingTo: string;
}
export const Comment = ({data} : {data: CommentProps} ) => {
  console.log(data)

  return (
    <>
      {/* Comment container */}
      <div
        className={clsx("flex items-start min-w-[18rem] md:min-w-[45rem] min-h-[10rem] gap-[25px]  rounded-2xl xs:w-[30rem] p-4 bg-neutral-white", {

        })}
        data-testid="comment-container"
        aria-label="comment container"
      >
        {/* Like Button Container */}
        <div
          className="h-[6rem] w-8 bg-neutral-grey-200 flex flex-col shrink-0  justify-center items-center rounded-md"
          data-testid="like-button-container"
          aria-label="like button container"
        >
          <button
            className="bg-transparent border-0 cursor-pointer h-8"
            aria-label="like button"
          >
            <PlusIcon />
          </button>
          <p
            className=" text-xl font-semibold my-[8px] cursor-default"
            role="status"
          >
            {data.score}
          </p>
          <button
            className="bg-transparent border-0 cursor-pointer h-8"
            aria-label="dislike button"
          >
            <MinusIcon />
          </button>
        </div>
        {/* Content Container */}
        <div>
          {/* Comment header*/}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img src={data.user.image.webp} alt={`User ${data.user.username} profile image`} width={'35px'} />
              <p className="text-neutral-grey-800 font-semibold">{data.user.username}</p>
              <p className="text-neutral-grey-500"> {data.createdAt} </p>
            </div>
            <button className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer">
              <Reply/> Reply </button>
          </div>
          {/* Comment text */}
          <div>
            <p className="text-neutral-grey-500">{data.content} </p>
          </div>

        </div>
      </div>
    </>
  );
};