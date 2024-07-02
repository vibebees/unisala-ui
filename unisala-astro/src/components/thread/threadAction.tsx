import React from 'react'; // Ensure React is imported for JSX processing


type Props = {
  heading: string;
  username: string;
  date: string;
  claps: number;
  comments: number;
  className?: string;
  showBorder?: boolean;
};

export const ThreadAction = ({
  heading,
  username,
  date,
  claps,
  comments,
  className,
  showBorder
}: Props) => {
  return (
    <div >
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 hover:text-gray-700">
          {/* <Icon name="lucide:heart" class="size-5" /> */}
          <span>{claps}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-gray-700">
          {/* <Icon name="lucide:message-circle" class="size-5" /> */}
          <span>{comments}</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:text-gray-700">
          {/* <Icon name="lucide:bookmark" class="size-5" /> */}
        </button>
        <button className="hover:text-gray-700">
          {/* <Icon name="lucide:share" class="size-5" /> */}
        </button>
      </div>
    </div>
  );
}
