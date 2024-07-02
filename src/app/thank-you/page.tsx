import Link from 'next/link';

export default function ThankYou() {
  return (
    <main className="flex flex-col items-center justify-center p-4 sm:p-0 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <div className="text-center bg-white p-8 m-4 sm:m-8 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-10">
          Merci beaucoup d&apos;avoir signé la pétition! 🎉
        </h1>
        <p className="text-lg sm:text-2xl mb-4 sm:mb-6 text-gray-700">
          Votre soutien est très apprécié et nous rapproche de notre objectif. 🙏
        </p>
        <p className="text-lg sm:text-2xl mb-4 sm:mb-6 text-gray-700">
          Ensemble, nous pouvons faire une différence! 💪
        </p>
        <Link href="/" className="text-blue-500 hover:underline text-lg sm:text-xl">
          Retour à la page d&apos;accueil
        </Link>
      </div>
    </main>
  );
}
