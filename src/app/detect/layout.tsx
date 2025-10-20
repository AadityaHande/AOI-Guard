import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IC Detection | AOI-Guard',
  description: 'Upload IC images for automated authenticity verification using AI-powered OCR and OEM data comparison',
};

export default function DetectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
