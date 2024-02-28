import Layout from '@/app/layout';
import { Header } from '@/app/components/Header';
import { Main } from '@/app/components/Main';
import { Footer } from '@/app/components/Footer';

export default function HomePage() {
  return (
    <Layout>
      <Header />
      <Main />
      <Footer />
    </Layout>
  );
}
