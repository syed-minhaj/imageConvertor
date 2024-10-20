interface AlertProps {
    variant?: 'default' | 'destructive';
    children: React.ReactNode;
    className?: string;
}
  
const Alert: React.FC<AlertProps> = ({ variant = 'default', children , className }) => (
  
    <div className={`border px-4 py-3 rounded relative ${variant === 'destructive' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-400 text-blue-700'} ${className}`} role="alert">
      {children}
    </div>
);

export default Alert;