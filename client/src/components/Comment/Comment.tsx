import clsx from "clsx";
import { Reply } from "../Icons/Reply";
import { LikeButton } from "./LikeButton";
import { Delete } from "../Icons/Delete";
import { Edit } from "../Icons/Edit";
import {type CommentProps } from "../../types/styles";
import { useCommentsStore } from "../../store/store";



export const Comment = ({data}: {data:CommentProps}) => {

  const {currentUser} = useCommentsStore();
  if (!data.user) {
   
    return null; // or handle the error as needed
  }
  return (
    <>
      {/* Comment container */}
      <div
        className={clsx(
          "flex flex-col sm:flex-row gap-4 rounded-2xl p-4 bg-neutral-white"
        )}
        data-testid="comment-container"
        aria-label="comment container"
      >
        {/* Like Button with responsive order */}
        <div
          className="order-2 sm:order-1 shrink-0 flex justify-between sm:flex-col sm:items-center"
          data-testid="like-button-container"
          aria-label="like button container"
        >
          <LikeButton data={data} /> 
          {/* Reply button (mobile only) */}
          {
           data.user.username === currentUser.username ? (
              <div className="sm:hidden flex gap-2">
                <button className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold">
                  <Delete/> <span>Delete</span>
                </button>
                <button className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold">
                  <Edit/> <span>Edit</span>
                </button>
              </div>
            ) :          
            <button className="mt-4 sm:hidden flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold">
            <Reply /> Reply
          </button>
          }
 
        </div>

        {/* Comment content */}
        <div className="order-1 sm:order-2 flex-1">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img
                src={data.user.image.webp}
                alt={`User ${data.user.username} profile image`}
                width={"35px"}
              />
              <p className="text-neutral-grey-800 font-semibold">
                {data.user.username}
              </p>
              <p className="text-neutral-grey-500">{data.createdAt}</p>
              {
                data.user.username === currentUser.username && (
                  <span className="bg-primary-purple-600 px-2 text-neutral-50 font-bold rounded-md">you</span>
                )
              }            
              </div>
              {
                 data.user.username === currentUser.username ? (
                  <div className="hidden md:flex gap-2">
                  <button className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold">
                    <Delete/> <span>Delete</span>
                  </button>
                  <button className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold">
                    <Edit/> <span>Edit</span>
                  </button>
                  </div>
                )
                  :

            <button className="hidden md:flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold">
              <Reply /> Reply
            </button>
              }
          </div>

          {/* Comment text */}
          <p className="text-neutral-grey-500 mt-2"> {data.replyingTo && <span className="font-bold text-primary-purple-600">{`@${data.replyingTo}`}</span>}  {data.content}</p>
        </div>
      </div>

      {/* Replies */}
      {data.replies && data.replies.length > 0 && (
        <div className="flex mt-4">
          {/* vertical line */}
          <div className="border-l-2 border-neutral-grey-200 mx-8" />
          {/* Responses container */}
          <div className="flex-1 flex flex-col gap-4">
            {data.replies.map((reply) => (
              <div key={reply.id} className="flex justify-end">
                <Comment data={reply} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
