import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, caption }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] p-0 glass">
        <div className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={imageUrl}
              alt={caption}
              className="w-full h-full object-contain"
            />
          </AspectRatio>
          <p className="absolute bottom-0 left-0 right-0 glass text-foreground p-2 text-center">
            {caption}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;