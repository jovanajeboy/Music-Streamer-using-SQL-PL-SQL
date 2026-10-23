'use client'

import { useMemo, useState } from 'react'
import { create, remove, update } from '@/lib/api'

interface EntityMeta {
  keys: string[]
  columns: string[]
  sampleCreate: Record<string, unknown>
  sampleUpdate: Record<string, unknown>
  sampleKey: string
  note?: string
}

const entityMetadata: Record<string, EntityMeta> = {
  song: {
    keys: ['song_id'],
    columns: ['song_id', 'name', 'album_id', 'artist_id', 'duration', 'release_date', 'audio_url'],
    sampleCreate: {
      name: 'Tum Hi Ho (Acoustic)',
      artist_id: 3,
      album_id: 2,
      duration: 262,
      release_date: '2013-04-08',
      audio_url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a',
    },
    sampleUpdate: {
      name: 'Tum Hi Ho (Acoustic Version)',
    },
    sampleKey: '3',
    note: 'Column for track title is "name" (aliases like "title" are also automatically accepted).',
  },
  album: {
    keys: ['album_id'],
    columns: ['album_id', 'artist_id', 'album_title', 'release_date', 'cover_page'],
    sampleCreate: {
      artist_id: 1,
      album_title: 'Aashiqui 2 Deluxe',
      release_date: '2013-04-26',
      cover_page: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    },
    sampleUpdate: {
      album_title: 'Aashiqui 2 (Remastered)',
    },
    sampleKey: '1',
    note: 'Column for album title is "album_title" (the alias "title" is also accepted).',
  },
  artist: {
    keys: ['artist_id'],
    columns: ['artist_id', 'name', 'bio', 'social_media'],
    sampleCreate: {
      name: 'Arijit Singh',
      bio: 'Indian playback singer and music composer.',
      social_media: '@arijitsingh',
    },
    sampleUpdate: {
      bio: 'Acclaimed Indian playback singer and global recording artist.',
    },
    sampleKey: '1',
  },
  playlist: {
    keys: ['playlist_id'],
    columns: ['playlist_id', 'user_id', 'playlist_name', 'created_date', 'visibility'],
    sampleCreate: {
      playlist_name: 'Late Night Chill',
      visibility: 'PUBLIC',
    },
    sampleUpdate: {
      playlist_name: 'Midnight Vibes',
    },
    sampleKey: '1',
    note: 'Column for playlist name is "playlist_name" (alias "name" is also accepted).',
  },
  podcast: {
    keys: ['podcast_id'],
    columns: ['podcast_id', 'creator_id', 'title', 'language', 'release_date', 'description'],
    sampleCreate: {
      creator_id: 1,
      title: 'The Ranveer Show',
      language: 'Hindi',
      release_date: '2023-01-01',
      description: 'Deep conversations on spirituality, success, and science.',
    },
    sampleUpdate: {
      title: 'The Ranveer Show (TRS)',
    },
    sampleKey: '1',
  },
  episode: {
    keys: ['episode_id'],
    columns: ['episode_id', 'podcast_id', 'episode_no', 'title', 'duration', 'description', 'release_date', 'audio_url'],
    sampleCreate: {
      podcast_id: 1,
      episode_no: 101,
      title: 'Mastering Consistency',
      duration: 3600,
      description: 'How to stay disciplined every single day.',
      release_date: '2023-06-15',
      audio_url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4b/32/34/4b323497-d647-7977-3e11-d0a0b271d4fe/mzaf_16940800840505166415.plus.aac.p.m4a',
    },
    sampleUpdate: {
      title: 'Mastering Daily Consistency & Focus',
    },
    sampleKey: '1',
  },
  podcast_creator: {
    keys: ['creator_id'],
    columns: ['creator_id', 'email', 'bio'],
    sampleCreate: {
      email: 'creator@sonicly.com',
      bio: 'Creator and podcast host.',
    },
    sampleUpdate: {
      bio: 'Podcast host and digital creator.',
    },
    sampleKey: '1',
  },
  playlist_song: {
    keys: ['playlist_id', 'song_id'],
    columns: ['playlist_id', 'song_id', 'added_date'],
    sampleCreate: {
      playlist_id: 1,
      song_id: 2,
    },
    sampleUpdate: {
      added_date: '2024-01-01',
    },
    sampleKey: '1, 2',
  },
  user_artist: {
    keys: ['user_id', 'artist_id'],
    columns: ['user_id', 'artist_id', 'followed_date'],
    sampleCreate: {
      artist_id: 2,
    },
    sampleUpdate: {
      followed_date: '2024-01-01',
    },
    sampleKey: '1, 2',
  },
  subscription: {
    keys: ['subscription_id'],
    columns: ['subscription_id', 'user_id', 'plan_type', 'start_date', 'end_date'],
    sampleCreate: {
      plan_type: 'PREMIUM',
      start_date: '2024-01-01',
      end_date: '2025-01-01',
    },
    sampleUpdate: {
      end_date: '2025-12-31',
    },
    sampleKey: '1',
  },
  device: {
    keys: ['device_id'],
    columns: ['device_id', 'user_id', 'os', 'device_type'],
    sampleCreate: {
      os: 'Windows 11',
      device_type: 'Desktop',
    },
    sampleUpdate: {
      os: 'Windows 11 Pro',
    },
    sampleKey: '1',
  },
  payment: {
    keys: ['payment_id'],
    columns: ['payment_id', 'user_id', 'subscription_id', 'amount', 'payment_mode', 'payment_date'],
    sampleCreate: {
      subscription_id: 1,
      amount: 9.99,
      payment_mode: 'CREDIT_CARD',
      payment_date: '2024-01-01',
    },
    sampleUpdate: {
      amount: 11.99,
    },
    sampleKey: '1',
  },
  app_user: {
    keys: ['user_id'],
    columns: ['user_id', 'first_name', 'middle_name', 'last_name', 'email', 'phone_no', 'gender', 'dob'],
    sampleCreate: {
      first_name: 'Rahul',
      last_name: 'Sharma',
      email: 'rahul@example.com',
      dob: '1998-05-12',
    },
    sampleUpdate: {
      first_name: 'Rahul',
      last_name: 'Verma',
    },
    sampleKey: '1',
  },
}

