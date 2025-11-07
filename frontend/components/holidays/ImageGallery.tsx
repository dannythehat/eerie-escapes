'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        <div
          className="relative h-96 md:h-[600px] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={images[selectedImage]}
            alt={`${title} - Image ${selectedImage + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`relative h-44 md:h-[290px] rounded-lg overflow-hidden cursor-pointer border-4 transition-all duration-300 ${
                selectedImage === index
                  ? 'border-red-500 scale-95'
                  : 'border-transparent hover:border-red-500/50'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    +{images.length - 4} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
            onClick={() => setIsModalOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            className="absolute left-4 text-white hover:text-red-500 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            className="relative w-full max-w-6xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage]}
              alt={`${title} - Image ${selectedImage + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            className="absolute right-4 text-white hover:text-red-500 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
