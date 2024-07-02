import Form from '@/components/form'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto pt-16 sm:pt-24">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8 text-center">
        📝 Pétition en faveur de la pérénisation de l&apos;expérimentation rue de Verdun
      </h1>

      <p className="text-lg sm:text-2xl mb-4 sm:mb-6 text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, facere praesentium
        dolor quis iusto amet quibusdam numquam labore animi nulla ipsum doloribus assumenda, non
        consectetur voluptatibus placeat rem at? Voluptatibus?
      </p>

      <div className="mb-4 sm:mb-6 text-center">
        <Image
          src="https://picsum.photos/id/237/800/600"
          width="800"
          height="600"
          alt="An image"
          className="w-full sm:w-auto mx-auto rounded-lg shadow-lg"
        />
      </div>

      <p className="text-lg sm:text-2xl mb-4 sm:mb-6 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae deserunt debitis suscipit?
        Atque culpa debitis at non, quo odit suscipit molestiae blanditiis provident maiores
        nesciunt repudiandae error mollitia aut obcaecati!
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        ✨ Afin de nous soutenir, merci de signer la pétition
      </h2>

      <div className="flex justify-center">
        <Form />
      </div>
    </div>
  )
}
