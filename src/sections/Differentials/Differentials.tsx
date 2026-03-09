import styles from './Differentials.module.css'

const differentials = [
  'Atendimento personalizado',
  'SLA rigoroso',
  'Tecnologia e rastreio',
  'Time especializado',
]

function Differentials() {
  return (
    <section id="diferenciais" className={styles.section}>
      <div className={styles.container}>
        <h2>Diferenciais que aceleram resultados</h2>
        <div className={styles.grid}>
          {differentials.map((item) => (
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
