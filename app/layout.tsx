import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Volatile — The art of good chemistry',
 description: 'A molecular pairing workbench for curious chefs. Explore aroma bridges, unexpected contrasts and your next great dish.',
 icons: {icon:'/favicon.svg',shortcut:'/favicon.svg'},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>}
