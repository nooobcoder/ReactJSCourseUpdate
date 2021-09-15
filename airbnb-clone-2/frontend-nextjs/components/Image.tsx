import { urlFor } from "../sanity";

const Image = ({ identifier, image }: any) => {
  return (
    <div className={identifier === "main-image" ? "main-image" : "image"}>
      <img src={urlFor(image).auto("format").toString()!} />
    </div>
  );
};

export default Image;
