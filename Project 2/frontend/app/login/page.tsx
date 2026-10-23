'use client'

import { FormEvent, useState } from 'react'
import { login, register } from '@/lib/api'
import { Music2 } from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('')
    try { mode === 'login' ? await login(email, password) : await register(name, email, password); window.location.assign('/') }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to sign in.') }
    finally { setBusy(false) }
  }
  return <main className="grid min-h-screen place-items-center bg-[#080b14] p-5 text-white">
    <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-2xl">
      <div className="flex items-center gap-3 text-xl font-bold"><span className="grid size-10 place-items-center rounded-xl bg-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/25"><Music2 /></span>sonicly</div>
      <p className="mt-8 text-sm font-semibold tracking-wider text-[#a78bfa]">{mode === 'login' ? 'WELCOME BACK' : 'START LISTENING'}</p><h1 className="mt-2 text-3xl font-semibold">{mode === 'login' ? 'Sign in to your sound.' : 'Create your account.'}</h1>
      {mode === 'signup' && <label className="mt-6 block text-sm">Name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none focus:border-[#8b5cf6]" /></label>}
      <label className="mt-4 block text-sm">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none focus:border-[#8b5cf6]" /></label>
      <label className="mt-4 block text-sm">Password<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none focus:border-[#8b5cf6]" /></label>
      {error && <p aria-live="polite" className="mt-4 text-sm text-red-300">{error}</p>}
      <button disabled={busy} className="mt-6 w-full rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] p-3 font-semibold text-white shadow-lg shadow-[#8b5cf6]/20 transition disabled:opacity-60">{busy ? 'Working…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
      <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="mt-5 w-full text-sm font-medium text-[#a78bfa] hover:text-[#c4b5fd] transition">{mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}</button>
    </form>
  </main>
}
