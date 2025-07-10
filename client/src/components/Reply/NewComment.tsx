import clsx from "clsx";
import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import type { CommentProps } from "../../types/styles";
import { useCommentsStore } from "../../store/store";
import { Button } from "../core/Button";

export const NewComment = ({
  isReply,
  username,
  data,
}: {
  isReply?: boolean;
  username?: string;
  data?: CommentProps;
}) => {
  const id = useId();
  const {
    currentUser,
    data: storeData,
    setData,
    openCommentId,
    setOpenCommentId,
  } = useCommentsStore();
  const [postContent, setPostContent] = useState<string>(
    isReply ? `@${username} ` : ""
  );

  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      //Si ya está disponible, si textareaRef ya no es null
      const len = textareaRef.current.value.length; //length del username
      textareaRef.current.focus(); //focus en textarea
      textareaRef.current.setSelectionRange(len, len); //se coloca el cursor al final del username (start, end)
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    //Si al dar a send ha habido error, esto hace que al escribir se quite el error, sin esto se mantendría hasta volver a dar a send.
    if (error) {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (isReply) {
      // Si sólo está '@username ' sin texto añadido
      if (postContent.trim() === `@${username}` || postContent.trim() === "") {
        setError("Este campo es obligatorio.");
        return;
      }
    } else {
      if (postContent.trim() === "") {
        setError("Este campo es obligatorio.");
        return;
      }
    }

    const updateOpenIds =
      openCommentId && openCommentId.filter((comment) => comment !== data?.id);
    setOpenCommentId(updateOpenIds);
    const updateContent = username
      ? postContent.substring(postContent.indexOf(" "))
      : postContent;
    const newComment: CommentProps = {
      content: updateContent,
      createdAt: new Date().toISOString(),
      id: id,
      replyingTo: username,
      score: 0,
      user: currentUser,
    };

    if (data) {
      const prueba = storeData.map((comment) => {
        if (comment.id === data.id) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment],
          };
        }
        if (comment.replies?.some((reply) => reply.id === data.id)) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === data.id) {
                return {
                  ...reply,
                  replies: [...(reply.replies || []), newComment],
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      });

      setData(prueba);
    } else {
      setData((prev) => [...prev, newComment]); // Actualiza el estado en función del valor anterior
    }
    setPostContent("");
  };

  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row gap-4 rounded-2xl p-[27px] bg-neutral-white h-[14rem] sm:h-[13rem] md:h-[10rem] mt-4"
      )}
      data-testid="comment-container"
      aria-label="comment container"
    >
      {/* Comment content */}
      <div className="hidden md:block w-12 shrink-0">
        <img
          src="/images/avatars/image-juliusomo.webp"
          alt={`User juliusomo profile image`}
          width={"35px"}
        />
      </div>
      <div className="w-full h-full">
        <textarea
          ref={textareaRef}
          className={clsx("border-1 rounded-lg w-full placeholder:text-neutral-grey-500 p-4 max-w-full resize-none overflow-hidden", {
            "h-full": !error,
            "h-[92%]": error
          })}
          placeholder="Add a comment"
          name="reply"
          id="reply"
          required
          rows={1}
          value={postContent}
          onChange={handleChange}
        />
        {error && <p className="text-red-700 mb-4 text-center md:text-start">{error}</p>}
      </div>
      <div className="flex items-start gap-4 justify-between">
        <img
          src="/images/avatars/image-juliusomo.webp"
          alt={`User juliusomo profile image`}
          width={"35px"}
          className="md:hidden"
        />
        <Button onClick={handleSubmit} className="bg-primary-purple-600"> SEND </Button>
      </div>
    </div>
  );
};
