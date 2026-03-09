import styles from './About.module.css'

const highlights = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 20V5H18V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 9H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 9H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 13H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 13H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: 'Estrutura de armazém',
    value: '8.000 m²',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 8H14V15H3V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 10H18L21 13V15H14V10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    label: 'Docas operacionais',
    value: '12 posições',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L18 6V11C18 14.8 15.5 18.3 12 19.5C8.5 18.3 6 14.8 6 11V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Monitoramento',
    value: '24h com CFTV',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 20H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: 'Tecnologia',
    value: 'WMS integrado',
  },
]

function About() {
  return (
    <section id="estrutura" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topContent}>
          <div className={styles.text}>
            <h2>Estrutura preparada para operações de alta performance</h2>
            <p>
              Localizada em São Paulo, a SPFLY atende operações B2B e B2C com
              foco em eficiência, segurança e escalabilidade logística.
            </p>
          </div>
          <div className={styles.media}>
            <img
              src="/img/1.png"
              alt="Operação logística da SPFLY em centro de distribuição"
            />
          </div>
        </div>
        <div className={styles.grid}>
          {highlights.map((item) => (
            <article key={item.label} className={styles.item}>
              <span aria-hidden="true">{item.icon}</span>
              <div>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
