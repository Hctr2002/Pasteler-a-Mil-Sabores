import AppNavbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import './styles/theme.css';


export default function App({ children }){
  return (
    <>
      <AppNavbar />
      <main className="contenido container">
        {children}
      </main>
      <Footer />
    </>
  );
}