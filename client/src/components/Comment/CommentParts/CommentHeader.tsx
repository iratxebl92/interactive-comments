import { Delete, Edit, ReplyIcon } from "../../Icons";


interface CommentHeaderProps {
  username: string;
  image: string;
  createdAt: string;
  isOwnComment: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onReply: () => void;
}

export const CommentHeader = ({
  username,
  image,
  createdAt,
  isOwnComment,
  onDelete,
  onEdit,
  onReply,
}: CommentHeaderProps) => {
  const timeAgo = new Date(createdAt);
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <img src={image} alt={`User ${username} profile image`} width={35} />
        <p className="text-neutral-grey-800 font-semibold">{username}</p>
        <p className="text-neutral-grey-500">{timeAgo.toLocaleDateString()}</p>
        {isOwnComment && (
          <span className="bg-primary-purple-600 px-2 text-neutral-50 font-bold rounded-md">
            you
          </span>
        )}
      </div>

      {/* Desktop actions */}
      <div className="hidden md:flex gap-2">
        {isOwnComment ? (
          <>
            <button
              className="flex items-center gap-1 text-primary-pink-400 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-pink-200 hover:cursor-pointer font-bold"
              onClick={onDelete}
              aria-label="Delete comment"
            >
              <Delete /> <span>Delete</span>
            </button>
            <button
              className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
              onClick={onEdit}
              aria-label="Edit comment"
            >
              <Edit /> <span>Edit</span>
            </button>
          </>
        ) : (
          <button
            className="flex items-center gap-1 text-primary-purple-600 rounded-sm p-1 transition duration-300 ease-in-out hover:text-primary-purple-200 hover:cursor-pointer font-bold"
            onClick={onReply}
            aria-label="Reply comment"
          >
            <ReplyIcon /> Reply
          </button>
        )}
      </div>
    </div>
  );
};
