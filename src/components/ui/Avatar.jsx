export default function Avatar({ person, size = 'lg' }) {
  return person.photo ? (
    <img className={`avatar avatar-${size} avatar-photo`} src={person.photo} alt={`Photo of ${person.name}`} width="140" height="140" />
  ) : (
    <div className={`avatar avatar-${size}`} aria-hidden="true">{person.initials}</div>
  );
}
