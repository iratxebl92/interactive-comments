interface CommentContentTextProps {
  content: string;
  replyingTo?: string;
}

export const CommentContentText = ({ content, replyingTo }: CommentContentTextProps) => (
  <p className="text-neutral-grey-500 mt-2">
    {replyingTo && <span className="font-bold text-primary-purple-600">{`@${replyingTo} `}</span>}
    {content}
  </p>
);
