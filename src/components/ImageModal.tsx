import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useRef, MouseEvent } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, caption }: ImageModalProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] p-0 glass">
        <div className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={imageUrl}
              alt={caption}
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
            />
          </AspectRatio>
          <div className="absolute bottom-0 left-0 right-0 glass text-foreground p-2 flex justify-between items-center">
            <p className="text-center flex-1">{caption}</p>
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