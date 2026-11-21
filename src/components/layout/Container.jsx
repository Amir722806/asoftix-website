export default function Container({ children, className = '', narrow = false }) {
  return <div className={`container ${narrow ? 'narrow' : ''} ${className}`}>{children}</div>;
}
