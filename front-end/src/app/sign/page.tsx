import { Suspense } from 'react';
import Layout from '@/app/layout';
import { Sign } from '@/components/Sign';

export default function SignPage() {
  return (
    <Layout>
      <Suspense fallback={<>Loading...</>}>
        <Sign />
      </Suspense>
    </Layout>
  );
}
