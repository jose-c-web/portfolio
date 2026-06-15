import './App.css';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;