import clsx from "clsx";

export const Reply = () => {
  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row gap-4 rounded-2xl p-[27px] bg-neutral-white h-[14rem] sm:h-[10rem] mt-4"
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
          className="border-1 h-full rounded-lg w-full placeholder:text-neutral-grey-500 p-4 max-w-full resize-none overflow-hidden"
          placeholder="Add a comment"
          name="reply"
          id="reply"
          autoFocus
          required
          rows={1}
        />
      </div>
      <div className="flex items-start gap-4 justify-between">
        <img
          src="/images/avatars/image-juliusomo.webp"
          alt={`User juliusomo profile image`}
          width={"35px"}
          className="md:hidden"
        />
        <button className="bg-primary-purple-600 text-white font-bold px-4 py-2 rounded-md hover:bg-primary-purple-700 transition duration-300 ease-in-out hover:cursor-pointer">
          SEND
        </button>
      </div>
    </div>
  );
};
