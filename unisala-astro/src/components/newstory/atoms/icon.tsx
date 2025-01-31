interface IconProps {
    icon: React.ElementType;
    className?: string;
  }

   const Icon: React.FC<IconProps> = ({ icon: IconComponent, className }) => (
    <IconComponent className={className} />
  );

  export default Icon;