import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainNavigation from './components/layout/MainNavigation';
import AllMeetupsPage from './pages/AllMeetupsPage';
import FavoritesPage from './pages/Favorites';
import NewMeetupsPage from './pages/NewMeetup';

function App() {
  return (
    <div data-test="app">
      <MainNavigation />
      <Layout>
        <Routes>
          <Route path="/" element={<AllMeetupsPage />} />
          <Route path="/new-meetup" element={<NewMeetupsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<AllMeetupsPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
