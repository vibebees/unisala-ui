import { cn } from '@/lib/utils';
import { Icon } from 'astro-icon/components';
import type { HTMLAttributes } from 'astro/types';
import { ThreadAction } from './threadAction';

interface Props extends HTMLAttributes<'div'> {
  heading: string;
  username: string;
  date: string;
  claps: number;
  comments: number;
  className?: string;
}

export const ThreadHeader = ({
  heading,
  username,
  date,
  claps,
  comments,
  className
}: Props) => {
  return (
    <div className={cn('space-y-4', className)} >
      <h1 className='font-heading text-4xl mb-4 leading-tight'>{heading}</h1>
      <div className='flex items-center space-x-4 text-sm mb-6'>
        <span className='font-medium'>@{username}</span>
        <button className='text-green-600 hover:text-green-700 font-large'>
          Follow
        </button>
      </div>
      <div className='text-gray-500 text-sm'>{date}</div>

      <ThreadAction
        heading={heading}
        username={username}
        date={date}
        claps={claps}
        comments={comments}
        showBorder={true}
      />
    </div>
  );
};
