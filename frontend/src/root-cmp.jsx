import logo from './logo.svg';
import './App.css';
import { HomePage } from './views/home-page';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from './views/about-us';
import { ToyIndex } from './views/toy-index';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToyEdit } from './views/toy-edit';
import { ToyDetails } from './views/toy-details';
import { DashboardPage } from './views/dashbord-page';
// import './assets/css/main.css'
import './assets/scss/main.scss'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <main className="main">
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<DashboardPage />} path="/dashboard" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />


            </Routes>
          </main>
          <AppFooter />

        </section>
      </Router>
    </Provider>
  );
}

export default App;
