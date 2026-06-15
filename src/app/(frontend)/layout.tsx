import type { Metadata } from 'next'
import Script from 'next/script'

const SITE = 'https://parceleaqui.com.br'
const PATH = '/juridico'
const TITLE = 'Parcele Aqui para o Mercado Jurídico | Custas, guias e honorários em até 12x'
const DESC =
  'Tribunais, OAB, escritórios e cartórios oferecem o parcelamento de custas, fianças, guias judiciais e honorários em até 12x no cartão. O emissor recebe à vista. Tecnologia da Potencial.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  applicationName: 'Parcele Aqui',
  authors: [{ name: 'Grupo Potencial / Potencial Tecnologia' }],
  keywords: [
    'parcelamento de custas', 'custas processuais parceladas', 'guias judiciais', 'fianças',
    'anuidade OAB parcelada', 'honorários advocatícios', 'emolumentos de cartório',
    'TJSC', 'Parcele Aqui', 'Potencial Tecnologia',
  ],
  alternates: { canonical: PATH },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } as any,
  themeColor: '#ffb800',
  openGraph: {
    type: 'website', locale: 'pt_BR', siteName: 'Parcele Aqui',
    url: `${SITE}${PATH}`, title: TITLE, description: DESC,
    images: [{ url: '/images/og-image-juridico.jpg', width: 1200, height: 630, alt: 'Parcele Aqui Jurídico' }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESC,
    images: ['/images/og-image-juridico.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', name: 'Parcele Aqui', url: SITE,
      logo: `${SITE}/images/logo-parcele-aqui.svg`,
      parentOrganization: { '@type': 'Organization', name: 'Potencial Tecnologia' },
      sameAs: ['https://www.instagram.com/parceleaquibr/', 'https://linkedin.com/company/grupo-potencial/'],
    },
    {
      '@type': 'Service', name: 'Parcelamento de guias do mercado jurídico',
      serviceType: 'Parcelamento de custas, fianças, honorários e emolumentos no cartão',
      provider: { '@type': 'Organization', name: 'Potencial Tecnologia' }, areaServed: 'BR', description: DESC,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        ['O Parcele Aqui é seguro?', 'Sim. A solução é desenvolvida pela Potencial Tecnologia, com mais de 25 anos de experiência, infraestrutura certificada e integração com adquirentes líderes.'],
        ['O emissor recebe à vista?', 'Sim. Assim que o tomador conclui o parcelamento no cartão, a guia é liquidada em tempo real e o valor cheio é creditado ao emissor, sem esperar pelas parcelas.'],
        ['Quem paga a taxa do parcelamento?', 'O tomador, com a taxa exibida no momento da escolha das parcelas, como no modelo do TJSC. O emissor não tem custo.'],
        ['Quais guias podem ser parceladas?', 'Custas e despesas processuais, fianças e cauções judiciais, taxas judiciais, anuidade e contribuições da OAB, honorários e emolumentos de cartório.'],
        ['O escritório ou órgão assume risco de inadimplência?', 'Não. É uma transação de cartão: o emissor recebe à vista e o parcelamento passa a ser entre o tomador e a administradora do cartão dele.'],
        ['Qual o ganho do parceiro?', 'Comissão sobre cada operação processada, paga em M+1 pela Potencial Tecnologia, sem custo de implementação nem mensalidade.'],
      ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon-light.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/sections/hero-slide-1.webp" fetchPriority="high" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kufam:wght@400;500;700;900&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-white">
        {children}
        <Script src="/js/lp.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
