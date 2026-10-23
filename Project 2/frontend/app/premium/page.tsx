'use client'

import { useState, useEffect } from 'react'
import {
  Check,
  ChevronLeft,
  CreditCard,
  QrCode,
  Building,
  ShieldCheck,
  Sparkles,
  Zap,
  Music,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import { checkout, subscriptionStatus, tokenStore } from '@/lib/api'

type PlanType = 'monthly' | 'annual'
type PaymentMode = 'UPI' | 'CARD' | 'NETBANKING'

export default function PremiumPage() {
  const [plan, setPlan] = useState<PlanType>('monthly')
  const [mode, setMode] = useState<PaymentMode>('UPI')
  const [upiId, setUpiId] = useState('')
  const [upiValid, setUpiValid] = useState<boolean | null>(null)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [selectedBank, setSelectedBank] = useState('HDFC Bank')

  const [processing, setProcessing] = useState(false)
  const [processStep, setProcessStep] = useState(1)
  const [successData, setSuccessData] = useState<{
    plan: string
    expiry: string
    amount: number
    payment_mode: string
  } | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [currentPlan, setCurrentPlan] = useState<string>('Free')

  useEffect(() => {
    if (!tokenStore.get()) {
      window.location.replace('/login')
      return
    }
    subscriptionStatus()
      .then((res) => setCurrentPlan(res.plan))
      .catch(() => setCurrentPlan('Free'))
  }, [])

  const price = plan === 'annual' ? 799 : 99
  const upiPayload = `upi://pay?pa=demo@upi&pn=Sonicly%20Music&am=${price}.00&cu=INR&tn=Sonicly%20${plan.toUpperCase()}%20Premium`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    upiPayload
  )}&bgcolor=ffffff&color=0b1016`

  const validateUpi = (val: string) => {
    setUpiId(val)
    if (!val.trim()) {
      setUpiValid(null)
      return
    }
    const isValid = /^[\w.-]+@[\w.-]+$/.test(val.trim())
    setUpiValid(isValid)
  }

  const handlePay = async () => {
    setErrorMsg(null)
    if (mode === 'UPI' && upiId.trim() && !upiValid) {
      setErrorMsg('Please enter a valid UPI ID (e.g. yourname@okhdfcbank).')
      return
    }
    if (mode === 'CARD') {
      if (cardNumber.replace(/\s/g, '').length < 12) {
        setErrorMsg('Please enter a valid card number.')
        return
      }
    }

    setProcessing(true)
    setProcessStep(1)

    try {
      // Realistic simulated payment processing flow
      await new Promise((r) => setTimeout(r, 650))
      setProcessStep(2)
      await new Promise((r) => setTimeout(r, 650))
      setProcessStep(3)

      const result = await checkout(plan, mode)
      await new Promise((r) => setTimeout(r, 400))
      setSuccessData(result)
      setCurrentPlan('Premium')
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Payment processing failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080b14] text-[#f5f7ff] pb-20 selection:bg-[#8b5cf6] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080b14]/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-[#8e97ac] hover:text-[#a78bfa] transition"
          >
            <ChevronLeft size={18} /> Back to Sonicly
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#8e97ac]">Current:</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                currentPlan === 'Premium'
                  ? 'border border-[#8b5cf6]/50 bg-[#8b5cf6]/15 text-[#a78bfa]'
                  : 'border border-white/20 bg-white/5 text-white/70'
              }`}
            >
              {currentPlan} Plan
            </span>
            <a
              href="/billing"
              className="text-xs font-medium text-[#8e97ac] hover:text-white transition"
            >
              Billing History
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-4 py-1.5 text-xs font-medium text-[#a78bfa]">
            <Sparkles size={14} /> DEMO PAYMENT SIMULATION · ZERO REAL CHARGES
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Elevate your sound with <span className="text-[#a78bfa]">Premium</span>
          </h1>
          <p className="mt-3 text-base text-[#8e97ac] max-w-2xl mx-auto">
            Enjoy limitless skips, uncapped playlist creation, hi-fi lossless streaming, and zero ads
            backed directly by your CockroachDB cluster.
          </p>
        </div>

        {/* Success Modal / State */}
        {successData && (
          <div className="mt-8 rounded-3xl border border-[#8b5cf6]/40 bg-[#111726] p-8 text-center max-w-xl mx-auto shadow-2xl animate-in fade-in zoom-in-95">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/25">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="mt-5 text-2xl font-bold">You&apos;re now on Sonicly Premium!</h2>
            <p className="mt-2 text-sm text-[#8e97ac]">
              Your subscription was recorded in CockroachDB and payment transaction verified.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8e97ac]">Plan</span>
                <span className="font-semibold text-[#a78bfa]">{successData.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e97ac]">Amount Paid (Demo)</span>
                <span className="font-semibold">₹{successData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e97ac]">Payment Method</span>
                <span className="font-semibold">{successData.payment_mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e97ac]">Active Until</span>
                <span className="font-semibold text-white">{successData.expiry}</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <a
                href="/"
                className="rounded-xl bg-[#8b5cf6] px-6 py-3 text-sm font-bold text-white hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/20 transition"
              >
                Start Listening Now
              </a>
              <a
                href="/billing"
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 transition"
              >
                View in Billing
              </a>
            </div>
          </div>
        )}

        {!successData && (
          <>
            {/* Plan Selector Cards */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {/* Monthly Plan */}
              <button
                type="button"
                onClick={() => setPlan('monthly')}
                className={`group relative rounded-3xl border p-6 text-left transition-all ${
                  plan === 'monthly'
                    ? 'border-[#8b5cf6] bg-gradient-to-b from-[#8b5cf6]/15 to-transparent shadow-[0_0_30px_rgba(139,92,246,0.2)] ring-1 ring-[#8b5cf6]'
                    : 'border-white/10 bg-[#0f1424]/60 hover:border-white/25 hover:bg-[#0f1424]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8e97ac]">
                    Standard Plan
                  </span>
                  <div
                    className={`grid size-6 place-items-center rounded-full border transition ${
                      plan === 'monthly'
                        ? 'border-[#8b5cf6] bg-[#8b5cf6] text-white'
                        : 'border-white/30'
                    }`}
                  >
                    {plan === 'monthly' && <Check size={14} />}
                  </div>
                </div>
                <h3 className="mt-3 text-2xl font-bold">Monthly</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">₹99</span>
                  <span className="text-sm text-[#8e97ac]">/ month</span>
                </div>
                <p className="mt-3 text-xs text-[#8e97ac]">
                  Cancel anytime in your billing dashboard. Perfect for flexible listening.
                </p>
              </button>

              {/* Annual Plan */}
              <button
                type="button"
                onClick={() => setPlan('annual')}
                className={`group relative rounded-3xl border p-6 text-left transition-all ${
                  plan === 'annual'
                    ? 'border-[#8b5cf6] bg-gradient-to-b from-[#8b5cf6]/20 to-transparent shadow-[0_0_35px_rgba(139,92,246,0.25)] ring-1 ring-[#8b5cf6]'
                    : 'border-white/10 bg-[#0f1424]/60 hover:border-white/25 hover:bg-[#0f1424]'
                }`}
              >
                <div className="absolute -top-3 right-6 rounded-full bg-[#8b5cf6] px-3 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider shadow-md shadow-[#8b5cf6]/30">
                  Save 33% · Best Value
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                    Annual Pass
                  </span>
                  <div
                    className={`grid size-6 place-items-center rounded-full border transition ${
                      plan === 'annual'
                        ? 'border-[#8b5cf6] bg-[#8b5cf6] text-white'
                        : 'border-white/30'
                    }`}
                  >
                    {plan === 'annual' && <Check size={14} />}
                  </div>
                </div>
                <h3 className="mt-3 text-2xl font-bold">Annual</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">₹799</span>
                  <span className="text-sm text-[#8e97ac]">/ year</span>
                </div>
                <p className="mt-3 text-xs text-[#8e97ac]">
                  Just ~₹66/month. Includes 12 full months of uninterrupted high fidelity audio.
                </p>
              </button>
            </div>

            {/* Comparison Matrix */}
            <div className="mt-14 max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#0d1220] p-6 md:p-8">
              <h2 className="text-lg font-bold">Plan Comparison</h2>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase text-[#8e97ac]">
                      <th className="py-3 font-semibold">Features</th>
                      <th className="py-3 font-semibold text-center w-28">Free Plan</th>
                      <th className="py-3 font-semibold text-center w-36 text-[#a78bfa]">
                        Premium Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3.5 text-white/90">Playlists Quota</td>
                      <td className="py-3.5 text-center text-[#8e97ac]">Max 3 Playlists</td>
                      <td className="py-3.5 text-center font-semibold text-[#a78bfa]">
                        Unlimited
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 text-white/90">Skip Allowance</td>
                      <td className="py-3.5 text-center text-[#8e97ac]">6 skips / hour</td>
                      <td className="py-3.5 text-center font-semibold text-[#a78bfa]">
                        Unlimited Skips
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 text-white/90">Audio Quality</td>
                      <td className="py-3.5 text-center text-[#8e97ac]">160 kbps Standard</td>
                      <td className="py-3.5 text-center font-semibold text-[#a78bfa]">
                        320 kbps Lossless
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 text-white/90">Commercial Ads</td>
                      <td className="py-3.5 text-center text-[#8e97ac]">Banner ads included</td>
                      <td className="py-3.5 text-center font-semibold text-[#a78bfa]">
                        100% Ad-Free
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 text-white/90">Offline Caching</td>
                      <td className="py-3.5 text-center text-[#8e97ac]">—</td>
                      <td className="py-3.5 text-center font-semibold text-[#a78bfa]">
                        Supported
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Gateway Box */}
            <section className="mt-10 max-w-xl mx-auto rounded-3xl border border-white/10 bg-[#0f1424] p-6 md:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold">Checkout (Demo UPI / Card)</h2>
                  <p className="text-xs text-[#8e97ac] mt-0.5">
                    Selected:{' '}
                    <span className="font-semibold text-white">
                      {plan === 'annual' ? 'Annual (₹799/yr)' : 'Monthly (₹99/mo)'}
                    </span>
                  </p>
                </div>
                <span className="text-2xl font-extrabold text-[#a78bfa]">₹{price}</span>
              </div>

              {/* Mode Tabs */}
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-black/30 p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setMode('UPI')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                    mode === 'UPI'
                      ? 'bg-[#8b5cf6] text-white shadow-sm shadow-[#8b5cf6]/20'
                      : 'text-[#8e97ac] hover:text-white'
                  }`}
                >
                  <QrCode size={14} /> UPI / QR
                </button>
                <button
                  type="button"
                  onClick={() => setMode('CARD')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                    mode === 'CARD'
                      ? 'bg-[#8b5cf6] text-white shadow-sm shadow-[#8b5cf6]/20'
                      : 'text-[#8e97ac] hover:text-white'
                  }`}
                >
                  <CreditCard size={14} /> Card
                </button>
                <button
                  type="button"
                  onClick={() => setMode('NETBANKING')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                    mode === 'NETBANKING'
                      ? 'bg-[#8b5cf6] text-white shadow-sm shadow-[#8b5cf6]/20'
                      : 'text-[#8e97ac] hover:text-white'
                  }`}
                >
                  <Building size={14} /> Net Banking
                </button>
              </div>

              {/* UPI Tab View */}
              {mode === 'UPI' && (
                <div className="mt-6 space-y-5">
                  <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="overflow-hidden rounded-xl border border-white/20 bg-white p-2 shadow-inner">
                      <img
                        src={qrUrl}
                        alt="Demo UPI QR Code"
                        className="size-36 object-contain"
                        loading="eager"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                        Instant QR Pay
                      </p>
                      <p className="mt-1 text-sm font-semibold">Scan with any UPI app</p>
                      <p className="mt-1 text-xs text-[#8e97ac]">
                        GPay, PhonePe, Paytm, BHIM, or Navi.
                      </p>
                      <div className="mt-3 inline-block rounded-lg bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/80 border border-white/10">
                        demo@upi · ₹{price}.00
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#8e97ac]">
                      Or pay using UPI ID / VPA
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => validateUpi(e.target.value)}
                        placeholder="e.g. yourname@oksbi or 9876543210@paytm"
                        className={`w-full rounded-xl border bg-black/30 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-[#525b6e] ${
                          upiValid === true
                            ? 'border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]'
                            : upiValid === false
                            ? 'border-red-500'
                            : 'border-white/15 focus:border-[#8b5cf6]'
                        }`}
                      />
                      {upiValid === true && (
                        <Check className="absolute right-3 top-3 text-[#a78bfa]" size={16} />
                      )}
                    </div>
                    {upiValid === false && (
                      <p className="mt-1 text-xs text-red-400">
                        Format should be username@bank (e.g. name@okaxis)
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Card Tab View */}
              {mode === 'CARD' && (
                <div className="mt-6 space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#8e97ac]">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, '')
                          .replace(/(.{4})/g, '$1 ')
                          .trim()
                        setCardNumber(val)
                      }}
                      placeholder="4532 •••• •••• 8892"
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-2.5 text-sm outline-none focus:border-[#8b5cf6]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#8e97ac]">Valid Thru</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-2.5 text-sm outline-none focus:border-[#8b5cf6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#8e97ac]">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-2.5 text-sm outline-none focus:border-[#8b5cf6]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8e97ac]">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-2.5 text-sm outline-none focus:border-[#8b5cf6]"
                    />
                  </div>
                </div>
              )}

              {/* Net Banking Tab View */}
              {mode === 'NETBANKING' && (
                <div className="mt-6 space-y-3">
                  <label className="block text-xs font-medium text-[#8e97ac]">Choose Your Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`rounded-xl border p-3 text-left text-xs font-medium transition ${
                          selectedBank === b
                            ? 'border-[#8b5cf6] bg-[#8b5cf6]/15 text-[#a78bfa]'
                            : 'border-white/10 bg-black/20 text-[#8e97ac] hover:border-white/20'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {errorMsg && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Pay Button / Simulated Processing */}
              <button
                type="button"
                onClick={handlePay}
                disabled={processing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8b5cf6] py-3.5 font-bold text-white shadow-lg shadow-[#8b5cf6]/25 hover:bg-[#7c3aed] active:scale-[0.99] transition disabled:opacity-60"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    {processStep === 1 && 'Connecting to Gateway...'}
                    {processStep === 2 && 'Authorizing Demo Payment...'}
                    {processStep === 3 && 'Updating CockroachDB...'}
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Confirm & Pay ₹{price} (Demo)
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[11px] text-[#697287]">
                🔒 256-bit Simulated Encrypted Transaction · Safe for Project Testing
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
