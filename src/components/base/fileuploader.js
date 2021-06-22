import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader({ onChange }) {
  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        className="file-uploader bg-light rounded p-2 text-center d-flex align-items-center justify-content-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <h4>Dosyaları buraya bırakın...</h4>
        ) : (
          <h4>
            Bazı dosyaları buraya sürükleyip bırakın veya dosyaları seçmek için
            tıklayın
          </h4>
        )}
      </div>
    </>
  );
}
