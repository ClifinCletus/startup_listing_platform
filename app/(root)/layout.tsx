import type {Metadata} from 'next'
import Navbar from '../../components/Navbar'


export const metadata:Metadata = {
  title: "Startup Listing Platform",
  description: "A platform to list and discover startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <main >
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}