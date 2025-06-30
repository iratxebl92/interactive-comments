import { MinusIcon, PlusIcon } from "../Icons";


export const Comment = () => {
  return (<>
  
    <div className="flex min-w-[22rem] min-h-[10rem] gap-[25px]  rounded-2xl xs:w-[30rem] sm:w-[35rem] p-4 bg-neutral-50"  data-testid="comment-container" aria-label="comment container">
      <div className="h-[6rem] bg-neutral-grey-200 flex flex-col justify-center items-center w-10 rounded-md"  data-testid="like-button-container" aria-label="like button container">
        <button className="bg-transparent border-0 cursor-pointer h-8" aria-label="like button">
          <PlusIcon/>
        </button>
        <p className=" text-2xl font-semibold my-[8px] cursor-default" role="status">13 </p>
        <button className="bg-transparent border-0 cursor-pointer h-8" aria-label="dislike button">
          <MinusIcon/>
        </button>
      </div>
    </div>
  </>
  );
};
