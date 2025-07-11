import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCommentsStore } from "../store/store";
import type { CommentProps } from "../types/styles";


export const useNewComment = ({isReply,
  username,
  data}: {
    isReply?: boolean;
    username?: string;
    data?: CommentProps;
  }) => {
     const {
        currentUser,
        data: storeData,
        setData,
        openCommentId,
        setOpenCommentId,
      } = useCommentsStore();

       const [postContent, setPostContent] = useState<string>(
          isReply ? `@${username} ` : "")
      
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
            id: Math.floor(Math.random() * 100).toString(),
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
      
  return {
handleChange,
handleSubmit,
textareaRef,
error,
postContent
  }
}
