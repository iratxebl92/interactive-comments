export type CommentProps = {
  id: string;
  createdAt: string;
  score: number;
  content: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies?: CommentProps[],
  replyingTo?: string; 
  likes?: string[] ;
  dislikes?: string[];
};