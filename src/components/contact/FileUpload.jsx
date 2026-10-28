import { useState, useRef, useEffect } from "react";
import uploadImage from "../../assets/images/UploadImage.png";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const remainingSlots = Math.max(0, MAX_FILES - files.length);

    const processed = newFiles
      .filter((file) => file.size <= MAX_FILE_SIZE)
      .slice(0, remainingSlots)
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        size: file.size,
      }));

    setFiles((prev) => [...prev, ...processed]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((file) => file.id !== id);
    });
  };

  // cleanup همه previewها هنگام unmount
  useEffect(() => {
    return () => {
      files.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [files]);

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50"
      >
        <input
          type="file"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <img
          width={50}
          height={50}
          src={uploadImage}
          alt="Upload files"
          className="mx-auto mb-2"
        />

        <p className="text-gray-500">
          Drag & Drop files here or click to upload
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Max {MAX_FILES} files — 10MB each
        </p>
      </div>

      <div className="space-y-2">
        {files.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              {item.file.type.startsWith("image") && (
                <img
                  src={item.preview}
                  alt={item.file.name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}

              <div>
                <p className="text-sm font-medium">{item.file.name}</p>
                <p className="text-xs text-gray-400">
                  {(item.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={() => removeFile(item.id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// برای اجازه دادن به انتخاب چند فایل در input :

// 1)

// <input
//   type="file"
//   multiple
//   onChange={handleFileChange}
// />

// 2)
// قبلاً فقط یک فایل ذخیره می‌کردیم، اما حالا باید آرایه‌ای از فایل‌ها نگه داریم.

// const [files, setFiles] = useState([]);

// 3)

//  گرفتن همه فایل‌ها از input: در این حالت دیگر [0] نمی‌گیریم.

// const handleFileChange = (event) => {
//   const selectedFiles = Array.from(event.target.files);
//   setFiles(selectedFiles);
// };

// Array.form: event.target.files
// یک FileList است نه Array واقعی.

// یعنی بعضی متدهای جاوااسکریپت مثل map روی آن کار نمی‌کنند.

// پس تبدیلش می‌کنیم به آرایه واقعی.

// 4)

//  نمایش فایل‌ها در UI

// {files.map((file, index) => (
//   <p key={index}>{file.name}</p>
// ))}
