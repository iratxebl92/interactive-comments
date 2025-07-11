import { MinusIcon, PlusIcon } from "../Icons";

import { type CommentProps } from "../../types/styles";

import { useLikeButton } from "../../hooks/useLikeButton";


export const LikeButton = ({ data }: { data: CommentProps }) => {
  
  const { handleUpdateScore } = useLikeButton();

  

 
  return (
    <div className="bg-neutral-grey-50 shrink-0 h-10 sm:h-[7rem] w-auto sm:w-10 flex flex-row justify-between sm:flex-col sm:justify-center items-center rounded-md gap-3.5 p-4">
      <button
        className="bg-transparent border-0 cursor-pointer h-8 "
        aria-label="like button"
        onClick={() => handleUpdateScore(data, "plus")}
      >
        <PlusIcon />
      </button>
      <p
        className=" text-xl font-semibold my-[8px] cursor-default text-primary-purple-600"
        role="status"
      >
        {data.score}
      </p>
      <button
        className="bg-transparent border-0 cursor-pointer h-8 "
        aria-label="dislike button"
        onClick={() => handleUpdateScore(data, "minus")}
      >
        <MinusIcon />
      </button>
    </div>
  );
};
