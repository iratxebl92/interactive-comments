import clsx from "clsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { LikeButton } from "../core/LikeButton";
import { Delete, Edit, ReplyIcon } from "../Icons/";
import { type CommentProps } from "../../types/styles";
import { useCommentsStore } from "../../store/store";
import { Button } from "../core/Button";
import { DeleteModal } from "./DeleteModal";
import { useComment } from "../../hooks/useComment";


TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export const Comment = ({ data }: { data: CommentProps }) => {
    const { currentUser, deleteOpenModal } = useCommentsStore();

 const {
  handleChange = () => {},
  handleDelete = () => {},
  handleOpenReply = () => {},
  handleSubmit = () => {},
  isOpen = false,
  setIsOpen = () => {},
  textareaRef = null,
  postContent = "",
  error = "",
  deleteComment = undefined
} = useComment({data}) || {};

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
          {data.user.username === currentUser.username ? (
            <div className="sm:hidden flex gap-2">
              <button className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold"
              onClick={() => handleDelete(data)}
              >
                <Delete /> <span>Delete</span>
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold">
                <Edit /> <span>Edit</span>
              </button>
            </div>
          ) : (
            <button
              className="sm:hidden flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
              onClick={() => handleOpenReply(data.id)}
            >
              <ReplyIcon /> Reply
            </button>
          )}
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
              
                <p className="text-neutral-grey-500">{timeAgo.format(new Date(data.createdAt))}</p>
              
              {data.user.username === currentUser.username && (
                <span className="bg-primary-purple-600 px-2 text-neutral-50 font-bold rounded-md">
                  you
                </span>
              )}
            </div>
            {data.user.username === currentUser.username ? (
              <div className="hidden md:flex gap-2">
                <button className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold"
                onClick={() => handleDelete(data)}
                >
                  <Delete /> <span>Delete</span>
                </button>
                <button
                  className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Edit /> <span>Edit</span>
                </button>
              </div>
            ) : (
              <button
                className="hidden md:flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
                onClick={() => handleOpenReply(data.id)}
              >
                <ReplyIcon /> Reply
              </button>
            )}
          </div>

          {isOpen ? (
            <>
              <textarea
                ref={textareaRef}
                className="border-1 h-[110px] rounded-lg w-full placeholder:text-neutral-grey-500 p-4 max-w-full resize-none overflow-hidden my-4"
                placeholder="Add a comment"
                name="reply"
                id="reply"
                required
                rows={1}
                value={postContent}
                onChange={handleChange}
              />
              <div className="flex justify-end">

               <Button onClick={handleSubmit} className="bg-primary-purple-600 disabled:bg-neutral-400 disabled:cursor-not-allowed "  disabled={!postContent.trim()}> UPDATE </Button>
              </div>
              {error && 
              <div className="">
                <p className="text-red-700 pb-4 font-bold">{error}</p>
              </div>
              }
            </>
          ) : (
            <p className="text-neutral-grey-500 mt-2">
              {" "}
              {data.replyingTo && (
                <span className="font-bold text-primary-purple-600">{`@${data.replyingTo}`}</span>
              )}{" "}
              {data.content}
            </p>
          )}
          {/* Comment text */}
        </div>
      </div>
      {deleteOpenModal && deleteComment && <DeleteModal data={deleteComment} />}
    </>
  );
};
