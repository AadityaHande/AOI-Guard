import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type ImagePreviewProps = {
    imageUrl: string;
    imageHint: string;
};

export function ImagePreview({ imageUrl, imageHint }: ImagePreviewProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan overflow-hidden">
      <CardContent className="p-0">
        <Image
          src={imageUrl}
          alt="Integrated Circuit Scan"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
          data-ai-hint={imageHint}
        />
      </CardContent>
    </Card>
  );
}
