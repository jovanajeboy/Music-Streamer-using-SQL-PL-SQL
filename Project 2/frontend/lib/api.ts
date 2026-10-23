const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const tokenStore = {
  get: () => typeof window === 'undefined' ? null : localStorage.getItem('sonicly_token'),
  set: (token: string) => localStorage.setItem('sonicly_token', token),
  clear: () => localStorage.removeItem('sonicly_token'),
}

async function request(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(tokenStore.get() ? { Authorization: `Bearer ${tokenStore.get()}` } : {}),
        ...options.headers,
      },
    })

    const contentType = res.headers.get('content-type') || ''
    const data = contentType.includes('application/json')
      ? await res.json().catch(() => null)
      : await res.text().catch(() => null)

    if (!res.ok) {
      const message =
        (typeof data === 'object' && data && (data.error || data.message)) ||
        (typeof data === 'string' && data) ||
        `HTTP ${res.status}: ${res.statusText}`
      throw new Error(String(message))
    }

    return data
  } catch (err: any) {
    if (err.name === 'TypeError' || err.message?.includes('fetch') || err.message?.includes('Failed to fetch')) {
      throw new Error(
        `Unable to connect to the backend at ${API_BASE}. Make sure the Java backend is running on port 8080.`
      )
    }
    throw err
  }
}

export type SessionUser = { user_id: number; first_name: string; email: string }

export async function login(email: string, password: string) {
  const result = await request(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  tokenStore.set(result.token)
  return result as { token: string; user: SessionUser }
}

export async function register(first_name: string, email: string, password: string) {
  const result = await request(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ first_name, email, password }),
  })
  tokenStore.set(result.token)
  return result as { token: string; user: SessionUser }
}

export const me = () => request(`${API_BASE}/api/auth/me`) as Promise<SessionUser>

export const subscriptionStatus = () =>
  request(`${API_BASE}/api/subscription/status`) as Promise<{
    plan: 'Free' | 'Premium'
    expiry: string
    playlistCount: number
    limits: { playlists: number; skipsPerHour: number; remainingSkips: number }
  }>

export const cancelSubscription = () =>
  request(`${API_BASE}/api/subscription/cancel`, { method: 'POST' }) as Promise<{
    message: string
    plan: string
    rowsAffected: number
  }>

export const checkout = (plan: 'monthly' | 'annual', payment_mode: string = 'UPI') =>
  request(`${API_BASE}/api/billing/checkout`, {
    method: 'POST',
    body: JSON.stringify({ plan, payment_mode }),
  }) as Promise<{ message: string; plan: string; expiry: string; amount: number; payment_mode: string }>

export const recordSkip = () =>
  request(`${API_BASE}/api/player/skip`, { method: 'POST' }) as Promise<{
    allowed: boolean
    remaining: number
    plan: string
    error?: string
  }>

export const getStats = () =>
  request(`${API_BASE}/api/stats`) as Promise<Record<string, number>>

/**
 * Fetch all records for a table (GET /api/{table})
 */
export async function list<T = any>(table: string): Promise<T[]> {
  const result = await request(`${API_BASE}/api/${table}`)
  return Array.isArray(result) ? result : []
}

/**
 * Fetch a single record by primary key(s) (GET /api/{table}/{pk1}/{pk2}...)
 */
export async function get<T = any>(table: string, ...keys: (string | number)[]): Promise<T> {
  const path = keys.map((k) => encodeURIComponent(String(k))).join('/')
  return request(`${API_BASE}/api/${table}/${path}`)
}

/**
 * Create a new record (POST /api/{table})
 */
export async function create<T = any>(table: string, data: Record<string, any>): Promise<any> {
  return request(`${API_BASE}/api/${table}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Update an existing record (PUT /api/{table}/{pk1}/{pk2}...)
 */
export async function update<T = any>(
  table: string,
  data: Record<string, any>,
  ...keys: (string | number)[]
): Promise<any> {
  const path = keys.map((k) => encodeURIComponent(String(k))).join('/')
  return request(`${API_BASE}/api/${table}/${path}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Delete a record by primary key(s) (DELETE /api/{table}/{pk1}/{pk2}...)
 */
export async function remove(table: string, ...keys: (string | number)[]): Promise<any> {
  const path = keys.map((k) => encodeURIComponent(String(k))).join('/')
  return request(`${API_BASE}/api/${table}/${path}`, {
    method: 'DELETE',
  })
}
