import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollReveal from './components/ScrollReveal/ScrollReveal'
import ChatWidget from './components/WhatsAppFloat/WhatsAppFloat'
import Hero from './sections/Hero/Hero'
import Reference from './sections/Reference/Reference'
import Tracking from './sections/Tracking/Tracking'
import Services from './sections/Services/Services'
import Capabilities from './sections/Capabilities/Capabilities'
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
        <ScrollReveal delayMs={80}>
          <Capabilities />
        </ScrollReveal>
        <ScrollReveal delayMs={100}>
          <Numbers />
        </ScrollReveal>
        <ScrollReveal delayMs={130}>
          <About />
        </ScrollReveal>
        <ScrollReveal delayMs={160}>
          <Differentials />
        </ScrollReveal>
        <ScrollReveal delayMs={190}>
          <Reference />
        </ScrollReveal>
        <ScrollReveal delayMs={220}>
          <Clients />
        </ScrollReveal>
        <ScrollReveal delayMs={250}>
          <Tracking />
        </ScrollReveal>
        <ScrollReveal delayMs={280}>
          <Contact />
        </ScrollReveal>
      </main>
      <ScrollReveal delayMs={120}>
        <Footer />
      </ScrollReveal>
      <ChatWidget />
    </div>
  )
}

export default App
