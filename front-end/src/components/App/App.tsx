import '@/components/App/App.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  );
}
