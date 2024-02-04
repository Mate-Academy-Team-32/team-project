import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export const App: React.FC = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
