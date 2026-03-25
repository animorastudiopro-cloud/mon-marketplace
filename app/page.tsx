import { supabase } from '@/lib/supabase'

export default async function Home() {
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const { data, error } = await supabase.from('profiles').select('*').limit(1)

  console.log('Data:', data)
  console.log('Error:', error)

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Mon Marketplace</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Statut de connexion</h2>

        <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
          <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
          <p>Clé présente: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Oui' : '❌ Non'}</p>
        </div>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">❌ Erreur de connexion</p>
            <p>{error.message}</p>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-bold">✅ Connexion Supabase réussie !</p>
            <p>La base de données répond correctement.</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="mt-4">
            <p className="font-medium mb-2">Profils trouvés :</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}