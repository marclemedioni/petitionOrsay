'use client'

import { useRouter } from 'next/navigation'

import { FormEvent, useEffect, useState, } from 'react'
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs'

interface SignForm {
  name: string
  email: string
  comment: string
}

interface SignedStatus {
  hasSigned: boolean | null;
  signedAt: string | null;
}

function Form() {
  const [formState, setFormState] = useState({ name: "", email: "", comment: "", fingerprint: "" });
  const [browserFingerprint, setBrowserFingerprint] = useState('');
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    async function fetchData() {
      const fp = await getFingerprint();
      setBrowserFingerprint(fp as string);
    }

    fetchData()
  }, []);
  const [hasAlreadySigned, setHasAlreadySigned] = useState<SignedStatus>({ hasSigned: null, signedAt: null });

  useEffect(() => {
    async function checkIfSigned() {
      if (browserFingerprint) {
        const response = await fetch(`/api/finger-print?fingerprint=${browserFingerprint}`);
        if (response.ok) {
          const data = await response.json();
          setHasAlreadySigned(data);
        }
        setIsLoading(false);
      }
    }
    checkIfSigned();
  }, [browserFingerprint]);

  const router = useRouter()

  const onFieldChange = (val: Partial<SignForm>) => {
    setFormState({ ...formState, ...val })
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/sign', {
      method: 'POST',
      body: JSON.stringify({ ...formState, fingerprint: browserFingerprint }),
    })

    if (response.status === 200) {
      router.replace('/thank-you')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 animate-spin"></div>
      </div>
    );
  }

  return (
<div className="sm:rounded-lg p-8 border border-gray-300 bg-gradient-to-r from-blue-500 to-purple-600">
  {hasAlreadySigned.hasSigned ? (
    <p className="text-black bg-yellow-400 text-lg font-semibold p-2 rounded shadow-lg shadow-black-500/50">
      ☑️ Vous avez signé la pétition le {hasAlreadySigned.signedAt ? `${new Date(hasAlreadySigned.signedAt).toLocaleDateString('fr-FR')} à ${new Date(hasAlreadySigned.signedAt).toLocaleTimeString('fr-FR')}` : 'N/A'}, merci beaucoup !
    </p>
  ) : (
    <form onSubmit={onSubmit} className="space-y-6">
      <label className="block">
        <span className="text-white font-medium">Nom</span>
        <input
          type="text"
          name="name"
                onChange={(e) => onFieldChange({ name: e.target.value })}
                required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 p-3"
        />
      </label>
      <label className="block">
        <span className="text-white font-medium">Adresse e-mail</span>
        <input
          name="email"
          type="email"
          onChange={(e) => onFieldChange({ email: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 p-3"
          required
        />
      </label>
      <label className="block">
        <span className="text-white font-medium">Commentaire (facultatif)</span>
        <textarea
          name="comment"
          onChange={(e) => onFieldChange({ comment: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-32 p-3"
          rows={3}
        />
      </label>
      <div className="block text-sm text-white">
        Les informations que vous fournissez ne seront pas stockées, elles sont uniquement
        communiquées à la personne en charge de la pétition par email afin d&apos;être relayées
               en mairie le moment venu.
      </div>
      <div>
        <button
          type="submit"
          className="
            w-full h-14 sm:h-12 px-6 text-black
            bg-yellow-400
            border border-yellow-400
            rounded-lg
            hover:bg-yellow-500
            active:bg-yellow-600
            focus:outline-none focus:ring-2 focus:ring-yellow-300
            font-bold text-lg
            shadow-lg shadow-black-500/50 transform active:scale-95 transition-transform
            cursor-pointer
          "
          style={{ appearance: 'button' }}
        >
          Je signe la pétition
        </button>
      </div>
    </form>
  )}
</div>
  )
}

export default Form
