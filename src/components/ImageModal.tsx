import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, caption }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative">
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-full object-contain"
          />
          <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
            {caption}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;