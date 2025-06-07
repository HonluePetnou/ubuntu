import CameroonHero from './components/CameroonHero'
import InteractiveMap from './components/InteractiveMap'
import Navbar from './components/NavBar'

function App() {
  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <Navbar />
      <main>
        <InteractiveMap />
        <CameroonHero />
        {/* Autres sections du pays à venir */}
      </main>
    </div>
  );
}

export default App
