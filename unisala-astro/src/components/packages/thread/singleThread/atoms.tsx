


export const Button = ({ onClick, className, fill, children }: { 
  onClick: () => void; 
  className: string; 
  fill: string; 
  children: React.ReactNode; 
}) => (
  <button className={className} onClick={onClick} style={{ fill }}>
    {children}
  </button>
)

// export const Icon = ({ icon, className }) => (
//   <Icons icon={icon} className={className} />
// )
