import React from 'react';
import { Account as Verification } from '../components/Account';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Account: React.FC = () => (
  <>
    <Header />
    <Verification />
    <Footer />
  </>
);
