import styles from './Hero.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const copy = {
  pt: {
    eyebrow: 'SPFLY ARMAZENAGEM E LOGÍSTICA',
    title:
      'Maximize sua Eficiência Operacional e Reduza Custos com a Logística Inteligente da SPFLY!',
    subtitle:
      'Nossa expertise em logística ponta a ponta assegura que seu negócio seja cuidadosamente gerenciado, desde o controle de estoque até a expedição.',
    ctaPrimary: 'SOLICITAR COTAÇÃO',
    ctaSecondary: 'Ver Serviços',
  },
  es: {
    eyebrow: 'SPFLY ALMACENAMIENTO Y LOGÍSTICA',
    title:
      'Maximice su eficiencia operativa y reduzca costos con la logística inteligente de SPFLY.',
    subtitle:
      'Nuestra experiencia logística de punta a punta garantiza que su operación esté gestionada con seguridad y previsibilidad.',
    ctaPrimary: 'SOLICITAR COTIZACIÓN',
    ctaSecondary: 'Ver Servicios',
  },
  en: {
    eyebrow: 'SPFLY WAREHOUSING & LOGISTICS',
    title:
      'Maximize operational efficiency and reduce costs with SPFLY smart logistics.',
    subtitle:
      'Our end-to-end logistics expertise ensures your operation is managed with security and predictability.',
    ctaPrimary: 'REQUEST A QUOTE',
    ctaSecondary: 'View Services',
  },
} as const

function Hero() {
  const { language } = useLanguage()
  const text = copy[language]

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p className={styles.subtitle}>{text.subtitle}</p>
          <div className={styles.actions}>
            <a className={styles.primaryBtn} href="#contato">
              {text.ctaPrimary}
            </a>
            <a className={styles.secondaryBtn} href="#servicos">
              {text.ctaSecondary}
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <img
            className={styles.heroImage}
            src="/img/image.png"
            alt="Frota da SPFLY em operação logística"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
