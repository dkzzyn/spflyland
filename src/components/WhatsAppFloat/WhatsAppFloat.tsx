import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import styles from './WhatsAppFloat.module.css'

type Message = {
  id: number
  from: 'bot' | 'user'
  text: string
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'bot',
      text: 'Olá! Sou o atendimento SPFLY. Posso ajudar com rastreio, cotação ou FAQ.',
    },
  ])

  const modalRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const messageIdRef = useRef(2)

  useEffect(() => {
    if (!isOpen) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      const clickedInsideModal = modalRef.current?.contains(target)
      const clickedButton = buttonRef.current?.contains(target)

      if (!clickedInsideModal && !clickedButton) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [isOpen])

  const botReply = (text: string) => {
    const normalized = text.toLowerCase()
    if (normalized.includes('rastre')) {
      return 'Perfeito! Me envie o código da minuta para eu orientar o rastreamento.'
    }
    if (normalized.includes('cota')) {
      return 'Ótimo! Para cotação, informe origem, destino, volume e prazo desejado.'
    }
    if (normalized.includes('faq') || normalized.includes('duvida')) {
      return 'Sem problemas. Perguntas frequentes: prazo médio, áreas atendidas, SLA e tipos de operação.'
    }
    return 'Entendi. Posso ajudar com rastreio, cotação ou dúvidas gerais.'
  }

  const addUserMessage = (text: string) => {
    const value = text.trim()
    if (value === '') return

    const userMessage: Message = {
      id: messageIdRef.current++,
      from: 'user',
      text: value,
    }
    const botMessage: Message = {
      id: messageIdRef.current++,
      from: 'bot',
      text: botReply(value),
    }
    setMessages((prev) => [...prev, userMessage, botMessage])
    setInputValue('')
  }

  const quickActions = useMemo(
    () => ['Rastreio', 'Cotação', 'FAQ'],
    [],
  )

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addUserMessage(inputValue)
  }

  return (
    <div className={styles.widget}>
      {isOpen && (
        <div ref={modalRef} className={styles.modal} role="dialog" aria-label="Atendimento SPFLY">
          <header className={styles.modalHeader}>
            <h3>Atendimento SPFLY</h3>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            >
              ×
            </button>
          </header>

          <div className={styles.messages}>
            <div className={styles.quickActions}>
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => addUserMessage(action)}
                  className={styles.quickActionButton}
                >
                  {action}
                </button>
              ))}
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.from === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form className={styles.inputBar} onSubmit={onSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Digite sua mensagem"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
        title={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <span className={styles.closeIcon}>×</span>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V14.5C20 15.33 19.33 16 18.5 16H10.85L7 20V16H5.5C4.67 16 4 15.33 4 14.5V5.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default ChatWidget
