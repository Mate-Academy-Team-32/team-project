import '@/app/components/App/App.scss';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  );
}
