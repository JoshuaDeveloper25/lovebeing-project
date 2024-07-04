import { IoCloudUploadSharp } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import ReactImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import React from "react";

const ImagesHandle = ({ setImages, images }) => {
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    console.log(imageList);
  };

  return (
    <ReactImageUploading
      acceptType={["jpg", "jpeg"]}
      multiple={true}
      onChange={onChange}
      value={images}
    >
      {({
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="upload__image-wrapper">
          <div className="mb-5">
            <button
              {...dragProps}
              type="button"
              onClick={onImageUpload}
              className="w-full bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
            >
              <IoCloudUploadSharp size={35} />
              {isDragging ? "Drop it here" : "Upload file"}
            </button>
          </div>

          {images?.length !== 0 && (
            <ul className="flex gap-5 overflow-x-auto w-full max-w-lg my-5 py-5">
              {images?.map((item, idx) => (
                <li key={idx} className="h-32 min-w-32 relative">
                  <div className="h-32 min-w-32 relative">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={`${item?.dataURL}`}
                      alt="Image"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="image-item__btn-wrapper absolute flex gap-2 -right-3 -top-3">
                    <button
                      className="bg-blue-500/85 hover:bg-blue-500/90 hover:text-secondary rounded-full text-white p-1"
                      type="button"
                      onClick={() => onImageUpdate(idx)}
                    >
                      <LuPencilLine size={20} />
                    </button>
                    <button
                      className="hover:bg-red-500/90 hover:text-secondary bg-red-500/85 rounded-full text-white p-1"
                      type="button"
                      onClick={() => onImageRemove(idx)}
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </ReactImageUploading>
  );
};

export default ImagesHandle;
