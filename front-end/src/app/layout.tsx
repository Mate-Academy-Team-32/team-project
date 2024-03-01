import type { Metadata } from 'next';
import { Montserrat } from "next/font/google";
import { App } from '@/components/App';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PerfuMe",
  description: "Generated by create next app",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={montserrat.className}>
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}
