import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Inicio from './pages/Inicio';
import Aprende from './pages/Aprende';
import Paso from './pages/Paso';
import Plantas from './pages/Plantas';
import Planta from './pages/Planta';
import Juegos from './pages/Juegos';
import Cultiva from './pages/juegos/Cultiva';
import Residuos from './pages/juegos/Residuos';
import Quiz from './pages/juegos/Quiz';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="aprende" element={<Aprende />} />
        <Route path="aprende/paso/:n" element={<Paso />} />
        <Route path="aprende/plantas" element={<Plantas />} />
        <Route path="aprende/plantas/:slug" element={<Planta />} />
        <Route path="juegos" element={<Juegos />} />
        <Route path="juegos/cultiva" element={<Cultiva />} />
        <Route path="juegos/residuos" element={<Residuos />} />
        <Route path="juegos/quiz" element={<Quiz />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
