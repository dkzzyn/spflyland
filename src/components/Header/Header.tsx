import { useEffect, useState } from 'react'
import styles from './Header.module.css'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Rastreamento', href: '#rastreamento' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contato', href: '#contato' },
]

function Header() {
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
            className={styles.brandLogo}
            src="/img/logo_spfly.png"
            alt="SPFLY Logística"
          />
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
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
            Solicitar Cotação
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
