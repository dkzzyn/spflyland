import styles from './Services.module.css'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L20 7L12 11L4 7L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 7V17L12 21V11L20 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 7V17L12 21V11L4 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Armazenagem',
    description: 'Estrutura segura para guarda e movimentação eficiente de cargas.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 7H7L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 17H17L14 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7C4.8 7 3 8.8 3 11V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 17C19.2 17 21 15.2 21 13V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Cross-docking',
    description: 'Agilidade no transbordo e redução do tempo de permanência no CD.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 17V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 17V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 17V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Gestão de estoque',
    description: 'Controle inteligente com visibilidade de giro, saldo e reposição.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 7H14V15H3V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 10H18L21 13V15H14V10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    title: 'Distribuição',
    description: 'Entregas planejadas com rastreabilidade e padronização operacional.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 11L11 13C11.9 13.9 13.3 13.9 14.2 13L16 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 9L7 6L10 9L7 12L4 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 9L17 6L20 9L17 12L14 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 12L9 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 12L15 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Operações dedicadas',
    description: 'Times e fluxos desenhados sob medida para sua necessidade.',
  },
]

function Services() {
  return (
    <section id="servicos" className={styles.section}>
      <div className={styles.container}>
        <h2>Serviços logísticos para cada etapa da sua operação</h2>
        <p>
          Soluções modulares que se adaptam ao seu volume, tipo de carga e nível
          de serviço esperado.
        </p>

        <div className={styles.grid}>
          {services.map((service) => (
            <article className={styles.card} key={service.title}>
              <span className={styles.icon} aria-hidden="true">
                {service.icon}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
