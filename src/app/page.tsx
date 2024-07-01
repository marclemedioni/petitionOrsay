import Form from '@/components/form'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8">
          Petition en faveur de la pérénisation de l&apos;expérimentation rue de Verdun
        </h1>

        <p className="text-base sm:text-xl mb-2 sm:mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, facere praesentium
          dolor quis iusto amet quibusdam numquam labore animi nulla ipsum doloribus assumenda, non
          consectetur voluptatibus placeat rem at? Voluptatibus?
        </p>

        <p className="mb-2 sm:mb-4">
          <Image
            src="https://picsum.photos/id/237/500/300"
            width="500"
            height="300"
            alt="An image"
            className="w-full sm:w-auto"
          />
        </p>

        <p className="text-base sm:text-xl mb-2 sm:mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae deserunt debitis suscipit?
          Atque culpa debitis at non, quo odit suscipit molestiae blanditiis provident maiores
          nesciunt repudiandae error mollitia aut obcaecati!
        </p>

        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Afin de nous soutenir, merci de signer la pétition</h1>

        <div>
          <Form />
        </div>
      </div>
  )
}
