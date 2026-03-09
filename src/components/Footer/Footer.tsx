import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>SPFLY Armazenagem e Logística</p>
        <p>CNPJ: 00.000.000/0001-00</p>
        <p>São Paulo - SP</p>
        <a href="#inicio">Termos e Política</a>
      </div>
    </footer>
  )
}

export default Footer
