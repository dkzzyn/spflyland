import { useState } from 'react'
import type { FormEvent } from 'react'
import styles from './Contact.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

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

const copy = {
  pt: {
    title: 'Fale com nosso time',
    subtitle:
      'Envie sua necessidade logística e retornaremos com uma proposta sob medida.',
    placeholders: {
      nome: 'Nome',
      empresa: 'Empresa',
      email: 'E-mail',
      telefone: 'Telefone',
      operacao: 'Tipo de operação',
      mensagem: 'Mensagem',
    },
    error: 'Preencha todos os campos obrigatórios.',
    success:
      'Mensagem enviada com sucesso! Em um projeto real, conecte aqui ao backend ou WhatsApp API.',
    submit: 'Enviar mensagem',
    direct: 'Contato direto',
    openWhats: 'Abrir WhatsApp',
  },
  es: {
    title: 'Hable con nuestro equipo',
    subtitle:
      'Envíe su necesidad logística y volveremos con una propuesta personalizada.',
    placeholders: {
      nome: 'Nombre',
      empresa: 'Empresa',
      email: 'Correo',
      telefone: 'Teléfono',
      operacao: 'Tipo de operación',
      mensagem: 'Mensaje',
    },
    error: 'Complete todos los campos obligatorios.',
    success:
      '¡Mensaje enviado con éxito! En un proyecto real, conecte aquí su backend o API de WhatsApp.',
    submit: 'Enviar mensaje',
    direct: 'Contacto directo',
    openWhats: 'Abrir WhatsApp',
  },
  en: {
    title: 'Talk to our team',
    subtitle:
      'Send your logistics needs and we will return with a tailored proposal.',
    placeholders: {
      nome: 'Name',
      empresa: 'Company',
      email: 'E-mail',
      telefone: 'Phone',
      operacao: 'Operation type',
      mensagem: 'Message',
    },
    error: 'Please fill in all required fields.',
    success:
      'Message sent successfully! In a real project, connect this to your backend or WhatsApp API.',
    submit: 'Send message',
    direct: 'Direct contact',
    openWhats: 'Open WhatsApp',
  },
} as const

function Contact() {
  const { language } = useLanguage()
  const text = copy[language]
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
      setError(text.error)
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
          <h2>{text.title}</h2>
          <p>{text.subtitle}</p>

          <form onSubmit={onSubmit} className={styles.form} noValidate>
            <input
              placeholder={text.placeholders.nome}
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            <input
              placeholder={text.placeholders.empresa}
              value={formData.empresa}
              onChange={(e) =>
                setFormData({ ...formData, empresa: e.target.value })
              }
            />
            <input
              type="email"
              placeholder={text.placeholders.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              placeholder={text.placeholders.telefone}
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />
            <input
              placeholder={text.placeholders.operacao}
              value={formData.operacao}
              onChange={(e) =>
                setFormData({ ...formData, operacao: e.target.value })
              }
            />
            <textarea
              placeholder={text.placeholders.mensagem}
              rows={4}
              value={formData.mensagem}
              onChange={(e) =>
                setFormData({ ...formData, mensagem: e.target.value })
              }
            />
            {error && <p className={styles.error}>{error}</p>}
            {sent && (
              <p className={styles.success}>
                {text.success}
              </p>
            )}
            <button type="submit">{text.submit}</button>
          </form>
        </div>

        <aside className={styles.info}>
          <h3>{text.direct}</h3>
          <p>
            WhatsApp: <a href="https://wa.me/11917891531">(11) 91789-1531</a>
          </p>
          <p>
            Telefone: <a href="tel:+112431-5030">(11) 2431-5030</a>
          </p>
          <p>
            E-mail: <a href="mailto:comercial@spfly.com.brr">comercial@spfly.com.br</a>
          </p>
          <a
            className={styles.whatsBtn}
            href="https://wa.me/11917891531"
            target="_blank"
            rel="noreferrer"
          >
            {text.openWhats}
          </a>
        </aside>
      </div>
    </section>
  )
}

export default Contact
