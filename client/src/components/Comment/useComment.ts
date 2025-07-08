import { useCommentsStore } from "../../store/store";
import type { CommentProps } from "../../types/styles";

export const useComment = () => {
  const { currentUser, setData, data: StoreData } = useCommentsStore();


 const handleUpdateScore = (data: CommentProps, action: 'plus' | 'minus') => {
  const hasLiked = data?.likes?.includes(currentUser.username);
  if (hasLiked && action === 'plus') return;
  if (!hasLiked && action === 'minus') return;

  // En caso de restar, se filtra al usuario actual del array de likes
  const updateLikes = data?.likes?.filter((u) => u !== currentUser.username);

  const updateScore = StoreData.map((comment) => {
    // Si el comentario es el que coincide con el ID
    if (comment.id === data.id) {
      return {
        ...comment,
        score: action === 'plus' ? (comment.score || 0) + 1 : (comment.score || 0) - 1,
        likes: action === 'plus' 
          ? [...(comment.likes || []), currentUser.username] 
          : updateLikes
      };
    }

    // Si el ID pertenece a una respuesta dentro de replies
    if (comment.replies?.some((reply) => reply.id === data.id)) {
      return {
        ...comment,
        // Se actualiza el array de replies
        replies: comment.replies.map((reply) => {
          if (reply.id === data.id) {
            return {
              ...reply,
              score: action === 'plus' ? (reply.score || 0) + 1 : (reply.score || 0) - 1,
              likes: action === 'plus' 
                ? [...(reply.likes || []), currentUser.username] 
                : updateLikes
            };
          }
          // Si no coincide, se deja el reply igual
          return reply;
        })
      };
    }

    // Si no es el comentario ni una respuesta relacionada, se devuelve tal cual
    return comment;
  });

  // Se actualiza el estado global con la nueva estructura
  setData(updateScore);
};



  return {
    handleUpdateScore
  };
};
