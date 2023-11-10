import { useRef, useState } from "react";
import Skeleton from "./Skeleton";

type Props = {
  src?: string;
  classNames?: string;
};

export default function Image({ src, classNames }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleLoadImage = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    const imageEle = imageRef.current as HTMLImageElement;
    imageEle.src = "https://placehold.co/100";
    setImageLoaded(true);
  };

  return (
    <>
      {!imageLoaded && <Skeleton className="w-full h-full" />}
      <img
        onLoad={handleLoadImage}
        onError={handleError}
        className={`${classNames ? classNames : ""} w-full ${
          !imageLoaded ? "hidden" : ""
        }`}
        src={src || "https://placehold.co/100"}
        ref={imageRef}
      />
    </>
  );
}