type Entity = keyof typeof entityMetadata

function parseJson(value: string) {
  const parsed: unknown = JSON.parse(value)
  if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error('Enter a JSON object.')
  return parsed as Record<string, unknown>
}

export function DataManager({ onSaved }: { onSaved: () => Promise<void> }) {
  const [entity, setEntity] = useState<Entity>('song')
  const meta = useMemo(() => entityMetadata[entity] || entityMetadata.song, [entity])
  const [payload, setPayload] = useState(JSON.stringify(meta.sampleUpdate, null, 2))
  const [keys, setKeys] = useState(meta.sampleKey)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleEntityChange = (newEntity: Entity) => {
    setEntity(newEntity)
    const newMeta = entityMetadata[newEntity]
    setKeys(newMeta.sampleKey)
    setPayload(JSON.stringify(newMeta.sampleUpdate, null, 2))
    setMessage(null)
  }

  const fillSample = (type: 'create' | 'update') => {
    if (type === 'create') {
      setPayload(JSON.stringify(meta.sampleCreate, null, 2))
      setKeys('')
    } else {
      setPayload(JSON.stringify(meta.sampleUpdate, null, 2))
      setKeys(meta.sampleKey)
    }
    setMessage(null)
  }

  const keyValues = () => keys.split(',').map((key) => key.trim()).filter(Boolean)

  const run = async (action: 'create' | 'update' | 'delete') => {
    try {
      setMessage(null)
      setIsSuccess(false)
      const values = keyValues()
      if (action !== 'create' && values.length !== meta.keys.length) {
        throw new Error(`Provide ${meta.keys.join(', ')} as comma-separated values (e.g. "${meta.sampleKey}").`)
      }
      if (action === 'create') await create(entity, parseJson(payload))
      if (action === 'update') await update(entity, parseJson(payload), ...values)
      if (action === 'delete') await remove(entity, ...values)
      await onSaved()
      setIsSuccess(true)
      setMessage(`Success! ${action.toUpperCase()} on '${entity}' completed and CockroachDB state reloaded.`)
    } catch (error) {
      setIsSuccess(false)
      setMessage(error instanceof Error ? error.message : 'Unable to save changes.')
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Database & CRUD Manager</h2>
          <p className="mt-1 text-sm text-[#8e97ac]">
            Direct generic REST CRUD interface to CockroachDB backend (<code className="text-[#a78bfa]">/api/{'{table}'}</code>).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fillSample('update')}
            className="rounded-lg border border-[#8b5cf6]/40 bg-[#8b5cf6]/10 px-3 py-1.5 text-xs font-medium text-[#c4b5fd] hover:bg-[#8b5cf6]/20 transition"
          >
            Load Sample (Update)
          </button>
          <button
            type="button"
            onClick={() => fillSample('create')}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 transition"
          >
            Load Sample (Create)
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-white/90">
          Entity (Table)
          <select
            value={entity}
            onChange={(e) => handleEntityChange(e.target.value as Entity)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#0c101d] p-3 text-sm text-white focus:border-[#8b5cf6] focus:outline-none transition"
          >
            {Object.keys(entityMetadata).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-white/90">
          Primary Keys for Update/Delete ({meta.keys.join(', ')})
          <input
            value={keys}
            onChange={(e) => setKeys(e.target.value)}
            placeholder={`e.g. ${meta.sampleKey}`}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#0c101d] p-3 text-sm text-white placeholder-white/30 focus:border-[#8b5cf6] focus:outline-none transition"
          />
        </label>
      </div>

      {/* Valid Columns Badge List */}
      <div className="mt-4 rounded-xl border border-white/5 bg-[#0c101d]/60 p-3">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Valid Database Columns for <strong className="text-[#a78bfa]">{entity}</strong>:</span>
          <span className="text-[11px] text-white/40">Primary key: {meta.keys.join(', ')}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {meta.columns.map((col) => {
            const isPk = meta.keys.includes(col)
            return (
              <span
                key={col}
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono ${
                  isPk
                    ? 'border border-[#8b5cf6]/60 bg-[#8b5cf6]/20 text-[#ddd6fe] font-semibold'
                    : 'border border-white/10 bg-white/5 text-white/80'
                }`}
              >
                {col} {isPk && '🔑'}
              </span>
            )
          })}
        </div>
        {meta.note && (
          <p className="mt-2 text-xs text-[#a78bfa]/90 flex items-center gap-1.5">
            <span>💡</span> {meta.note}
          </p>
        )}
      </div>

      <label className="mt-4 block text-sm font-medium text-white/90">
        JSON payload
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={7}
          spellCheck={false}
          className="mt-2 w-full rounded-xl border border-white/10 bg-[#0c101d] p-3 font-mono text-xs text-white placeholder-white/30 focus:border-[#8b5cf6] focus:outline-none transition"
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => run('create')}
          className="rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#8b5cf6]/25 transition"
        >
          Create (POST)
        </button>
        <button
          type="button"
          onClick={() => run('update')}
          className="rounded-xl border border-[#8b5cf6]/50 bg-[#8b5cf6]/10 hover:bg-[#8b5cf6]/20 px-5 py-2.5 text-sm font-semibold text-white transition"
        >
          Update (PUT)
        </button>
        <button
          type="button"
          onClick={() => run('delete')}
          className="rounded-xl border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 px-5 py-2.5 text-sm font-semibold text-red-300 transition"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => {
            setPayload('{}')
            setKeys('')
            setMessage(null)
          }}
          className="ml-auto text-xs text-white/50 hover:text-white transition"
        >
          Clear Fields
        </button>
      </div>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-xl border p-3.5 text-sm transition ${
            isSuccess
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {message}
        </div>
      )}
    </section>
  )
}

