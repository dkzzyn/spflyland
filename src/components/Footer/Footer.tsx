import styles from './Footer.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const links = {
  pt: ['Home', 'Quem Somos', 'Soluções', 'Contato'],
  es: ['Inicio', 'Quiénes Somos', 'Soluciones', 'Contacto'],
  en: ['Home', 'About Us', 'Solutions', 'Contact'],
} as const

const hrefs = ['#inicio', '#estrutura', '#servicos', '#contato']

const copy = {
  pt: {
    infoTitle: 'Informações de contato:',
    phone: 'Telefone',
    ctaText: 'Receba sua proposta personalizada!',
    ctaButton: 'Solicitar Cotação',
  },
  es: {
    infoTitle: 'Información de contacto:',
    phone: 'Teléfono',
    ctaText: '¡Reciba su propuesta personalizada!',
    ctaButton: 'Solicitar Cotización',
  },
  en: {
    infoTitle: 'Contact information:',
    phone: 'Phone',
    ctaText: 'Get your personalized proposal!',
    ctaButton: 'Request Quote',
  },
} as const

function Footer() {
  const { language } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandBlock}>
          <h3>Demmel Matriz</h3>
          <p>CNPJ: 28.985.079/0001-76</p>
        </div>

        <div className={styles.linksBlock}>
          {hrefs.map((href, index) => (
            <a key={href} href={href}>
              {links[language][index]}
            </a>
          ))}
        </div>

        <div className={styles.infoBlock}>
          <p>
            <strong>{copy[language].infoTitle}</strong>
          </p>
          <p>
            {copy[language].phone}: (11) 2431-5030
          </p>
          <p>E-mail: comercial@spfly.com.br</p>
          <p>
            Av Papa João Paulo I, S/N Lote Gleba C - Módulo F - Galpao 300
            Condomínio PLG 2 - Parque Logístico Guarulhos
          </p>
        </div>

        <div className={styles.ctaBlock}>
          <p>{copy[language].ctaText}</p>
          <a href="#contato" className={styles.cta}>
            {copy[language].ctaButton}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
