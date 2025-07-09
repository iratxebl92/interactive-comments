import clsx from "clsx";
import { ReplyIcon } from "../Icons/ReplyIcon";
import { LikeButton } from "./LikeButton";
import { Delete } from "../Icons/Delete";
import { Edit } from "../Icons/Edit";
import { type CommentProps } from "../../types/styles";
import { useCommentsStore } from "../../store/store";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useEffect, useRef, useState, type ChangeEvent } from "react";


TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export const Comment = ({ data }: { data: CommentProps }) => {
  const { currentUser, openCommentId, setOpenCommentId, data: storeData, setData } = useCommentsStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      //Si ya está disponible, si textareaRef ya no es null
      const len = textareaRef.current.value.length; //length del username
      textareaRef.current.focus(); //focus en textarea
      textareaRef.current.setSelectionRange(len, len); //se coloca el cursor al final del username (start, end)
    }
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState<string>(data.content);
  const [error, setError] = useState("");
  if (!data.user) {
    return null;
  }
  const handleOpenReply = (id: string) => {
    if (openCommentId?.includes(id)) {
      const updateOpenIds = openCommentId.filter((comment) => comment !== id);
      setOpenCommentId(updateOpenIds);
    } else {
      setOpenCommentId([...(openCommentId || []), id]);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    //Si al dar a send ha habido error, esto hace que al escribir se quite el error, sin esto se mantendría hasta volver a dar a send.
    if (error) {
      setError("");
    }
  };
  const handleSubmit = () => {
    console.log(data, "DATA")
    
    // const updateComment = [
    //   ...data,
    //   data.content: postContent
    // ]

    const UpdateComment = storeData.map((comment) => {
         if (comment.id === data.id) {
          return {
            ...comment,
            content: postContent
          };
        }
         if (comment.replies?.some((reply) => reply.id === data.id)) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === data.id) {
                return {
                  ...reply,
                  content: postContent
                };
              }
              return reply;
            }),
          };
        }
        return comment;
    })
    setData(UpdateComment)
    setIsOpen(false)
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
          {data.user.username === currentUser.username ? (
            <div className="sm:hidden flex gap-2">
              <button className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold">
                <Delete /> <span>Delete</span>
              </button>
              <button className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold">
                <Edit /> <span>Edit</span>
              </button>
            </div>
          ) : (
            <button
              className="mt-4 sm:hidden flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
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
              <p className="text-neutral-grey-500">
                <p>{timeAgo.format(new Date(data.createdAt))}</p>
              </p>
              {data.user.username === currentUser.username && (
                <span className="bg-primary-purple-600 px-2 text-neutral-50 font-bold rounded-md">
                  you
                </span>
              )}
            </div>
            {data.user.username === currentUser.username ? (
              <div className="hidden md:flex gap-2">
                <button className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold">
                  <Delete /> <span>Delete</span>
                </button>
                <button
                  className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
                  onClick={() => setIsOpen(true)}
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
                className="border-1 h-[110px] rounded-lg w-full placeholder:text-neutral-grey-500 p-4 max-w-full resize-none overflow-hidden"
                placeholder="Add a comment"
                name="reply"
                id="reply"
                required
                rows={1}
                value={postContent}
                onChange={handleChange}
              />
              <div className="flex justify-end">

               <button
          className="bg-primary-purple-600 text-white font-bold px-4 py-2 rounded-md hover:bg-primary-purple-700 transition duration-300 ease-in-out hover:cursor-pointer"
          onClick={handleSubmit}
        >UPDATE</button>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
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
    </>
  );
};
