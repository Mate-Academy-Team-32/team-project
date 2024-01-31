import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages';
import { Sign } from './pages/sign';
import { Catalog } from './pages/catalog';
import { Page404 } from './pages/404';

const root = createRoot(document.getElementById('root') as HTMLElement);
const basename = document.querySelector('base')?.getAttribute('href') ?? '/';

root.render(
  <>
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index  path="/" element={<Home />} />
          <Route path="sign" element={<Sign />} />
          <Route path="catalog" element={<Catalog />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </>
);
