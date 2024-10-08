// app/layout.tsx
import { Metadata } from 'next';
import ClientLayout from '@/app/ClientLayout'; // Import the client layout component

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'SpareChange',
  description: 'Empowering change, one coin at a time',
  // Add any other metadata like Open Graph, Twitter, etc.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout> {/* Render the client layout */}
      </body>
    </html>
  );
}
