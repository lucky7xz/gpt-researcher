import Image from "next/image";
import { FC, useRef } from "react";
import TypeAnimation from "./TypeAnimation";

type TInputAreaProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (query: string) => void;
  handleSecondary?: (query: string) => void;
  disabled?: boolean;
  reset?: () => void;
};

const InputArea: FC<TInputAreaProps> = ({
  promptValue,
  setPromptValue,
  handleSubmit,
  handleSecondary,
  disabled,
  reset,
}) => {
  const placeholder = handleSecondary
    ? "Follow up questions..."
    : "What would you like to research next?";

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '3em'; // Reset to base height
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return; // Allow new line on Shift+Enter
      } else {
        e.preventDefault();
        if (!disabled) {
          if (reset) reset();
          handleSubmit(promptValue);
          setPromptValue(''); // Clear prompt value
          resetHeight(); // Reset height after submit
        }
      }
    }
  };

  return (
    <form
      className="mx-auto flex pt-2 pb-2 w-full items-center justify-between rounded-lg border bg-white px-3 shadow-[2px_2px_38px_0px_rgba(0,0,0,0.25),0px_-2px_4px_0px_rgba(0,0,0,0.25)_inset,1px_2px_4px_0px_rgba(0,0,0,0.25)_inset]"
      onSubmit={(e) => {
        e.preventDefault();
        if (reset) reset();
        handleSubmit(promptValue);
        setPromptValue(''); // Clear prompt value
        resetHeight();
      }}
    >
      {handleSecondary && (
        <div
          role="button"
          aria-disabled={disabled}
          className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[3px] bg-[linear-gradient(154deg,#1B1B16_23.37%,#565646_91.91%)] disabled:pointer-events-none disabled:opacity-75"
          onClick={(e) => {
            if (!disabled) {
              e.preventDefault();
              if (reset) reset();
              handleSecondary(promptValue);
              setPromptValue(''); // Clear prompt value
              resetHeight();
            }
          }}
        >
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <TypeAnimation />
            </div>
          )}

          <Image
            unoptimized
            src={"/img/search.svg"}
            alt="search"
            width={24}
            height={24}
            className={disabled ? "invisible" : ""}
          />
        </div>
      )}

      <textarea
        placeholder={placeholder}
        ref={textareaRef}
        className="focus-visible::outline-0 my-1 w-full pl-5 font-light not-italic leading-[normal] 
        text-[#1B1B16]/30 text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0 
        sm:text-xl min-h-[3em] resize-none overflow-hidden"
        disabled={disabled}
        value={promptValue}
        required
        rows={2}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          // e.target.style.height = 'auto'; // Reset height to auto to allow shrinking
          e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height
          setPromptValue(e.target.value);
        }}
      />
      <button
        disabled={disabled}
        type="submit"
        className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[3px] bg-[linear-gradient(154deg,#1B1B16_23.37%,#565646_91.91%)] disabled:pointer-events-none disabled:opacity-75"
      >
        {disabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <TypeAnimation />
          </div>
        )}

        <Image
          unoptimized
          src={"/img/arrow-narrow-right.svg"}
          alt="search"
          width={24}
          height={24}
          className={disabled ? "invisible" : ""}
        />
      </button>
    </form>
  );
};

export default InputArea;
