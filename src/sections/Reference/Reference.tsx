import styles from './Reference.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const copy = {
  pt: {
    title:
      'Referencia no mercado de Logistica e Transporte tendo sua marca associada a agilidade.',
    text:
      'O sucesso de uma empresa nao depende, exclusivamente, da qualidade de seus produtos e servicos para ser considerada bem sucedida. Na SPFLY acreditamos que o sucesso esta ligado a credibilidade e para isso assumimos um compromisso imprescindivel a cultura de uma Empresa moderna - o compromisso com a etica.',
    cta: 'COTACAO',
  },
  es: {
    title:
      'Referencia en el mercado de Logística y Transporte con su marca asociada a la agilidad.',
    text:
      'El éxito de una empresa no depende exclusivamente de la calidad de sus productos y servicios. En SPFLY creemos que el éxito está ligado a la credibilidad y por eso asumimos un compromiso esencial para una empresa moderna: el compromiso con la ética.',
    cta: 'COTIZACIÓN',
  },
  en: {
    title:
      'A reference in Logistics and Transportation with your brand associated with agility.',
    text:
      'A company success does not depend exclusively on product and service quality. At SPFLY we believe success is connected to credibility, and for that we embrace a key commitment for a modern company - the commitment to ethics.',
    cta: 'QUOTE',
  },
} as const

function Reference() {
  const { language } = useLanguage()

  return (
    <section className={styles.section} aria-label="Referência em logística">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>{copy[language].title}</h2>
          <p>{copy[language].text}</p>
        </div>

        <a className={styles.cta} href="#contato">
          {copy[language].cta}
        </a>
      </div>
    </section>
  )
}

export default Reference
