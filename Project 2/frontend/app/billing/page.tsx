'use client'

import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  CreditCard,
  ShieldAlert,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Receipt,
  Clock,
  Calendar,
} from 'lucide-react'
import { list, subscriptionStatus, cancelSubscription, tokenStore } from '@/lib/api'

interface SubStatus {
  plan: 'Free' | 'Premium'
  expiry: string
  playlistCount: number
  limits: {
    playlists: number
    skipsPerHour: number
    remainingSkips: number
  }
}

interface PaymentRecord {
  payment_id: number
  subscription_id?: number | null
  amount: number | string
  payment_mode?: string
  payment_date?: string
}

export default function BillingPage() {
  const [status, setStatus] = useState<SubStatus | null>(null)
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [cancelMessage, setCancelMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadBillingData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [s, p] = await Promise.all([
        subscriptionStatus(),
        list<PaymentRecord>('payment'),
      ])
      setStatus(s)
      setPayments(p)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to load billing details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!tokenStore.get()) {
      window.location.replace('/login')
      return
    }
    loadBillingData()
  }, [])

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your Premium subscription? You will revert to the Free tier immediately.')) {
      return
    }
    setCancelling(true)
    setCancelMessage(null)
    try {
      const res = await cancelSubscription()
      setCancelMessage(res.message || 'Subscription cancelled successfully.')
      await loadBillingData()
    } catch (err: any) {
      setError(err.message || 'Failed to cancel subscription.')
    } finally {
      setCancelling(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080b14] text-[#f5f7ff] pb-24 selection:bg-[#8b5cf6] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080b14]/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-[#8e97ac] hover:text-[#a78bfa] transition"
          >
            <ChevronLeft size={18} /> Back to Sonicly
          </a>
          <a
            href="/premium"
            className="flex items-center gap-1 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 px-3 py-1 text-xs font-semibold text-[#a78bfa] hover:bg-[#8b5cf6]/25 transition"
          >
            <Sparkles size={13} /> {status?.plan === 'Premium' ? 'Manage Plan' : 'Get Premium'}
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Billing & Subscriptions</h1>
            <p className="mt-1 text-sm text-[#8e97ac]">
              Manage your Sonicly membership, quotas, and demo payment transactions.
            </p>
          </div>
          <button
            onClick={loadBillingData}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#8e97ac] hover:text-white transition w-fit"
          >
            <RotateCcw size={13} /> Refresh
          </button>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {cancelMessage && (
          <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 p-4 text-xs text-[#a78bfa]">
            <CheckCircle2 size={16} />
            <span>{cancelMessage}</span>
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center text-sm text-[#8e97ac]">
            Loading billing records from CockroachDB...
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {/* Active Subscription Overview */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121727] to-[#0d101c] p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        status?.plan === 'Premium'
                          ? 'bg-[#8b5cf6] text-white shadow-sm shadow-[#8b5cf6]/25'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {status?.plan} Membership
                    </span>
                    {status?.plan === 'Premium' && (
                      <span className="flex items-center gap-1 text-xs text-[#a78bfa]">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-2xl font-bold">
                    {status?.plan === 'Premium'
                      ? 'Sonicly Premium Member'
                      : 'Free Listening Tier'}
                  </h2>
                  <p className="mt-1 text-xs text-[#8e97ac]">
                    {status?.plan === 'Premium'
                      ? `Valid until: ${status.expiry}`
                      : 'Basic tier with community limits. Upgrade anytime for limitless streaming.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {status?.plan === 'Premium' ? (
                    <button
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 active:scale-95 transition disabled:opacity-50"
                    >
                      {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
                    </button>
                  ) : (
                    <a
                      href="/premium"
                      className="rounded-xl bg-[#8b5cf6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/20 active:scale-95 transition"
                    >
                      Upgrade to Premium
                    </a>
                  )}
                </div>
              </div>

              {/* Usage Quotas */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 border-t border-white/10 pt-6">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-[#8e97ac]">Playlists Created</p>
                  <p className="mt-2 text-xl font-bold">
                    {status?.playlistCount ?? 0}
                    <span className="text-xs font-normal text-[#8e97ac]">
                      {status?.limits.playlists === -1 ? ' (Unlimited)' : ' / 3 allowed'}
                    </span>
                  </p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#8b5cf6] transition-all"
                      style={{
                        width:
                          status?.limits.playlists === -1
                            ? '100%'
                            : `${Math.min(100, ((status?.playlistCount ?? 0) / 3) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-[#8e97ac]">Hourly Skip Allowance</p>
                  <p className="mt-2 text-xl font-bold">
                    {status?.limits.remainingSkips === -1
                      ? 'Unlimited'
                      : `${status?.limits.remainingSkips} skips left`}
                  </p>
                  <p className="mt-1 text-[11px] text-[#697287]">
                    {status?.plan === 'Premium'
                      ? 'Unlimited track skips anytime'
                      : 'Resets every 60 minutes'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:col-span-2 md:col-span-1">
                  <p className="text-xs text-[#8e97ac]">Audio Quality Stream</p>
                  <p className="mt-2 text-xl font-bold text-[#a78bfa]">
                    {status?.plan === 'Premium' ? '320 kbps Lossless' : '160 kbps Standard'}
                  </p>
                  <p className="mt-1 text-[11px] text-[#697287]">
                    Backed by CockroachDB audio URLs
                  </p>
                </div>
              </div>
            </div>

            {/* Payment History Section */}
            <section className="rounded-3xl border border-white/10 bg-[#0d1220] p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Payment History</h2>
                  <p className="mt-0.5 text-xs text-[#8e97ac]">
                    Transactions associated with your authenticated account in CockroachDB.
                  </p>
                </div>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#8e97ac]">
                  {payments.length} {payments.length === 1 ? 'record' : 'records'}
                </span>
              </div>

              {payments.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-8 text-center text-xs text-[#8e97ac]">
                  No demo payment transactions recorded yet. Upgrade to Premium to generate a payment record.
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 uppercase tracking-wider text-[#697287]">
                        <th className="pb-3 font-semibold">Transaction ID</th>
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Payment Mode</th>
                        <th className="pb-3 font-semibold">Amount</th>
                        <th className="pb-3 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[#f5f7ff]/90">
                      {payments.map((p) => (
                        <tr key={p.payment_id} className="hover:bg-white/[0.02] transition">
                          <td className="py-3.5 font-mono text-white/80">
                            TXN-{String(p.payment_id).padStart(5, '0')}
                          </td>
                          <td className="py-3.5 text-[#8e97ac]">
                            {p.payment_date
                              ? new Date(p.payment_date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: '2-digit',
                                  year: 'numeric',
                                })
                              : 'Recent'}
                          </td>
                          <td className="py-3.5">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/90">
                              <CreditCard size={11} /> {p.payment_mode || 'UPI'}
                            </span>
                          </td>
                          <td className="py-3.5 font-semibold text-white">₹{p.amount}</td>
                          <td className="py-3.5 text-right">
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#a78bfa]">
                              <CheckCircle2 size={11} /> Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
