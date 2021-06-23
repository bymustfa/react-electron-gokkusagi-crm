import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import cn from "classnames";

export default function FileUploader({ onChange, accept = "*" }) {
  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        className={cn([
          "file-uploader  rounded p-2 text-center d-flex align-items-center justify-content-center",
          isDragActive ? "bg-info text-white border-white" : "bg-light",
        ])}
        {...getRootProps()}
      >
        <input {...getInputProps()} accept={accept} />
        {isDragActive ? (
          <h4>Dosyaları buraya bırakın...</h4>
        ) : (
          <h4>
            Dosyaları buraya sürükleyip bırakın veya dosyaları seçmek için
            tıklayın
          </h4>
        )}
      </div>
    </>
  );
}
