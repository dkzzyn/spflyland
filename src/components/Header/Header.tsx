import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Header.module.css'

const content = {
  pt: {
    nav: ['Início', 'Rastreamento', 'Serviços', 'Estrutura', 'Diferenciais', 'Clientes', 'Contato'],
    cta: 'Solicitar Cotação',
  },
  es: {
    nav: ['Inicio', 'Seguimiento', 'Servicios', 'Estructura', 'Diferenciales', 'Clientes', 'Contacto'],
    cta: 'Solicitar Cotización',
  },
  en: {
    nav: ['Home', 'Tracking', 'Services', 'Structure', 'Differentials', 'Clients', 'Contact'],
    cta: 'Request Quote',
  },
} as const

const navHrefs = [
  '#inicio',
  '#rastreamento',
  '#servicos',
  '#estrutura',
  '#diferenciais',
  '#clientes',
  '#contato',
]

function Header() {
  const { language, setLanguage } = useLanguage()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('spfly-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('spfly-theme', theme)
  }, [theme])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#inicio" className={styles.brand}>
          <img
            className={`${styles.brandLogo} ${styles.brandLogoLight}`}
            src="/img/logo-positiva.png"
            alt="SPFLY Logística"
          />
          <img
            className={`${styles.brandLogo} ${styles.brandLogoDark}`}
            src="/img/vert_cor_negativo_page-0001.png"
            alt="SPFLY Logística"
          />
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {navHrefs.map((href, index) => (
            <a key={href} href={href} className={styles.navLink}>
              {content[language].nav[index]}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <select
            className={styles.languageSelect}
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'pt' | 'es' | 'en')}
            aria-label="Selecionar idioma"
          >
            <option value="pt">PT</option>
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
          <button
            type="button"
            className={styles.themeButton}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={
              theme === 'light'
                ? 'Ativar modo escuro'
                : 'Ativar modo claro'
            }
            title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18.5 14.5C17.7 14.8 16.9 15 16 15C12.1 15 9 11.9 9 8C9 7.1 9.2 6.3 9.5 5.5C6.9 6.5 5 9 5 12C5 15.9 8.1 19 12 19C15 19 17.5 17.1 18.5 14.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 2.5V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M12 19V21.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M2.5 12H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M19 12H21.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M5.3 5.3L7.1 7.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M16.9 16.9L18.7 18.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M16.9 7.1L18.7 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M5.3 18.7L7.1 16.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <a href="#contato" className={styles.cta}>
            {content[language].cta}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
