import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>SPFLY ARMAZENAGEM E LOGÍSTICA</p>
          <h1>
            Maximize sua Eficiência Operacional e Reduza Custos com a Logística
            Inteligente da SPFLY!
          </h1>
          <p className={styles.subtitle}>
            Nossa expertise em logística ponta a ponta assegura que seu negócio
            seja cuidadosamente gerenciado, desde o controle de estoque até a
            expedição.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryBtn} href="#contato">
              SOLICITAR COTAÇÃO
            </a>
            <a className={styles.secondaryBtn} href="#servicos">
              Ver Serviços
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
