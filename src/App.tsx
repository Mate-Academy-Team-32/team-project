import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages';
import { Sign } from './pages/sign';
import { Catalog } from './pages/catalog';
import './App.scss';

export const App: React.FC = () => (
  <Router>
    <Header />

    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/sign"
        element={<Sign />}
      />
      <Route
        path="/catalog"
        element={<Catalog />}
      />
    </Routes>

    <Footer />
  </Router>
);
