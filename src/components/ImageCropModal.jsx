"use client";

import { getCroppedImg } from "@/lib/helper";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";


export const ImageCropModal = ({
  imageSrc,
  open,
  onClose,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteHandler = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedBlob);
    } catch (err) {
      console.error("Crop error:", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-5">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-rose-500 transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Adjust & Crop Image
        </h2>

        {/* Cropper */}
        {imageSrc && (
          <div className="relative w-full h-80 bg-black rounded-lg overflow-hidden mb-4">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropCompleteHandler}
            />
          </div>
        )}

        {/* Zoom Slider */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1 text-center">
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-400 rounded-lg hover:opacity-90 transition"
          >
            Save Crop
          </button>
        </div>
      </div>
    </div>
  );
};
