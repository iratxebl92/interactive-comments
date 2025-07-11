
import { Delete, Edit, ReplyIcon } from "../../Icons";

interface CommentActionsMobileProps {
  isOwnComment: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onReply: () => void;
}

export const CommentActionsMobile = ({
  isOwnComment,
  onDelete,
  onEdit,
  onReply,
}: CommentActionsMobileProps) => {
  if (isOwnComment) {
    return (
      <div className="sm:hidden flex gap-2">
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold"
          aria-label="Delete comment"
        >
          <Delete /> <span>Delete</span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
          aria-label="Edit comment"
        >
          <Edit /> <span>Edit</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onReply}
      className="sm:hidden flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
      aria-label="Reply comment"
    >
      <ReplyIcon /> Reply
    </button>
  );
};
