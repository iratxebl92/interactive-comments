import clsx from "clsx";
import type { CommentProps } from "../../types/styles";
import { Button } from "../core/Button";
import { useNewComment } from "../../hooks/useNewComment";

export const NewComment = ({
  isReply,
  username,
  data,
}: {
  isReply?: boolean;
  username?: string;
  data?: CommentProps;
}) => {

const {handleChange, handleSubmit, textareaRef, error,
postContent} = useNewComment({ isReply,
  username,
  data})

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
