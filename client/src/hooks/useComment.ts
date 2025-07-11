import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCommentsStore } from "../store/store";
import type { CommentProps } from "../types/styles";

export const useComment = ({data}: {data: CommentProps}) => {
  const { currentUser, openCommentId, setOpenCommentId, data: storeData, setData, deleteOpenModal, setDeleteOpenModal } = useCommentsStore();
   
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

useEffect(() => {
  if (isOpen) {
    setPostContent(data.content);
  }
}, [isOpen, data.content]);

const [deleteComment, setDeleteComment] = useState<CommentProps | undefined>(undefined)
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
        if (!postContent.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }
  
     const UpdateComment = storeData.map((comment) => {
    // Si es un comentario raíz
    if (comment.id === data.id) {
      return {
        ...comment,
        content: postContent,
      };
    }
  
    // Si es una respuesta de primer nivel
    if (comment.replies?.some((reply) => reply.id === data.id)) {
      return {
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === data.id
            ? { ...reply, content: postContent }
            : reply
        ),
      };
    }
  
    // Si es una subrespuesta
    if (comment.replies?.some((reply) =>
      reply.replies?.some((subReply) => subReply.id === data.id)
    )) {
      return {
        ...comment,
        replies: comment.replies.map((reply) => ({
          ...reply,
          replies: reply.replies?.map((subReply) =>
            subReply.id === data.id
              ? { ...subReply, content: postContent }
              : subReply
          ),
        })),
      };
    }
  
    return comment;
  });
  
      setData(UpdateComment)
      setIsOpen(false)
      setPostContent('')
    }
  const handleDelete = (data: CommentProps) => {
    setDeleteComment(data)
    setDeleteOpenModal(true)
  }

    return {
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
  }
}
