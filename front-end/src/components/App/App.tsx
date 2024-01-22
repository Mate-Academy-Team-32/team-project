import React from 'react';
import './App.scss';
import { Header } from '../Header';
import { Main } from '../Main';
import { Footer } from '../Footer';

export const App: React.FC = () => (
  <section className="App">
    <Header />
    <Main />
    <Footer />
  </section>
);
