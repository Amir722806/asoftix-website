import { Link } from 'react-router-dom';
import Icon from './Icon';

// Renders a router Link, an external <a>, or a <button>, all with the same styling.
export default function Button({ to, href, variant = 'primary', size, icon, children, className = '', ...rest }) {
  const cls = `btn btn-${variant}${size ? ` btn-${size}` : ''} ${className}`;
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return <button className={cls} {...rest}>{content}</button>;
}
