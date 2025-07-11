import clsx from "clsx";
import { LikeButton } from "../core/LikeButton";
import { type CommentProps } from "../../types/styles";
import { useCommentsStore } from "../../store/store";
import { DeleteModal } from "./DeleteModal";
import { useComment } from "../../hooks/useComment";
import { CommentHeader } from "./CommentParts/CommentHeader";
import { CommentContentText } from "./CommentParts/CommentContentText";
import { CommentContentEditable } from "./CommentParts/CommentContentEditable";
import { CommentActionsMobile } from "./CommentParts/CommentActionsMobile";

interface CommentPropsExtended {
  data: CommentProps;
}

export const Comment = ({ data }: CommentPropsExtended) => {
  const { currentUser, deleteOpenModal } = useCommentsStore();

  const commentHook = useComment({ data });
  if (!commentHook) return null;

  const {
    handleChange,
    handleDelete,
    handleOpenReply,
    handleSubmit,
    isOpen,
    setIsOpen,
    textareaRef,
    postContent,
    error,
    deleteComment
  } = commentHook;

  const isOwnComment = data.user.username === currentUser.username;

  return (
    <>
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

          {/* Actions móvil */}
          <CommentActionsMobile
            isOwnComment={isOwnComment}
            onDelete={() => handleDelete(data)}
            onEdit={() => setIsOpen(!isOpen)}
            onReply={() => handleOpenReply(data.id)}
          />
        </div>

        {/* Comentario y contenido */}
        <div className="order-1 sm:order-2 flex-1">
          <CommentHeader
            username={data.user.username}
            image={data.user.image.webp}
            createdAt={data.createdAt}
            isOwnComment={isOwnComment}
            onDelete={() => handleDelete(data)}
            onEdit={() => setIsOpen(!isOpen)}
            onReply={() => handleOpenReply(data.id)}
          />

          {isOpen ? (
            <CommentContentEditable
              textareaRef={textareaRef}
              postContent={postContent}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              error={error}
            />
          ) : (
            <CommentContentText content={data.content} replyingTo={data.replyingTo} />
          )}
        </div>
      </div>

      {/* Modal borrar */}
      {deleteOpenModal && deleteComment && <DeleteModal data={deleteComment} />}
    </>
  );
};

