import React from "react";
import { useDropzone } from "react-dropzone";

function DragAndDrop() {
  const [files, setFiles] = React.useState([]);

  function fileSizeValidator(file) {
    if (file.size > 1024 ** 2 * 20) {
      return {
        code: "size-too-large",
        message: `File is larger than 2mb`,
      };
    }

    return null;
  }

  const onDrop = React.useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: "image/jpeg,image/png",
      maxFiles: 2,
      validator: fileSizeValidator,
    });

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-1/2 border-dashed border-4 border-pink-400 p-40 rounded">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-xl">Drop your media files here</p>
          ) : (
            <p className="text-center text-xl">
              Drag and drop some files here, or click to select files
            </p>
          )}
        </div>
      </div>
      {files.length > 0 && (
        <button
          onClick={() => {
            const url =
              "https://api.cloudinary.com/v1_1/codebeast/image/upload";
            const formData = new FormData();
            let file = files[0];
            formData.append("file", file);
            formData.append("upload_preset", "s9n5tgkf");
            fetch(url, {
              method: "POST",
              body: formData,
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
              });
          }}
        >
          Upload
        </button>
      )}

      {files.map((f) => {
        return <img src={f.preview} />;
      })}

      {fileRejections.map(({ file, errors }) => {
        return (
          <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
              {errors.map((e) => (
                <li key={e.code}>{e.message}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </div>
  );
}

export default DragAndDrop;
