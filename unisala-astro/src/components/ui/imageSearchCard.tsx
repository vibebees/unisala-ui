import React, { type ReactNode } from 'react';
import { Card as BaseCard, CardContent } from "@/components/ui/card";


interface ImageCardProps {
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
  [key: string]: any;
}

const ImageCard: React.FC<ImageCardProps> = ({ 
  children, 
  className = "", 
  draggable = false,
  onDragStart,
  onDragEnd,
  ...props 
}) => {
  return (
    <BaseCard
      className={`
        overflow-hidden
        transition-all
        duration-200
        hover:shadow-md
        ${className}
      `}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...props}
    >
      {children}
    </BaseCard>
  );
};

export default ImageCard;