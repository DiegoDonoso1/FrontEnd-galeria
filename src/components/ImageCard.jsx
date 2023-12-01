import LazyLoad from "react-lazy-load";

// eslint-disable-next-line react/prop-types
export default function ImageCard({ image }) {
  // eslint-disable-next-line react/prop-types
  const fullImageUrl = `${image.imgUrl}`;

  return (
    <div className="grid gap-4">
      <LazyLoad>
        <img
          className="h-auto max-w-full rounded-lg"
          src={fullImageUrl}
          alt=""
        />
      </LazyLoad>
    </div>
  );
}
