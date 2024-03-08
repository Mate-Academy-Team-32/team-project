import './App.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <section style={{ height: "90px" }}></section>
      {children}
      <Footer />
    </>
  );
}
