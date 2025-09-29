import AppNavbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import AppRouter from './routes/AppRouter';

import './styles/theme.css';

export default function App(){
  return (
    <>
      <AppNavbar />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </>
  );
}