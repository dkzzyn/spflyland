import { useState } from 'react'
import type { FormEvent } from 'react'
import styles from './Contact.module.css'

type FormData = {
  nome: string
  empresa: string
  email: string
  telefone: string
  operacao: string
  mensagem: string
}

const initialForm: FormData = {
  nome: '',
  empresa: '',
  email: '',
  telefone: '',
  operacao: '',
  mensagem: '',
}

function Contact() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [error, setError] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const requiredFields = [
      formData.nome,
      formData.empresa,
      formData.email,
      formData.telefone,
      formData.operacao,
      formData.mensagem,
    ]

    if (requiredFields.some((value) => value.trim() === '')) {
      setSent(false)
      setError('Preencha todos os campos obrigatórios.')
      return
    }

    setError('')
    setSent(true)
    setFormData(initialForm)
  }

  return (
    <section id="contato" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2>Fale com nosso time</h2>
          <p>
            Envie sua necessidade logística e retornaremos com uma proposta sob
            medida.
          </p>

          <form onSubmit={onSubmit} className={styles.form} noValidate>
            <input
              placeholder="Nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            <input
              placeholder="Empresa"
              value={formData.empresa}
              onChange={(e) =>
                setFormData({ ...formData, empresa: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              placeholder="Telefone"
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />
            <input
              placeholder="Tipo de operação"
              value={formData.operacao}
              onChange={(e) =>
                setFormData({ ...formData, operacao: e.target.value })
              }
            />
            <textarea
              placeholder="Mensagem"
              rows={4}
              value={formData.mensagem}
              onChange={(e) =>
                setFormData({ ...formData, mensagem: e.target.value })
              }
            />
            {error && <p className={styles.error}>{error}</p>}
            {sent && (
              <p className={styles.success}>
                Mensagem enviada com sucesso! Em um projeto real, conecte aqui ao
                backend ou WhatsApp API.
              </p>
            )}
            <button type="submit">Enviar mensagem</button>
          </form>
        </div>

        <aside className={styles.info}>
          <h3>Contato direto</h3>
          <p>
            WhatsApp: <a href="https://wa.me/5511999999999">(11) 99999-9999</a>
          </p>
          <p>
            Telefone: <a href="tel:+551130000000">(11) 3000-0000</a>
          </p>
          <p>
            E-mail: <a href="mailto:contato@spflylogistica.com.br">contato@spflylogistica.com.br</a>
          </p>
          <a
            className={styles.whatsBtn}
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
          >
            Abrir WhatsApp
          </a>
        </aside>
      </div>
    </section>
  )
}

export default Contact
