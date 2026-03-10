import styles from './Capabilities.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const cards = [
  {
    image: '/img/carros.png',
    title: {
      pt: 'Transporte Multimodal',
      es: 'Transporte Multimodal',
      en: 'Multimodal Transportation',
    },
    description: {
      pt: 'Atuamos em todo o território nacional, com alta performance no cumprimento de prazos acordados e zelando pela integridade da mercadoria.',
      es: 'Actuamos en todo el territorio nacional, con alto desempeño en el cumplimiento de plazos y cuidando la integridad de la mercancía.',
      en: 'We operate across the country, delivering high performance on agreed deadlines while protecting cargo integrity.',
    },
    items: {
      pt: [
        'Aéreo',
        'Rodoviário expresso',
        'Veículos dedicados e exclusivos',
        'Operações programadas',
        'Logística reversa',
      ],
      es: [
        'Aéreo',
        'Carretera exprés',
        'Vehículos dedicados y exclusivos',
        'Operaciones programadas',
        'Logística inversa',
      ],
      en: [
        'Air freight',
        'Express road freight',
        'Dedicated and exclusive vehicles',
        'Scheduled operations',
        'Reverse logistics',
      ],
    },
  },
  {
    image: '/img/armazem.png',
    title: {
      pt: 'Armazenagem e Logística',
      es: 'Almacenamiento y Logística',
      en: 'Warehousing and Logistics',
    },
    description: {
      pt: 'Centro Logístico com 10.000 m², localizado no condomínio CLG (Centro Logístico de Guarulhos), ao lado do aeroporto de Guarulhos.',
      es: 'Centro logístico de 10.000 m² en el condominio CLG (Centro Logístico de Guarulhos), junto al aeropuerto de Guarulhos.',
      en: 'Logistics center with 10,000 m² located in CLG (Guarulhos Logistics Center), next to Guarulhos Airport.',
    },
    items: {
      pt: [
        'Controle de estoque',
        'Recebimento e expedição',
        'Inventário',
        'Triagem',
        'Montagem de kits',
        'Manuseio',
        'E-commerce',
      ],
      es: [
        'Control de inventario',
        'Recepción y despacho',
        'Inventario',
        'Clasificación',
        'Armado de kits',
        'Manipulación',
        'E-commerce',
      ],
      en: [
        'Inventory control',
        'Inbound and outbound handling',
        'Inventory counting',
        'Sorting',
        'Kit assembly',
        'Handling',
        'E-commerce',
      ],
    },
  },
  {
    image: '/img/caixas.png',
    title: {
      pt: 'Serviços Exclusivos',
      es: 'Servicios Exclusivos',
      en: 'Exclusive Services',
    },
    description: {
      pt: 'Organização, montagem e acompanhamento de eventos tipo Friendly & Family, Staff Sales, pré-estreia de filmes, lojas POP UP, feiras e convenções.',
      es: 'Organización, montaje y acompañamiento de eventos como Friendly & Family, Staff Sales, preestrenos, tiendas POP UP, ferias y convenciones.',
      en: 'Organization, setup and monitoring of events such as Friendly & Family, Staff Sales, movie previews, POP UP stores, fairs and conventions.',
    },
    items: {
      pt: [
        'Inventário de entrada e retorno da mercadoria do evento',
        'Coleta em CD ou lojas, entrega e retirada no local',
        'Prospecção, negociação e locação de espaços',
        'Locação de infraestrutura (provadores, araras e espelhos)',
        'Mão de obra qualificada para montagem e desmontagem',
        'Auxílio no atendimento aos convidados',
      ],
      es: [
        'Inventario de entrada y retorno de mercancía del evento',
        'Recolección en CD o tiendas, entrega y retiro en el local',
        'Prospección, negociación y alquiler de espacios',
        'Alquiler de infraestructura (probadores, percheros y espejos)',
        'Mano de obra calificada para montaje y desmontaje',
        'Apoyo en la atención a invitados',
      ],
      en: [
        'Inbound and return inventory for event goods',
        'Pickup at DC or stores, delivery and collection at the venue',
        'Prospecting, negotiation and venue rental',
        'Rental of infrastructure (fitting rooms, racks and mirrors)',
        'Skilled labor for setup and teardown',
        'Support for guest service during events',
      ],
    },
  },
]

const sectionTitles = {
  pt: 'Referência no mercado de Logística e Transporte tendo sua marca associada à agilidade, confiabilidade, rentabilidade e segurança.',
  es: 'Referencia en el mercado de Logística y Transporte con su marca asociada a agilidad, confiabilidad, rentabilidad y seguridad.',
  en: 'A market reference in Logistics and Transportation with your brand associated with agility, reliability, profitability and safety.',
} as const

function Capabilities() {
  const { language } = useLanguage()

  return (
    <section className={styles.section} aria-label="Capacidades SPFLY">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>{sectionTitles[language]}</h2>
        </header>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.title.pt} className={styles.card}>
              <img src={card.image} alt={card.title[language]} className={styles.cardImage} />
              <div className={styles.cardBody}>
                <h3>{card.title[language]}</h3>
                <p>{card.description[language]}</p>
                <ul>
                  {card.items[language].map((item) => (
                    <li key={item}>{item}.</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
