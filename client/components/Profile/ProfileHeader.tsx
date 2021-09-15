export default function ProfileHeader({ imageUrl, name }) {
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
}
