import type {Metadata} from 'next' //for adding the type of metadata
//import localFont from 'next/font/local';
import 'easymde/dist/easymde.min.css'
import './globals.css'
import { Toaster } from '@/components/ui/toaster';


// const workSans = localFont({
//   src:[
//     {
//       path:'./fonts/._WorkSans-Black.ttf',
//       weight:'900',
//       style:"normal"
//     },
//     {
//       path:'./fonts/._WorkSans-ExtraBold.ttf',
//       weight:'800',
//       style:"normal"
//     },
//     {
//       path:'./fonts/._WorkSans-Bold.ttf',
//       weight:'700',
//       style:"normal"
//     },
//     {
//       path:'./fonts/._WorkSans-SemiBold.ttf',
//       weight:'600',
//       style:"normal"
//     },
//     {
//       path:'./fonts/._WorkSans-Medium.ttf',
//       weight:'500',
//       style:"normal"
//     },
//     {
//       path:'./fonts/._WorkSans-Regular.ttf',
//       weight:'400',
//       style:"normal"
//     },
//     {
//       path:'./fonts/._WorkSans-Thin.ttf',
//       weight:'200',
//       style:"normal"
//     },
//     {
//       path:'./fonts/._WorkSans-ExtraLight.ttf',
//       weight:'100',
//       style:"normal"
//     },
//     ],
//    variable: '--font-work-sans'
// })

export const metadata:Metadata = {
  title: "Startory",
  description: "A platform to list and discover startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          {children}
          <Toaster/> {/*for showing the error message in the create form */}
      </body>
    </html>
  );
}