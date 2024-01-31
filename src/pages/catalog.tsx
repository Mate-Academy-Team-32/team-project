import React from 'react';
import { Catalog as Store } from '../components/Catalog';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';


export const Catalog: React.FC = () => (
  <>
    <Header />
    <Store />
    <Footer />
  </>
);
