import { Comment } from "./Comment";
import datos from "../../data/comments.json";
import { useEffect } from "react";
import { useCommentsStore } from "../../store/store";
import { NewComment } from "../Reply/";
import { AnimatedSection } from "../AnimatedSection";

export const CommentList = () => {
  const { data, setData, openCommentId } = useCommentsStore();

  useEffect(() => {
    // Cargar los datos iniciales desde el JSON
    if(data.length === 0){
      setData(datos.comments);
    }
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {data.map((comment) => (
        <>
          <Comment data={comment} key={comment.id} />
          {openCommentId?.includes(comment.id) && (
            <AnimatedSection>
              <NewComment isReply username={comment.user.username} data={comment} />
            </AnimatedSection>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="flex mt-4">
              {/* vertical line */}
              <div className="border-l-2 border-neutral-grey-200 mx-8" />
              {/* Responses container */}
              <div className="flex-1 flex flex-col gap-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="">
                    <Comment data={reply} />
                    {openCommentId?.includes(reply.id) && (
                      <AnimatedSection>
                        <NewComment isReply username={reply.user.username} data={reply} />
                      </AnimatedSection>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
