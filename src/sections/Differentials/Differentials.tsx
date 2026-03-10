import styles from './Differentials.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const copy = {
  pt: {
    title: 'Diferenciais que aceleram resultados',
    items: [
      'Atendimento personalizado',
      'SLA rigoroso',
      'Tecnologia e rastreio',
      'Time especializado',
    ],
  },
  es: {
    title: 'Diferenciales que aceleran resultados',
    items: [
      'Atención personalizada',
      'SLA riguroso',
      'Tecnología y rastreo',
      'Equipo especializado',
    ],
  },
  en: {
    title: 'Differentials that accelerate results',
    items: [
      'Personalized service',
      'Strict SLA',
      'Technology and tracking',
      'Specialized team',
    ],
  },
} as const

function Differentials() {
  const { language } = useLanguage()

  return (
    <section id="diferenciais" className={styles.section}>
      <div className={styles.container}>
        <h2>{copy[language].title}</h2>
        <div className={styles.grid}>
          {copy[language].items.map((item) => (
            <article className={styles.card} key={item}>
              <span className={styles.marker} aria-hidden="true" />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Differentials
