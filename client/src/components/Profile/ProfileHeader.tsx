interface Props {
  imageUrl?: string;
  name: string;
}

export default function ProfileHeader({ imageUrl, name }: Props) {
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
}
