'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import { recordSkip } from '@/lib/api'

export type Playable = {
  id?: number
  title: string
  artist: string
  album?: string
  audioUrl?: string
  cover?: string
}

interface PlayerProps {
  item: Playable | null
  queue?: Playable[]
  currentIndex?: number
  isPremium?: boolean
  onNext?: () => void
  onPrevious?: () => void
  onSelectTrack?: (item: Playable) => void
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function Player({
  item,
  queue = [],
  currentIndex = -1,
  isPremium = false,
  onNext,
  onPrevious,
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [skipWarning, setSkipWarning] = useState<string | null>(null)

  // Handle source changes
  useEffect(() => {
    if (!item) {
      setPlaying(false)
      setCurrentTime(0)
      setDuration(0)
      return
    }

    const url = item.audioUrl || ''
    const isSpecial = url.startsWith('youtube:') || url.startsWith('spotify:')

    if (!isSpecial && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.load()
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch((err) => {
            console.warn('Autoplay prevented or interrupted by browser:', err)
            setPlaying(false)
          })
      }
    } else {
      setPlaying(true)
    }
    setSkipWarning(null)
  }, [item?.audioUrl, item?.title])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Skip handler enforcing free limits
  const handleSkip = useCallback(
    async (direction: 'next' | 'prev') => {
      setSkipWarning(null)
      try {
        if (!isPremium) {
          const res = await recordSkip()
          if (!res.allowed) {
            setSkipWarning(res.error || 'Hourly skip limit reached on Free plan. Upgrade to Premium for unlimited skips.')
            return
          }
        }
        if (direction === 'next' && onNext) {
          onNext()
        } else if (direction === 'prev' && onPrevious) {
          onPrevious()
        }
      } catch (err: any) {
        setSkipWarning(err.message || 'Skip limit reached.')
      }
    },
    [isPremium, onNext, onPrevious]
  )

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in form inputs
      const target = e.target as HTMLElement
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

      if (e.code === 'Space') {
        e.preventDefault()
        if (audioRef.current) {
          if (playing) {
            audioRef.current.pause()
            setPlaying(false)
          } else {
            audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
          }
        }
      } else if (e.code === 'ArrowRight') {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(audioRef.current.duration || 100, audioRef.current.currentTime + 5)
        }
      } else if (e.code === 'ArrowLeft') {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5)
        }
      } else if (e.code === 'ArrowUp') {
        e.preventDefault()
        setVolume((v) => Math.min(1, Math.round((v + 0.05) * 100) / 100))
        setIsMuted(false)
      } else if (e.code === 'ArrowDown') {
        e.preventDefault()
        setVolume((v) => Math.max(0, Math.round((v - 0.05) * 100) / 100))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playing])

  if (!item) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0c101d]/95 backdrop-blur-xl px-4 py-3 text-white transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-64 md:w-72">
            <div className="grid size-12 place-items-center rounded-lg bg-white/5 border border-white/10 text-[#697287]">
              <Music2 size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-white/80">Ready to play</p>
              <p className="text-xs text-[#697287]">Select any song to stream audio</p>
            </div>
          </div>
          <div className="flex flex-1 max-w-xl flex-col items-center gap-1.5">
            <div className="flex items-center gap-4">
              <button disabled aria-label="Previous track (disabled)" className="rounded-full p-2 text-[#697287]/40 cursor-not-allowed">
                <SkipBack size={18} />
              </button>
              <button disabled aria-label="Play track (disabled)" className="grid size-10 place-items-center rounded-full bg-white/10 text-[#697287] cursor-not-allowed">
                <Play size={18} className="translate-x-0.5" />
              </button>
              <button disabled aria-label="Next track (disabled)" className="rounded-full p-2 text-[#697287]/40 cursor-not-allowed">
                <SkipForward size={18} />
              </button>
            </div>
            <div className="flex w-full items-center gap-2 text-xs text-[#697287]">
              <span className="w-10 text-right">0:00</span>
              <div className="h-1 flex-1 rounded-full bg-white/10" />
              <span className="w-10">0:00</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 w-48 justify-end text-[#697287]">
            <Volume2 size={18} />
            <div className="h-1 w-24 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    )
  }

  const url = item.audioUrl || ''
  const ytId = url.startsWith('youtube:') ? url.slice(8).trim() : null
  const spotifyId = url.startsWith('spotify:') ? url.slice(8).trim() : null
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0c101d]/95 backdrop-blur-xl px-4 py-3 text-white transition-all shadow-2xl">
      {skipWarning && (
        <div className="mx-auto mb-2 flex max-w-4xl items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{skipWarning}</span>
          </div>
          <a
            href="/premium"
            className="flex items-center gap-1 font-semibold text-[#a78bfa] hover:text-[#c4b5fd] hover:underline"
          >
            Upgrade <ExternalLink size={12} />
          </a>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex min-w-0 items-center gap-3 w-64 md:w-72">
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              className="size-12 rounded-lg object-cover border border-white/10 shadow-md shrink-0"
            />
          ) : (
            <div className="grid size-12 place-items-center rounded-lg bg-gradient-to-br from-[#8b5cf6]/30 to-[#6366f1]/30 border border-white/10 text-white shrink-0">
              <Music2 size={20} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold tracking-tight text-white">{item.title}</p>
              {playing && (
                <span className="flex gap-0.5 items-end h-3 shrink-0">
                  <span className="w-0.5 h-3 bg-[#8b5cf6] animate-pulse" />
                  <span className="w-0.5 h-2 bg-[#a78bfa] animate-pulse delay-75" />
                  <span className="w-0.5 h-3.5 bg-[#8b5cf6] animate-pulse delay-150" />
                </span>
              )}
            </div>
            <p className="truncate text-xs text-[#8e97ac]">{item.artist}</p>
          </div>
        </div>

        {/* Media / Controls Center */}
        {ytId ? (
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-lg">
              <iframe
                title="YouTube Player"
                className="h-16 w-36 md:w-48"
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&enablejsapi=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSkip('prev')}
                aria-label="Previous track"
                className="rounded-full p-2 text-[#8e97ac] hover:bg-white/10 hover:text-white"
              >
                <SkipBack size={18} />
              </button>
              <button
                onClick={() => handleSkip('next')}
                aria-label="Next track"
                className="rounded-full p-2 text-[#8e97ac] hover:bg-white/10 hover:text-white"
              >
                <SkipForward size={18} />
              </button>
            </div>
          </div>
        ) : spotifyId ? (
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-lg">
              <iframe
                title="Spotify Embed"
                className="h-16 w-72 max-w-[50vw]"
                src={`https://open.spotify.com/embed/track/${spotifyId}`}
                allow="encrypted-media"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSkip('prev')}
                aria-label="Previous track"
                className="rounded-full p-2 text-[#8e97ac] hover:bg-white/10 hover:text-white"
              >
                <SkipBack size={18} />
              </button>
              <button
                onClick={() => handleSkip('next')}
                aria-label="Next track"
                className="rounded-full p-2 text-[#8e97ac] hover:bg-white/10 hover:text-white"
              >
                <SkipForward size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 max-w-xl flex-col items-center gap-1.5">
            <audio
              ref={audioRef}
              src={url}
              preload="auto"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={() => {
                setPlaying(false)
                handleSkip('next')
              }}
              onError={(e) => {
                console.warn('Audio playback error on source:', url, e)
              }}
            />

            {/* Playback Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSkip('prev')}
                aria-label="Previous track"
                className="rounded-full p-2 text-[#8e97ac] hover:bg-white/10 hover:text-white transition"
              >
                <SkipBack size={18} />
              </button>
              <button
                onClick={() => {
                  const a = audioRef.current
                  if (!a) return
                  if (playing) {
                    a.pause()
                    setPlaying(false)
                  } else {
                    a.play()
                      .then(() => setPlaying(true))
                      .catch((err) => {
                        console.error('Play error:', err)
                        setPlaying(false)
                      })
                  }
                }}
                aria-label={playing ? 'Pause' : 'Play'}
                className="grid size-10 place-items-center rounded-full bg-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/25 hover:bg-[#7c3aed] hover:scale-105 active:scale-95 transition"
              >
                {playing ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
              </button>
              <button
                onClick={() => handleSkip('next')}
                aria-label="Next track"
                className="rounded-full p-2 text-[#8e97ac] hover:bg-white/10 hover:text-white transition"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Seek Bar */}
            <div className="flex w-full items-center gap-2 text-xs text-[#8e97ac]">
              <span className="w-10 text-right font-mono">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  if (audioRef.current) audioRef.current.currentTime = v
                  setCurrentTime(v)
                }}
                aria-label="Seek track position"
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-[#8b5cf6]"
              />
              <span className="w-10 font-mono">{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* Volume & Right Controls */}
        <div className="hidden sm:flex items-center gap-3 w-48 justify-end">
          <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-[#8b5cf6]/15 px-2.5 py-1 text-[11px] font-semibold text-[#a78bfa] border border-[#8b5cf6]/30 mr-1">
            <span className="size-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
            HD Audio
          </div>
          <button
            onClick={() => setIsMuted((m) => !m)}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="text-[#8e97ac] hover:text-white transition"
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value))
              setIsMuted(false)
            }}
            aria-label="Volume slider"
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/20 accent-[#8b5cf6]"
          />
        </div>
      </div>
    </div>
  )
}


