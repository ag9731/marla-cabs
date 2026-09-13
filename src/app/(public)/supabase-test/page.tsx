import { createClient } from '@/lib/supabase/server'

export default async function SupabaseTestPage() {
  const supabase = await createClient()

  // Make a safe request to check connectivity. We don't have any tables yet.
  // Querying a non-existent table will return a specific PostgREST error (42P01) 
  // if the connection and keys are valid and properly authenticated.
  const { data, error } = await supabase.from('_dummy_connection_test').select('*').limit(1)

  // 42P01 is Postgres code for "relation does not exist"
  // PGRST205 is PostgREST code for "Could not find the table in the schema cache"
  // Both definitively prove the request successfully reached Supabase!
  const isConnected = error && (error.code === '42P01' || error.code === 'PGRST205')

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-50 border">
            <h2 className="font-semibold text-sm text-slate-500 mb-1">Status</h2>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-medium text-lg">
                {isConnected ? 'Connected Successfully' : 'Connection Failed'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border overflow-x-auto text-xs font-mono">
            <h2 className="font-semibold text-sm text-slate-500 mb-2 font-sans">Raw Supabase Response</h2>
            <pre className="whitespace-pre-wrap text-slate-700">
              {JSON.stringify({ data, error }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
