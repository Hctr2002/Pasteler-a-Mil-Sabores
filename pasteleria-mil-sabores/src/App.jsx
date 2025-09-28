
import { Outlet } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Aquí es donde se renderizará Home o Catalogo */}
      </main>
      <Footer />
    </>
  );
}

export default App;