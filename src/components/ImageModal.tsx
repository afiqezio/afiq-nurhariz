import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useRef, MouseEvent } from "react";
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ url: string; caption: string }>;
  currentIndex: number;
}

const ImageModal = ({ isOpen, onClose, images, currentIndex }: ImageModalProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const startPosition = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
    if (scale <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (scale > 1) {
      isDragging.current = true;
      startPosition.current = { x: e.clientX, y: e.clientY };
      lastPosition.current = position;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current && scale > 1) {
      const deltaX = e.clientX - startPosition.current.x;
      const deltaY = e.clientY - startPosition.current.y;
      
      setPosition({
        x: lastPosition.current.x + deltaX,
        y: lastPosition.current.y + deltaY,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : images.length - 1;
      handleReset();
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const newIndex = prev < images.length - 1 ? prev + 1 : 0;
      handleReset();
      return newIndex;
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Reset active index when modal opens
  React.useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  // Add keyboard event listeners
  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const currentImage = images[activeIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] p-0 glass">
        <div className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              className="w-full h-full object-contain transition-transform duration-200 cursor-move"
              style={{ 
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                cursor: scale > 1 ? 'move' : 'default'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              draggable={false}
              loading="eager"
              decoding="async"
            />
          </AspectRatio>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 glass text-foreground p-2 flex justify-between items-center">
            <p className="text-center flex-1">{currentImage.caption}</p>
            <div className="flex gap-2">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                onClick={handleReset}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Reset zoom"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;