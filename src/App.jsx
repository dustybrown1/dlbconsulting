import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transmissions from './pages/Transmissions';
import Archive from './pages/Archive';
import Article from './pages/Article';
import Editor from './mission-control/Editor';
import Stars from './components/Stars';
import Grid from './components/Grid';

export default function App() {
  return (
    <>
      <Stars />
      <Grid />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transmissions" element={<Transmissions />} />
        <Route path="/transmissions/archive" element={<Archive />} />
        <Route path="/transmissions/:id" element={<Article />} />
        <Route path="/mission-control" element={<Editor />} />
      </Routes>
    </>
  );
}
