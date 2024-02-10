import React from 'react';
import { Page404 as Error404 } from '../components/Page404';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Page404: React.FC = () => (
  <>
    <Header />
    <Error404 />
    <Footer />
  </>
);
