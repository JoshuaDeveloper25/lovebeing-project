import ButtonForm from "./ButtonForm";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { useState } from "react";

const ImagesHandleCrop = ({
  imgRef,
  isPending,
  previewCanvasRef,
  setCrop,
  crop,
  circle,
}) => {
  
  const [imgSrc, setImgSrc] = useState();
  const [error, setError] = useState("");

  const MIN_DIMENSION = circle ? 200 : 250;
  const ASPECT_RATIO = circle ? 1 : 10 / 3.5;

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <div>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          name="uploadImages"
          accept="png, jpeg"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop={circle ? true : false}
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            keepSelection
            crop={crop}
          >
            <img
              loading="lazy"
              decoding="async"
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <ButtonForm
            isPending={isPending}
            statusOff={"Save Changes"}
            statusOn={"Saving Changes..."}
          />
        </div>
      )}

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
};

export default ImagesHandleCrop;


// w384 x h256