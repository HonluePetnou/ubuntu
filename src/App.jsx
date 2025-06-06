import CameroonHero from './components/CameroonHero'
import Navbar from './components/NavBar'

function App() {
  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <Navbar />
      <main>
        <CameroonHero />
        {/* Autres sections du pays à venir */}
      </main>
    </div>
  )
}

export default App
