import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectShowcaseProps {
  images: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;
  onImageClick: (imageIndex: number) => void;
}

const ProjectShowcase = ({ images, onImageClick }: ProjectShowcaseProps) => {
  return (
    <Card className="glass-card p-8 animate-slideUp">
      <h2 className="text-2xl font-semibold mb-6 gradient-text">
        Project Showcase
      </h2>
      <div className="relative px-4">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                <div 
                  className="glass p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => onImageClick(index)}
                >
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </AspectRatio>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {image.caption}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="glass" />
          <CarouselNext className="glass" />
        </Carousel>
      </div>
    </Card>
  );
};

export default ProjectShowcase;