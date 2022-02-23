import './App.css';
import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          exact path='/'
          element={
            <Main />
          }
        />
        <Route
          path='/movies'
          element={
            <Movies />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
