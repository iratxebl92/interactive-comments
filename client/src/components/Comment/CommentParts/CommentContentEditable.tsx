import { Button } from "../../core/Button";

interface CommentContentEditableProps {
   textareaRef: React.RefObject<HTMLTextAreaElement>;
  postContent: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  handleSubmit: () => void;
  error: string;
}

export const CommentContentEditable = ({
  textareaRef,
  postContent,
  handleChange,
  handleSubmit,
  error,
}: CommentContentEditableProps) => (
  <>
    <textarea
      ref={textareaRef}
      className="border-1 h-[110px] rounded-lg w-full placeholder:text-neutral-grey-500 p-4 max-w-full resize-none overflow-hidden my-4"
      placeholder="Add a comment"
      name="reply"
      id="reply"
      required
      rows={1}
      value={postContent}
      onChange={handleChange}
    />
    <div className="flex justify-end">
      <Button
        onClick={handleSubmit}
        className="bg-primary-purple-600 disabled:bg-neutral-400 disabled:cursor-not-allowed"
        disabled={!postContent.trim()}
      >
        UPDATE
      </Button>
    </div>
    {error && (
      <div>
        <p className="text-red-700 pb-4 font-bold">{error}</p>
      </div>
    )}
  </>
);
