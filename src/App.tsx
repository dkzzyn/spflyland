import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollReveal from './components/ScrollReveal/ScrollReveal'
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat'
import Hero from './sections/Hero/Hero'
import Tracking from './sections/Tracking/Tracking'
import Services from './sections/Services/Services'
import Numbers from './sections/Numbers/Numbers'
import About from './sections/About/About'
import Differentials from './sections/Differentials/Differentials'
import Clients from './sections/Clients/Clients'
import Contact from './sections/Contact/Contact'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
        <ScrollReveal delayMs={60}>
          <Services />
        </ScrollReveal>
        <ScrollReveal delayMs={90}>
          <Numbers />
        </ScrollReveal>
        <ScrollReveal delayMs={120}>
          <About />
        </ScrollReveal>
        <ScrollReveal delayMs={150}>
          <Differentials />
        </ScrollReveal>
        <ScrollReveal delayMs={180}>
          <Clients />
        </ScrollReveal>
        <ScrollReveal delayMs={210}>
          <Tracking />
        </ScrollReveal>
        <ScrollReveal delayMs={240}>
          <Contact />
        </ScrollReveal>
      </main>
      <ScrollReveal delayMs={120}>
        <Footer />
      </ScrollReveal>
      <WhatsAppFloat />
    </div>
  )
}

export default App
