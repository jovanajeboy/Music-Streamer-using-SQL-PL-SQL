'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Disc3,
  Home,
  Library,
  ListMusic,
  Mic2,
  Music2,
  Play,
  Plus,
  Search,
  Trash2,
  UserRound,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Database,
  ExternalLink,
  AlertCircle,
  Check,
  LogOut,
  Radio,
  Sliders,
  X,
  Clock,
  Calendar,
  Pencil,
} from 'lucide-react'
import {
  create,
  list,
  remove,
  update,
  tokenStore,
  me,
  subscriptionStatus,
  getStats,
  type SessionUser,
} from '@/lib/api'
import { DataManager } from '@/components/data-manager'
import { Player, type Playable } from '@/components/player'

export type Song = {
  id: number
  title: string
  artist: string
  artistId: number
  album: string
  albumId?: number | null
  duration: string
  durationSec: number
  audioUrl?: string
  cover?: string
}

export type Playlist = {
  id: number
  userId: number
  name: string
  description: string
  createdAt: string
  songs: number
}

export type Artist = {
  id: number
  name: string
  genre: string
  followers: number
  accent: string
}

export type Album = {
  id: number
  artistId: number
  title: string
  artist: string
  releaseDate: string
  coverPage?: string
  tracks: number
}

export type Podcast = {
  id: number
  creatorId: number
  title: string
  creator: string
  language: string
  episodes: number
}

export type Episode = {
  id: number
  podcastId: number
  episodeNo: number
  title: string
  duration: string
  durationSec: number
  description?: string
  releaseDate?: string
  audioUrl?: string
}

interface DbArtist {
  artist_id: number
  name: string
  bio?: string
  social_media?: string
}

interface DbAlbum {
  album_id: number
  artist_id: number
  album_title: string
  release_date?: string
  cover_page?: string
}

interface DbSong {
  song_id: number
  album_id?: number | null
  artist_id: number
  name: string
  duration?: number | null
  release_date?: string
  audio_url?: string
}

interface DbPlaylist {
  playlist_id: number
  user_id: number
  playlist_name: string
  created_date?: string
  visibility?: string
}

interface DbPlaylistSong {
  playlist_id: number
  song_id: number
  added_date?: string
}

interface DbUserArtist {
  user_id: number
  artist_id: number
  followed_date?: string
}

interface DbPodcastCreator {
  creator_id: number
  email: string
  bio?: string
}

interface DbPodcast {
  podcast_id: number
  creator_id: number
  title: string
  language?: string
  release_date?: string
  description?: string
}

interface DbEpisode {
  episode_id: number
  podcast_id: number
  episode_no: number
  title: string
  duration?: number | null
  description?: string
  release_date?: string
  audio_url?: string
}

const ACCENT_COLORS = [
  'from-[#8b5cf6] to-[#6366f1]',
  'from-[#e9d5ff] to-[#7b8dff]',
  'from-[#ffcf70] to-[#f07caa]',
  'from-[#80a7ff] to-[#c6a7ff]',
]

function formatDuration(seconds: number | string | null | undefined): string {
  const total = Number(seconds) || 0
  const m = Math.floor(total / 60)
  const s = Math.floor(total % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

type ViewState =
  | { type: 'Overview' }
  | { type: 'Search' }
  | { type: 'Library'; tab?: 'playlists' | 'artists' | 'albums' | 'songs' }
  | { type: 'Playlists' }
  | { type: 'Artists' }
  | { type: 'Podcasts' }
  | { type: 'ArtistDetail'; artistId: number }
  | { type: 'AlbumDetail'; albumId: number }
  | { type: 'PlaylistDetail'; playlistId: number }
  | { type: 'PodcastDetail'; podcastId: number }
  | { type: 'DataManager' }

export default function Page() {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null)
  const [plan, setPlan] = useState<'Free' | 'Premium'>('Free')
  const [stats, setStats] = useState<Record<string, number>>({})

  // Catalog State
  const [songs, setSongs] = useState<Song[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [playlistSongs, setPlaylistSongs] = useState<DbPlaylistSong[]>([])
  const [followedArtistIds, setFollowedArtistIds] = useState<number[]>([])

  // Player & Queue State
  const [nowPlaying, setNowPlaying] = useState<Playable | null>(null)
  const [queue, setQueue] = useState<Playable[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)

  // Navigation History
  const [history, setHistory] = useState<ViewState[]>([{ type: 'Overview' }])
  const [historyIndex, setHistoryIndex] = useState(0)
  const currentView = history[historyIndex] || { type: 'Overview' }

  const navigateTo = (view: ViewState) => {
    const updated = history.slice(0, historyIndex + 1)
    updated.push(view)
    setHistory(updated)
    setHistoryIndex(updated.length - 1)
  }

  const goBack = () => {
    if (historyIndex > 0) setHistoryIndex(historyIndex - 1)
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1)
  }

  // Search & Filter State
  const [query, setQuery] = useState('')
  const [searchCategory, setSearchCategory] = useState<'all' | 'songs' | 'artists' | 'albums' | 'podcasts'>('all')

  // Creation State
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [newArtistName, setNewArtistName] = useState('')
  const [newArtistBio, setNewArtistBio] = useState('')
  const [newAlbumTitle, setNewAlbumTitle] = useState('')
  const [newAlbumArtistId, setNewAlbumArtistId] = useState<number | ''>('')
  const [newPodcastTitle, setNewPodcastTitle] = useState('')

  // Inline song addition to album state
  const [newSongTitle, setNewSongTitle] = useState('')
  const [newSongDuration, setNewSongDuration] = useState('210')
  const [newSongAudioUrl, setNewSongAudioUrl] = useState('')

  // Inline episode addition to podcast state
  const [newEpTitle, setNewEpTitle] = useState('')
  const [newEpNo, setNewEpNo] = useState('1')
  const [newEpDuration, setNewEpDuration] = useState('1800')
  const [newEpAudioUrl, setNewEpAudioUrl] = useState('')

  // Adding song to playlist dropdown state
  const [selectedSongToAddToPlaylist, setSelectedSongToAddToPlaylist] = useState<number | ''>('')

  // Rename playlist state
  const [editingPlaylistId, setEditingPlaylistId] = useState<number | null>(null)
  const [editingPlaylistName, setEditingPlaylistName] = useState('')

  // UI status
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const showNotification = (msg: string) => {
    setActionSuccess(msg)
    setTimeout(() => setActionSuccess(null), 3500)
  }

  // Load All Catalog Data
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [
        artistsRes,
        albumsRes,
        songsRes,
        playlistsRes,
        playlistSongsRes,
        userArtistsRes,
        creatorsRes,
        podcastsRes,
        episodesRes,
        statsRes,
      ] = await Promise.all([
        list<DbArtist>('artist'),
        list<DbAlbum>('album'),
        list<DbSong>('song'),
        list<DbPlaylist>('playlist'),
        list<DbPlaylistSong>('playlist_song'),
        list<DbUserArtist>('user_artist'),
        list<DbPodcastCreator>('podcast_creator'),
        list<DbPodcast>('podcast'),
        list<DbEpisode>('episode'),
        getStats().catch(() => ({})),
      ])

      const artistMap = new Map(artistsRes.map((a) => [a.artist_id, a.name]))
      const albumMap = new Map(albumsRes.map((al) => [al.album_id, al.album_title]))
      const albumCoverMap = new Map(albumsRes.map((al) => [al.album_id, al.cover_page]))
      const creatorMap = new Map(creatorsRes.map((c) => [c.creator_id, c.email]))

      const mappedSongs: Song[] = songsRes.map((s) => ({
        id: s.song_id,
        title: s.name,
        artistId: s.artist_id,
        artist: artistMap.get(s.artist_id) || 'Unknown Artist',
        albumId: s.album_id,
        album: (s.album_id && albumMap.get(s.album_id)) || 'Single',
        duration: formatDuration(s.duration),
        durationSec: Number(s.duration) || 0,
        audioUrl: s.audio_url,
        cover: (s.album_id && albumCoverMap.get(s.album_id)) || undefined,
      }))

      const mappedArtists: Artist[] = artistsRes.map((a, idx) => {
        const followersCount = userArtistsRes.filter((ua) => ua.artist_id === a.artist_id).length
        return {
          id: a.artist_id,
          name: a.name,
          genre: a.bio || 'Independent',
          followers: followersCount,
          accent: ACCENT_COLORS[idx % ACCENT_COLORS.length],
        }
      })

      const mappedPlaylists: Playlist[] = playlistsRes.map((p) => {
        const count = playlistSongsRes.filter((ps) => ps.playlist_id === p.playlist_id).length
        const dateStr = p.created_date
          ? new Date(p.created_date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
          : 'Recently'
        return {
          id: p.playlist_id,
          userId: p.user_id,
          name: p.playlist_name,
          description: 'Personal playlist',
          createdAt: dateStr,
          songs: count,
        }
      })

      const mappedAlbums: Album[] = albumsRes.map((al) => {
        const trackCount = songsRes.filter((s) => s.album_id === al.album_id).length
        const dateStr = al.release_date
          ? new Date(al.release_date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
          : 'Recent'
        return {
          id: al.album_id,
          artistId: al.artist_id,
          title: al.album_title,
          artist: artistMap.get(al.artist_id) || 'Unknown Artist',
          releaseDate: dateStr,
          coverPage: al.cover_page,
          tracks: trackCount,
        }
      })

      const mappedPodcasts: Podcast[] = podcastsRes.map((p) => {
        const epCount = episodesRes.filter((e) => e.podcast_id === p.podcast_id).length
        const creatorEmail = creatorMap.get(p.creator_id)
        return {
          id: p.podcast_id,
          creatorId: p.creator_id,
          title: p.title,
          creator: creatorEmail ? creatorEmail.split('@')[0] : 'Sonicly Studio',
          language: p.language || 'English',
          episodes: epCount,
        }
      })

      const mappedEpisodes: Episode[] = episodesRes.map((e) => ({
        id: e.episode_id,
        podcastId: e.podcast_id,
        episodeNo: e.episode_no,
        title: e.title,
        duration: formatDuration(e.duration),
        durationSec: Number(e.duration) || 0,
        description: e.description,
        releaseDate: e.release_date,
        audioUrl: e.audio_url,
      }))

      setSongs(mappedSongs)
      setArtists(mappedArtists)
      setPlaylists(mappedPlaylists)
      setAlbums(mappedAlbums)
      setPodcasts(mappedPodcasts)
      setEpisodes(mappedEpisodes)
      setPlaylistSongs(playlistSongsRes)
      setFollowedArtistIds(userArtistsRes.map((ua) => ua.artist_id))
      setStats(statsRes)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Unable to connect to CockroachDB backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial Authentication & Subscription check
  useEffect(() => {
    if (!tokenStore.get()) {
      window.location.replace('/login')
      return
    }
    me()
      .then((user) => setCurrentUser(user))
      .catch(() => {
        tokenStore.clear()
        window.location.replace('/login')
      })

    subscriptionStatus()
      .then((status) => setPlan(status.plan))
      .catch(() => setPlan('Free'))

    loadData()
  }, [loadData])

  // Playback helper
  const songToPlayable = (s: Song): Playable => ({
    id: s.id,
    title: s.title,
    artist: s.artist,
    album: s.album,
    audioUrl: s.audioUrl,
    cover: s.cover,
  })

  const playSongList = (trackList: Song[], startIndex: number = 0) => {
    if (!trackList.length) return
    const playables = trackList.map(songToPlayable)
    playTrackList(playables, startIndex)
  }

  const playTrackList = (trackList: Playable[], startIndex: number = 0) => {
    if (!trackList.length) return
    setQueue(trackList)
    setCurrentIndex(startIndex)
    setNowPlaying(trackList[startIndex])
  }

  const handleNextTrack = () => {
    if (queue.length === 0) return
    const nextIdx = (currentIndex + 1) % queue.length
    setCurrentIndex(nextIdx)
    setNowPlaying(queue[nextIdx])
  }

  const handlePrevTrack = () => {
    if (queue.length === 0) return
    const prevIdx = (currentIndex - 1 + queue.length) % queue.length
    setCurrentIndex(prevIdx)
    setNowPlaying(queue[prevIdx])
  }

  // Follow / Unfollow Artist
  const toggleFollowArtist = async (artistId: number) => {
    if (!currentUser) return
    const isFollowed = followedArtistIds.includes(artistId)
    try {
      if (isFollowed) {
        await remove('user_artist', currentUser.user_id, artistId)
        setFollowedArtistIds((prev) => prev.filter((id) => id !== artistId))
        showNotification('Unfollowed artist.')
      } else {
        await create('user_artist', { user_id: currentUser.user_id, artist_id: artistId })
        setFollowedArtistIds((prev) => [...prev, artistId])
        showNotification('Artist followed!')
      }
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Playlist Actions
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim() || !currentUser) return
    try {
      await create('playlist', {
        user_id: currentUser.user_id,
        playlist_name: newPlaylistName.trim(),
        visibility: 'PRIVATE',
      })
      setNewPlaylistName('')
      showNotification('Playlist created successfully.')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeletePlaylist = async (id: number) => {
    if (!confirm('Are you sure you want to delete this playlist?')) return
    try {
      await remove('playlist', id)
      showNotification('Playlist deleted.')
      if (currentView.type === 'PlaylistDetail' && currentView.playlistId === id) {
        navigateTo({ type: 'Playlists' })
      }
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleUpdatePlaylistName = async (id: number) => {
    if (!editingPlaylistName.trim()) return
    try {
      await update('playlist', { playlist_name: editingPlaylistName.trim() }, id)
      showNotification('Playlist renamed successfully.')
      setEditingPlaylistId(null)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Playlist Song Actions
  const handleAddSongToPlaylist = async (playlistId: number, songId: number) => {
    try {
      await create('playlist_song', { playlist_id: playlistId, song_id: songId })
      showNotification('Song added to playlist.')
      setSelectedSongToAddToPlaylist('')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleRemoveSongFromPlaylist = async (playlistId: number, songId: number) => {
    try {
      await remove('playlist_song', playlistId, songId)
      showNotification('Song removed from playlist.')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Artist Actions
  const handleCreateArtist = async () => {
    if (!newArtistName.trim()) return
    try {
      await create('artist', {
        name: newArtistName.trim(),
        bio: newArtistBio.trim() || 'Independent Artist',
        social_media: `@${newArtistName.trim().toLowerCase().replace(/\s+/g, '')}`,
      })
      setNewArtistName('')
      setNewArtistBio('')
      showNotification('Artist added successfully.')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteArtist = async (id: number) => {
    if (!confirm('Delete this artist? This will cascade remove their albums and songs.')) return
    try {
      await remove('artist', id)
      showNotification('Artist deleted.')
      if (currentView.type === 'ArtistDetail' && currentView.artistId === id) {
        navigateTo({ type: 'Artists' })
      }
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Album Actions
  const handleCreateAlbum = async () => {
    if (!newAlbumTitle.trim() || !newAlbumArtistId) {
      setError('Please provide an album title and select an artist.')
      return
    }
    try {
      await create('album', {
        album_title: newAlbumTitle.trim(),
        artist_id: Number(newAlbumArtistId),
        release_date: new Date().toISOString().slice(0, 10),
      })
      setNewAlbumTitle('')
      showNotification('Album created successfully.')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteAlbum = async (id: number) => {
    if (!confirm('Delete this album? This will cascade remove its songs.')) return
    try {
      await remove('album', id)
      showNotification('Album deleted.')
      if (currentView.type === 'AlbumDetail' && currentView.albumId === id) {
        navigateTo({ type: 'Library', tab: 'albums' })
      }
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Song Actions
  const handleCreateSongInAlbum = async (albumId: number, artistId: number) => {
    if (!newSongTitle.trim()) return
    try {
      await create('song', {
        name: newSongTitle.trim(),
        album_id: albumId,
        artist_id: artistId,
        duration: Number(newSongDuration) || 180,
        release_date: new Date().toISOString().slice(0, 10),
        audio_url: newSongAudioUrl.trim() || undefined,
      })
      setNewSongTitle('')
      setNewSongAudioUrl('')
      showNotification('Song added to album!')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteSong = async (id: number) => {
    if (!confirm('Delete this track?')) return
    try {
      await remove('song', id)
      showNotification('Track deleted.')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Podcast Actions
  const handleCreatePodcast = async () => {
    if (!newPodcastTitle.trim()) return
    try {
      // Find or create a creator
      let creators = await list<DbPodcastCreator>('podcast_creator')
      let cId: number
      if (creators.length === 0) {
        await create('podcast_creator', {
          email: `${currentUser?.first_name.toLowerCase() || 'creator'}@sonicly.fm`,
          bio: 'Sonicly Creator',
        })
        creators = await list<DbPodcastCreator>('podcast_creator')
      }
      cId = creators[0].creator_id

      await create('podcast', {
        creator_id: cId,
        title: newPodcastTitle.trim(),
        language: 'English',
        release_date: new Date().toISOString().slice(0, 10),
      })
      setNewPodcastTitle('')
      showNotification('Podcast show created!')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeletePodcast = async (id: number) => {
    if (!confirm('Delete this podcast show?')) return
    try {
      await remove('podcast', id)
      showNotification('Podcast deleted.')
      if (currentView.type === 'PodcastDetail' && currentView.podcastId === id) {
        navigateTo({ type: 'Podcasts' })
      }
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Episode Actions
  const handleCreateEpisodeInPodcast = async (podcastId: number) => {
    if (!newEpTitle.trim()) return
    try {
      await create('episode', {
        podcast_id: podcastId,
        episode_no: Number(newEpNo) || 1,
        title: newEpTitle.trim(),
        duration: Number(newEpDuration) || 1200,
        release_date: new Date().toISOString().slice(0, 10),
        audio_url: newEpAudioUrl.trim() || undefined,
      })
      setNewEpTitle('')
      setNewEpAudioUrl('')
      setNewEpNo(String((Number(newEpNo) || 1) + 1))
      showNotification('Episode published!')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteEpisode = async (id: number) => {
    if (!confirm('Delete this episode?')) return
    try {
      await remove('episode', id)
      showNotification('Episode deleted.')
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Search Filtering
  const filteredSongs = useMemo(() => {
    if (!query.trim()) return songs
    const q = query.toLowerCase()
    return songs.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q) || s.album.toLowerCase().includes(q))
  }, [songs, query])

  const filteredArtists = useMemo(() => {
    if (!query.trim()) return artists
    return artists.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()) || a.genre.toLowerCase().includes(query.toLowerCase()))
  }, [artists, query])

  const filteredAlbums = useMemo(() => {
    if (!query.trim()) return albums
    return albums.filter((al) => al.title.toLowerCase().includes(query.toLowerCase()) || al.artist.toLowerCase().includes(query.toLowerCase()))
  }, [albums, query])

  const filteredPodcasts = useMemo(() => {
    if (!query.trim()) return podcasts
    return podcasts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.creator.toLowerCase().includes(query.toLowerCase()))
  }, [podcasts, query])

  // Sign out
  const handleSignOut = () => {
    tokenStore.clear()
    window.location.assign('/login')
  }

  return (
    <main className="min-h-screen bg-[#080b14] text-[#f5f7ff] pb-28 selection:bg-[#8b5cf6] selection:text-white">
      {/* LEFT SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-white/10 bg-[#0c101d] px-6 py-6 lg:flex z-20">
        {/* Brand */}
        <div
          onClick={() => navigateTo({ type: 'Overview' })}
          className="flex cursor-pointer items-center gap-3 text-lg font-bold tracking-tight hover:opacity-90 transition"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#8b5cf6] text-white shadow-md shadow-[#8b5cf6]/25">
            <Music2 size={20} />
          </span>
          <span>sonicly</span>
        </div>

        {/* Primary Navigation */}
        <nav className="mt-8 flex flex-col gap-1.5" aria-label="Main navigation">
          {[
            { label: 'Home', icon: Home, view: { type: 'Overview' } as ViewState },
            { label: 'Search', icon: Search, view: { type: 'Search' } as ViewState },
            { label: 'Your Library', icon: Library, view: { type: 'Library' } as ViewState },
            { label: 'Playlists', icon: ListMusic, view: { type: 'Playlists' } as ViewState },
            { label: 'Artists', icon: Radio, view: { type: 'Artists' } as ViewState },
            { label: 'Podcasts', icon: Mic2, view: { type: 'Podcasts' } as ViewState },
          ].map(({ label, icon: Icon, view }) => {
            const isActive = currentView.type === view.type
            return (
              <button
                key={label}
                onClick={() => navigateTo(view)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#8b5cf6] font-semibold text-white shadow-sm shadow-[#8b5cf6]/20'
                    : 'text-[#8e97ac] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            )
          })}
        </nav>

        {/* User's Personal Playlists Quick List */}
        <div className="mt-6 flex-1 overflow-y-auto border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8e97ac] mb-2 px-1">
            <span>Playlists ({playlists.length})</span>
            <button
              onClick={() => navigateTo({ type: 'Playlists' })}
              className="text-[#a78bfa] hover:underline"
              aria-label="Manage playlists"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-1">
            {playlists.length === 0 ? (
              <p className="px-1 text-xs text-[#697287]">No playlists yet.</p>
            ) : (
              playlists.slice(0, 8).map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo({ type: 'PlaylistDetail', playlistId: p.id })}
                  className="block w-full truncate rounded-lg px-2 py-1.5 text-left text-xs text-[#8e97ac] hover:bg-white/5 hover:text-white transition"
                >
                  {p.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Database Manager shortcut & Upgrade Banner */}
        <div className="mt-auto pt-4 space-y-3">
          <button
            onClick={() => navigateTo({ type: 'DataManager' })}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-medium text-[#8e97ac] hover:text-white hover:bg-white/10 transition"
          >
            <Sliders size={13} /> Data Manager
          </button>

          {plan === 'Free' && (
            <div className="rounded-2xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                <Sparkles size={13} /> Upgrade Sound
              </div>
              <p className="mt-1 text-xs text-white/90">Unlimited playlists &amp; skips.</p>
              <a
                href="/premium"
                className="mt-3 block text-center rounded-lg bg-[#8b5cf6] py-2 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 transition"
              >
                Explore Premium
              </a>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="lg:ml-64">
        {/* STICKY TOP BAR */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#080b14]/90 px-5 py-4 backdrop-blur-xl md:px-8">
          {/* History Back/Forward */}
          <div className="flex items-center gap-2">
            <button
              onClick={goBack}
              disabled={historyIndex === 0}
              aria-label="Back"
              className="grid size-8 place-items-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goForward}
              disabled={historyIndex === history.length - 1}
              aria-label="Forward"
              className="grid size-8 place-items-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Search bar */}
          <div className="flex flex-1 max-w-md mx-4 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm focus-within:border-[#8b5cf6] transition">
            <Search size={16} className="text-[#8e97ac]" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                if (currentView.type !== 'Search') navigateTo({ type: 'Search' })
              }}
              placeholder="Search songs, artists, albums, podcasts..."
              className="w-full bg-transparent outline-none placeholder:text-[#697287] text-white"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-[#8e97ac] hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            {plan === 'Free' ? (
              <a
                href="/premium"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 px-3.5 py-1 text-xs font-semibold text-[#a78bfa] hover:bg-[#8b5cf6]/25 transition"
              >
                <Sparkles size={13} /> Upgrade
              </a>
            ) : (
              <span className="rounded-full border border-[#8b5cf6] bg-[#8b5cf6] px-3 py-1 text-xs font-bold text-white shadow-sm shadow-[#8b5cf6]/20">
                PREMIUM
              </span>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="User profile menu"
                className="grid size-9 place-items-center rounded-full bg-[#e9d5ff] text-[#171120] font-bold text-xs ring-2 ring-white/10 hover:ring-[#8b5cf6] transition"
              >
                {currentUser?.first_name?.charAt(0).toUpperCase() || <UserRound size={16} />}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#121827] p-2 text-xs shadow-2xl z-50">
                  <div className="border-b border-white/10 px-3 py-2.5">
                    <p className="font-semibold text-white">{currentUser?.first_name}</p>
                    <p className="truncate text-[11px] text-[#8e97ac]">{currentUser?.email}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#a78bfa]">
                      {plan} Plan
                    </span>
                  </div>
                  <div className="py-1">
                    <a
                      href="/billing"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-[#8e97ac] hover:bg-white/5 hover:text-white transition"
                    >
                      <Database size={14} /> Billing &amp; Subscription
                    </a>
                    <a
                      href="/premium"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-[#8e97ac] hover:bg-white/5 hover:text-white transition"
                    >
                      <Sparkles size={14} /> Premium Plans
                    </a>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false)
                        navigateTo({ type: 'DataManager' })
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[#8e97ac] hover:bg-white/5 hover:text-white transition"
                    >
                      <Sliders size={14} /> CockroachDB Manager
                    </button>
                  </div>
                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-red-300 hover:bg-red-500/10 transition"
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* STATUS BANNERS & NOTIFICATIONS */}
        <div className="px-5 pt-4 md:px-8 space-y-3">
          {error && (
            <div className="flex items-center justify-between rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-200">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-white/60 hover:text-white">
                <X size={14} />
              </button>
            </div>
          )}

          {actionSuccess && (
            <div className="flex items-center gap-2 rounded-2xl border border-[#8b5cf6]/40 bg-[#8b5cf6]/10 p-3 text-xs text-[#a78bfa] animate-in fade-in">
              <Check size={16} />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* Live CockroachDB Live Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs text-[#8e97ac]">
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/90">
              <span className="size-2 rounded-full bg-[#8b5cf6] animate-pulse" />
              <span>CockroachDB (localhost:26257 / musicstream):</span>
              <span className="text-[#a78bfa] font-semibold">
                {stats.song ?? songs.length} Songs · {stats.artist ?? artists.length} Artists · {stats.album ?? albums.length} Albums · {stats.playlist ?? playlists.length} Playlists · {stats.podcast ?? podcasts.length} Podcasts
              </span>
            </div>
            <button
              onClick={loadData}
              className="text-[11px] text-[#a78bfa] hover:underline"
            >
              Sync DB
            </button>
          </div>
        </div>

        {/* VIEW ROUTER CONTAINER */}
        <div className="px-5 py-6 md:px-8 space-y-10">
          {/* 1. OVERVIEW / HOME VIEW */}
          {currentView.type === 'Overview' && (
            <>
              {/* Featured Hero Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7c3aed] via-[#6366f1] to-[#3b82f6] p-7 md:p-10 text-white shadow-2xl">
                <div className="relative z-10 max-w-lg">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Daily Sound Rotation
                  </span>
                  <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight leading-tight">
                    Welcome back{currentUser?.first_name ? `, ${currentUser.first_name}` : ''}.
                  </h1>
                  <p className="mt-3 text-sm font-medium text-white/85 max-w-md">
                    Stream your personalized tracks powered by CockroachDB with high-fidelity audio playback.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => playSongList(songs, 0)}
                      className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0f172a] shadow-xl shadow-black/20 hover:bg-white/90 hover:scale-105 active:scale-95 transition"
                    >
                      <Play size={18} /> Play All Tracks
                    </button>
                    <button
                      onClick={() => navigateTo({ type: 'Playlists' })}
                      className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/25 transition"
                    >
                      <ListMusic size={18} /> Your Playlists
                    </button>
                  </div>
                </div>
                <div className="absolute -right-12 -top-16 size-80 rounded-full border-[36px] border-white/15 pointer-events-none" />
                <div className="absolute -bottom-24 right-20 size-64 rounded-full border-[28px] border-white/10 pointer-events-none" />
              </div>

              {/* SECTION: Trending Songs */}
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8e97ac]">
                      Top Rotation
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">Trending Songs</h2>
                  </div>
                  <button
                    onClick={() => navigateTo({ type: 'Library', tab: 'songs' })}
                    className="text-xs font-semibold text-[#a78bfa] hover:underline"
                  >
                    View All Songs ({songs.length})
                  </button>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220]">
                  {songs.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#8e97ac]">
                      No songs in database. Go to an Album or the Data Manager to add songs!
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {songs.slice(0, 6).map((song, idx) => (
                        <div
                          key={song.id}
                          className="group flex items-center justify-between gap-3 p-3.5 hover:bg-white/[0.04] transition"
                        >
                          <div
                            onClick={() => playSongList(songs, idx)}
                            className="flex flex-1 items-center gap-3.5 cursor-pointer min-w-0"
                          >
                            <span className="w-6 text-center text-xs font-medium text-[#697287]">
                              {idx + 1}
                            </span>
                            {song.cover ? (
                              <img
                                src={song.cover}
                                alt={song.title}
                                className="size-10 rounded-xl object-cover border border-white/10 shadow shrink-0"
                              />
                            ) : (
                              <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#e9d5ff] to-[#7b8dff] text-[#14172a] shadow shrink-0">
                                <Disc3 size={18} />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className={`truncate text-sm font-semibold transition ${nowPlaying?.id === song.id ? 'text-[#a78bfa]' : 'group-hover:text-[#a78bfa]'}`}>
                                  {song.title}
                                </p>
                                {nowPlaying?.id === song.id && (
                                  <span className="flex gap-0.5 items-end h-2.5 shrink-0">
                                    <span className="w-0.5 h-2.5 bg-[#8b5cf6] animate-pulse" />
                                    <span className="w-0.5 h-1.5 bg-[#a78bfa] animate-pulse delay-75" />
                                    <span className="w-0.5 h-3 bg-[#8b5cf6] animate-pulse delay-150" />
                                  </span>
                                )}
                              </div>
                              <p className="truncate text-xs text-[#8e97ac]">{song.artist}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-[#8e97ac]">
                            <span className="hidden md:inline text-white/60">{song.album}</span>
                            <span className="font-mono">{song.duration}</span>
                            <button
                              onClick={() => playSongList(songs, idx)}
                              aria-label={`Play ${song.title}`}
                              className="grid size-8 place-items-center rounded-full bg-[#8b5cf6] text-white shadow-md shadow-[#8b5cf6]/30 opacity-0 group-hover:opacity-100 hover:bg-[#7c3aed] hover:scale-105 transition"
                            >
                              <Play size={14} className="translate-x-0.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSong(song.id)}
                              aria-label={`Delete ${song.title}`}
                              className="rounded-lg p-1.5 text-[#697287] hover:text-red-300 opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* SECTION: New Releases / Albums */}
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8e97ac]">
                      Discography
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">New Releases &amp; Albums</h2>
                  </div>
                  <button
                    onClick={() => navigateTo({ type: 'Library', tab: 'albums' })}
                    className="text-xs font-semibold text-[#a78bfa] hover:underline"
                  >
                    View All ({albums.length})
                  </button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {albums.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-white/10 bg-[#0d1220] p-6 text-center text-xs text-[#8e97ac]">
                      No albums found. Use the quick add form or Data Manager.
                    </div>
                  ) : (
                    albums.slice(0, 4).map((album) => (
                      <div
                        key={album.id}
                        onClick={() => navigateTo({ type: 'AlbumDetail', albumId: album.id })}
                        className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-4 hover:border-[#8b5cf6]/40 hover:-translate-y-1 transition-all"
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#80a7ff]/30 to-[#c6a7ff]/30 border border-white/10 grid place-items-center">
                          {album.coverPage ? (
                            <img
                              src={album.coverPage}
                              alt={album.title}
                              className="size-full object-cover"
                            />
                          ) : (
                            <Disc3 size={40} className="text-[#80a7ff]" />
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition grid place-items-center">
                            <span className="grid size-12 place-items-center rounded-full bg-[#8b5cf6] text-white shadow-xl shadow-[#8b5cf6]/30">
                              <Play size={22} className="translate-x-0.5" />
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-3 truncate text-sm font-bold text-white group-hover:text-[#a78bfa] transition">
                          {album.title}
                        </h3>
                        <p className="truncate text-xs text-[#8e97ac]">{album.artist}</p>
                        <p className="mt-2 text-[11px] text-[#697287]">
                          {album.tracks} {album.tracks === 1 ? 'track' : 'tracks'} · {album.releaseDate}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* SECTION: Popular Artists */}
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8e97ac]">
                      Creators &amp; Bands
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">Popular Artists</h2>
                  </div>
                  <button
                    onClick={() => navigateTo({ type: 'Artists' })}
                    className="text-xs font-semibold text-[#a78bfa] hover:underline"
                  >
                    View All ({artists.length})
                  </button>
                </div>

                <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {artists.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-white/10 bg-[#0d1220] p-6 text-center text-xs text-[#8e97ac]">
                      No artists found. Add artists below!
                    </div>
                  ) : (
                    artists.slice(0, 6).map((artist) => (
                      <div
                        key={artist.id}
                        onClick={() => navigateTo({ type: 'ArtistDetail', artistId: artist.id })}
                        className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-4 text-center hover:border-[#8b5cf6]/40 hover:-translate-y-1 transition-all"
                      >
                        <div
                          className={`mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br ${artist.accent} text-2xl font-black text-[#0b1016] shadow-lg`}
                        >
                          {artist.name.charAt(0)}
                        </div>
                        <h3 className="mt-3 truncate text-sm font-bold text-white group-hover:text-[#a78bfa] transition">
                          {artist.name}
                        </h3>
                        <p className="truncate text-xs text-[#8e97ac]">{artist.genre}</p>
                        <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-[#697287]">
                          {artist.followers} followers
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* SECTION: Podcasts */}
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8e97ac]">
                      Talk &amp; Stories
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">Featured Podcasts</h2>
                  </div>
                  <button
                    onClick={() => navigateTo({ type: 'Podcasts' })}
                    className="text-xs font-semibold text-[#a78bfa] hover:underline"
                  >
                    View All ({podcasts.length})
                  </button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {podcasts.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-white/10 bg-[#0d1220] p-6 text-center text-xs text-[#8e97ac]">
                      No podcasts found.
                    </div>
                  ) : (
                    podcasts.slice(0, 3).map((pod) => (
                      <div
                        key={pod.id}
                        onClick={() => navigateTo({ type: 'PodcastDetail', podcastId: pod.id })}
                        className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-5 hover:border-[#8b5cf6]/40 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#ffcf70] to-[#f07caa] text-[#1d1320] shadow">
                            <Mic2 size={20} />
                          </div>
                          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-[#8e97ac]">
                            {pod.language}
                          </span>
                        </div>
                        <h3 className="mt-4 text-base font-bold text-white group-hover:text-[#a78bfa] transition">
                          {pod.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#8e97ac]">By {pod.creator}</p>
                        <p className="mt-3 text-[11px] text-[#697287]">
                          {pod.episodes} {pod.episodes === 1 ? 'episode' : 'episodes'}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </>
          )}

          {/* 2. SEARCH VIEW */}
          {currentView.type === 'Search' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Search Catalog</h1>
                <p className="mt-1 text-xs text-[#8e97ac]">
                  Query songs, artists, albums, and podcasts across CockroachDB.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {(['all', 'songs', 'artists', 'albums', 'podcasts'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSearchCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
                      searchCategory === cat
                        ? 'bg-[#8b5cf6] text-white shadow-sm shadow-[#8b5cf6]/20'
                        : 'border border-white/10 bg-white/5 text-[#8e97ac] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Results */}
              {(searchCategory === 'all' || searchCategory === 'songs') && (
                <div>
                  <h2 className="text-base font-bold text-[#a78bfa] mb-3">
                    Songs ({filteredSongs.length})
                  </h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] divide-y divide-white/5">
                    {filteredSongs.length === 0 ? (
                      <p className="p-4 text-xs text-[#8e97ac]">No songs match your search.</p>
                    ) : (
                      filteredSongs.map((song, idx) => (
                        <div
                          key={song.id}
                          className="flex items-center justify-between p-3.5 hover:bg-white/5 transition"
                        >
                          <div
                            onClick={() => playSongList(filteredSongs, idx)}
                            className="flex flex-1 items-center gap-3 cursor-pointer min-w-0"
                          >
                            {song.cover ? (
                              <img src={song.cover} alt={song.title} className="size-9 rounded-lg object-cover border border-white/10 shadow shrink-0" />
                            ) : (
                              <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white shrink-0">
                                <Play size={14} />
                              </span>
                            )}
                            <div className="truncate">
                              <p className={`text-sm font-semibold transition ${nowPlaying?.id === song.id ? 'text-[#a78bfa]' : 'text-white'}`}>
                                {song.title}
                              </p>
                              <p className="text-xs text-[#8e97ac]">{song.artist}</p>
                            </div>
                          </div>
                          <span className="text-xs text-[#8e97ac] font-mono">{song.duration}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {(searchCategory === 'all' || searchCategory === 'artists') && (
                <div>
                  <h2 className="text-base font-bold text-[#a78bfa] mb-3">
                    Artists ({filteredArtists.length})
                  </h2>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                    {filteredArtists.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => navigateTo({ type: 'ArtistDetail', artistId: a.id })}
                        className="cursor-pointer rounded-2xl border border-white/10 bg-[#0d1220] p-4 text-center hover:border-[#8b5cf6] transition"
                      >
                        <div
                          className={`mx-auto grid size-14 place-items-center rounded-full bg-gradient-to-br ${a.accent} text-lg font-bold text-black`}
                        >
                          {a.name.charAt(0)}
                        </div>
                        <p className="mt-2 text-sm font-bold truncate">{a.name}</p>
                        <p className="text-xs text-[#8e97ac] truncate">{a.genre}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(searchCategory === 'all' || searchCategory === 'albums') && (
                <div>
                  <h2 className="text-base font-bold text-[#a78bfa] mb-3">
                    Albums ({filteredAlbums.length})
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {filteredAlbums.map((al) => (
                      <div
                        key={al.id}
                        onClick={() => navigateTo({ type: 'AlbumDetail', albumId: al.id })}
                        className="cursor-pointer rounded-2xl border border-white/10 bg-[#0d1220] p-4 hover:border-[#8b5cf6] transition"
                      >
                        <p className="font-bold text-sm truncate">{al.title}</p>
                        <p className="text-xs text-[#8e97ac] truncate">{al.artist}</p>
                        <p className="text-[11px] text-[#697287] mt-1">{al.tracks} tracks</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. YOUR LIBRARY VIEW */}
          {currentView.type === 'Library' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Your Library</h1>
                  <p className="mt-1 text-xs text-[#8e97ac]">
                    Curated collections, followed creators, and catalog saved to your profile.
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 border-b border-white/10 pb-3">
                {[
                  { tab: 'playlists', label: `Playlists (${playlists.length})` },
                  { tab: 'artists', label: `Followed Artists (${followedArtistIds.length})` },
                  { tab: 'albums', label: `Saved Albums (${albums.length})` },
                  { tab: 'songs', label: `All Songs (${songs.length})` },
                ].map(({ tab, label }) => {
                  const currentTab = currentView.tab || 'playlists'
                  return (
                    <button
                      key={tab}
                      onClick={() => navigateTo({ type: 'Library', tab: tab as any })}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                        currentTab === tab
                          ? 'bg-[#8b5cf6] text-white shadow-sm shadow-[#8b5cf6]/20'
                          : 'text-[#8e97ac] hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Tab: Playlists */}
              {(currentView.tab || 'playlists') === 'playlists' && (
                <div>
                  <div className="flex gap-2 mb-4">
                    <input
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="New playlist name..."
                      className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:border-[#8b5cf6]"
                    />
                    <button
                      onClick={handleCreatePlaylist}
                      className="flex items-center gap-1.5 rounded-xl bg-[#8b5cf6] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 transition"
                    >
                      <Plus size={14} /> Create Playlist
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {playlists.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => navigateTo({ type: 'PlaylistDetail', playlistId: p.id })}
                        className="cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-5 hover:border-[#8b5cf6]/40 transition"
                      >
                        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#ffcf70] to-[#f07caa] text-black">
                          <ListMusic size={20} />
                        </div>
                        <h3 className="mt-4 font-bold text-base text-white">{p.name}</h3>
                        <p className="text-xs text-[#8e97ac] mt-1">{p.songs} songs</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Followed Artists */}
              {currentView.tab === 'artists' && (
                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {artists
                    .filter((a) => followedArtistIds.includes(a.id))
                    .map((artist) => (
                      <div
                        key={artist.id}
                        onClick={() => navigateTo({ type: 'ArtistDetail', artistId: artist.id })}
                        className="cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-5 text-center hover:border-[#8b5cf6] transition"
                      >
                        <div
                          className={`mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br ${artist.accent} text-xl font-bold text-black`}
                        >
                          {artist.name.charAt(0)}
                        </div>
                        <p className="mt-3 font-bold text-sm truncate">{artist.name}</p>
                        <p className="text-xs text-[#8e97ac]">{artist.genre}</p>
                      </div>
                    ))}
                </div>
              )}

              {/* Tab: Saved Albums */}
              {currentView.tab === 'albums' && (
                <div className="grid gap-4 sm:grid-cols-3">
                  {albums.map((al) => (
                    <div
                      key={al.id}
                      onClick={() => navigateTo({ type: 'AlbumDetail', albumId: al.id })}
                      className="cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-5 hover:border-[#8b5cf6] transition"
                    >
                      <Disc3 size={32} className="text-[#80a7ff]" />
                      <h3 className="mt-3 font-bold text-sm text-white">{al.title}</h3>
                      <p className="text-xs text-[#8e97ac]">{al.artist}</p>
                      <p className="text-[11px] text-[#697287] mt-1">{al.tracks} tracks</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: All Songs */}
              {currentView.tab === 'songs' && (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] divide-y divide-white/5">
                  {songs.map((song, idx) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between p-3.5 hover:bg-white/5 transition"
                    >
                      <div
                        onClick={() => playSongList(songs, idx)}
                        className="flex flex-1 items-center gap-3 cursor-pointer min-w-0"
                      >
                        <span className="w-6 text-center text-xs text-[#697287]">{idx + 1}</span>
                        {song.cover ? (
                          <img src={song.cover} alt={song.title} className="size-9 rounded-lg object-cover border border-white/10 shadow shrink-0" />
                        ) : (
                          <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white shrink-0">
                            <Disc3 size={16} />
                          </span>
                        )}
                        <div className="truncate">
                          <p className={`text-sm font-semibold transition ${nowPlaying?.id === song.id ? 'text-[#a78bfa]' : 'text-white'}`}>
                            {song.title}
                          </p>
                          <p className="text-xs text-[#8e97ac]">
                            {song.artist} · {song.album}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-[#8e97ac] font-mono">{song.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. PLAYLISTS VIEW */}
          {currentView.type === 'Playlists' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Playlists</h1>
                  <p className="mt-1 text-xs text-[#8e97ac]">
                    Create custom mixes and arrange tracklists. Free tier: max 3 playlists.
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New playlist name..."
                    className="rounded-xl border border-white/15 bg-black/30 px-3.5 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                  />
                  <button
                    onClick={handleCreatePlaylist}
                    className="flex items-center gap-1.5 rounded-xl bg-[#8b5cf6] px-4 py-2 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 transition"
                  >
                    <Plus size={14} /> Create
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {playlists.length === 0 ? (
                  <div className="col-span-full rounded-2xl border border-white/10 bg-[#0d1220] p-8 text-center text-xs text-[#8e97ac]">
                    No playlists created yet. Enter a name above and click Create.
                  </div>
                ) : (
                  playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="group relative rounded-2xl border border-white/10 bg-[#0f1424] p-5 hover:border-[#8b5cf6]/40 transition"
                    >
                      <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingPlaylistId(playlist.id)
                            setEditingPlaylistName(playlist.name)
                            navigateTo({ type: 'PlaylistDetail', playlistId: playlist.id })
                          }}
                          className="rounded-lg p-1.5 text-[#697287] hover:text-[#a78bfa] hover:bg-white/10 transition"
                          title="Rename playlist"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePlaylist(playlist.id)
                          }}
                          className="rounded-lg p-1.5 text-[#697287] hover:text-red-300 hover:bg-white/10 transition"
                          aria-label={`Delete ${playlist.name}`}
                          title="Delete playlist"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div
                        onClick={() =>
                          navigateTo({ type: 'PlaylistDetail', playlistId: playlist.id })
                        }
                        className="cursor-pointer"
                      >
                        <div className="grid size-14 place-items-center rounded-xl bg-gradient-to-br from-[#ffcf70] to-[#f07caa] text-[#1d1320] shadow">
                          <ListMusic size={24} />
                        </div>
                        <h3 className="mt-4 font-bold text-lg text-white group-hover:text-[#a78bfa] transition">
                          {playlist.name}
                        </h3>
                        <p className="mt-1 text-xs text-[#8e97ac]">{playlist.description}</p>
                        <div className="mt-4 flex gap-3 text-[11px] text-[#697287]">
                          <span>{playlist.songs} songs</span>
                          <span>· Created {playlist.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 5. ARTISTS VIEW */}
          {currentView.type === 'Artists' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Artists</h1>
                  <p className="mt-1 text-xs text-[#8e97ac]">
                    Discover musicians and bands stored in your database.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <input
                    value={newArtistName}
                    onChange={(e) => setNewArtistName(e.target.value)}
                    placeholder="Artist name..."
                    className="rounded-xl border border-white/15 bg-black/30 px-3 py-1.5 text-xs outline-none focus:border-[#8b5cf6]"
                  />
                  <input
                    value={newArtistBio}
                    onChange={(e) => setNewArtistBio(e.target.value)}
                    placeholder="Genre (e.g. Indie Rock)..."
                    className="rounded-xl border border-white/15 bg-black/30 px-3 py-1.5 text-xs outline-none focus:border-[#8b5cf6]"
                  />
                  <button
                    onClick={handleCreateArtist}
                    className="flex items-center gap-1 rounded-xl bg-[#8b5cf6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 transition"
                  >
                    <Plus size={14} /> Add Artist
                  </button>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {artists.map((artist) => {
                  const isFollowed = followedArtistIds.includes(artist.id)
                  return (
                    <div
                      key={artist.id}
                      className="group relative rounded-2xl border border-white/10 bg-[#0f1424] p-5 text-center hover:border-[#8b5cf6]/40 transition"
                    >
                      <button
                        onClick={() => handleDeleteArtist(artist.id)}
                        className="absolute right-2 top-2 rounded-lg p-1 text-[#697287] hover:text-red-300 opacity-0 group-hover:opacity-100 transition"
                        aria-label={`Delete ${artist.name}`}
                      >
                        <Trash2 size={14} />
                      </button>

                      <div
                        onClick={() =>
                          navigateTo({ type: 'ArtistDetail', artistId: artist.id })
                        }
                        className="cursor-pointer"
                      >
                        <div
                          className={`mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br ${artist.accent} text-2xl font-black text-[#0b1016] shadow`}
                        >
                          {artist.name.charAt(0)}
                        </div>
                        <h3 className="mt-3 truncate text-sm font-bold text-white group-hover:text-[#a78bfa] transition">
                          {artist.name}
                        </h3>
                        <p className="truncate text-xs text-[#8e97ac]">{artist.genre}</p>
                      </div>

                      <button
                        onClick={() => toggleFollowArtist(artist.id)}
                        className={`mt-3 w-full rounded-lg py-1.5 text-xs font-semibold transition ${
                          isFollowed
                            ? 'border border-[#8b5cf6] bg-[#8b5cf6]/15 text-[#a78bfa]'
                            : 'border border-white/20 bg-white/5 text-white hover:border-white/40'
                        }`}
                      >
                        {isFollowed ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 6. PODCASTS VIEW */}
          {currentView.type === 'Podcasts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Podcasts &amp; Audio Shows</h1>
                  <p className="mt-1 text-xs text-[#8e97ac]">
                    Original audio shows and discussions.
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    value={newPodcastTitle}
                    onChange={(e) => setNewPodcastTitle(e.target.value)}
                    placeholder="New podcast title..."
                    className="rounded-xl border border-white/15 bg-black/30 px-3 py-1.5 text-xs outline-none focus:border-[#8b5cf6]"
                  />
                  <button
                    onClick={handleCreatePodcast}
                    className="flex items-center gap-1 rounded-xl bg-[#8b5cf6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 transition"
                  >
                    <Plus size={14} /> Create Show
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {podcasts.map((podcast) => (
                  <div
                    key={podcast.id}
                    onClick={() => navigateTo({ type: 'PodcastDetail', podcastId: podcast.id })}
                    className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-5 hover:border-[#8b5cf6]/40 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#ffcf70] to-[#f07caa] text-[#1d1320] shadow">
                        <Mic2 size={22} />
                      </div>
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-[#8e97ac]">
                        {podcast.language}
                      </span>
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-white group-hover:text-[#a78bfa] transition">
                      {podcast.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#8e97ac]">Creator: {podcast.creator}</p>
                    <p className="mt-3 text-[11px] text-[#697287]">
                      {podcast.episodes} episodes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. ARTIST DETAIL VIEW */}
          {currentView.type === 'ArtistDetail' && (() => {
            const artist = artists.find((a) => a.id === currentView.artistId)
            if (!artist) {
              return (
                <div className="p-8 text-center text-xs text-[#8e97ac]">
                  Artist not found.{' '}
                  <button onClick={() => navigateTo({ type: 'Artists' })} className="text-[#a78bfa] underline">
                    Return to Artists
                  </button>
                </div>
              )
            }
            const artistSongs = songs.filter((s) => s.artistId === artist.id)
            const artistAlbums = albums.filter((al) => al.artistId === artist.id)
            const isFollowed = followedArtistIds.includes(artist.id)

            return (
              <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#121827] to-[#0c101d] p-6 md:p-8">
                  <div
                    className={`grid size-28 place-items-center rounded-full bg-gradient-to-br ${artist.accent} text-4xl font-black text-[#0b1016] shadow-2xl`}
                  >
                    {artist.name.charAt(0)}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                      Verified Artist
                    </span>
                    <h1 className="mt-1 text-3xl md:text-5xl font-black tracking-tight">
                      {artist.name}
                    </h1>
                    <p className="mt-2 text-sm text-[#8e97ac]">{artist.genre}</p>
                    <p className="mt-1 text-xs text-[#697287]">
                      {artist.followers} followers · {artistSongs.length} tracks · {artistAlbums.length} albums
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
                      <button
                        onClick={() => playSongList(artistSongs, 0)}
                        disabled={artistSongs.length === 0}
                        className="flex items-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/20 disabled:opacity-50 transition"
                      >
                        <Play size={15} /> Play Artist
                      </button>
                      <button
                        onClick={() => toggleFollowArtist(artist.id)}
                        className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${
                          isFollowed
                            ? 'border border-[#8b5cf6] bg-[#8b5cf6]/15 text-[#a78bfa]'
                            : 'border border-white/20 bg-white/5 text-white hover:border-white/40'
                        }`}
                      >
                        {isFollowed ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Discography */}
                <section>
                  <h2 className="text-xl font-bold">Albums by {artist.name}</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {artistAlbums.length === 0 ? (
                      <p className="col-span-full text-xs text-[#8e97ac]">No albums listed yet.</p>
                    ) : (
                      artistAlbums.map((al) => (
                        <div
                          key={al.id}
                          onClick={() => navigateTo({ type: 'AlbumDetail', albumId: al.id })}
                          className="cursor-pointer rounded-2xl border border-white/10 bg-[#0f1424] p-4 hover:border-[#8b5cf6] transition"
                        >
                          <Disc3 size={30} className="text-[#80a7ff]" />
                          <h3 className="mt-3 font-bold text-sm text-white">{al.title}</h3>
                          <p className="text-xs text-[#8e97ac]">{al.tracks} tracks · {al.releaseDate}</p>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* Tracklist */}
                <section>
                  <h2 className="text-xl font-bold">Songs</h2>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] divide-y divide-white/5">
                    {artistSongs.length === 0 ? (
                      <p className="p-4 text-xs text-[#8e97ac]">No tracks yet.</p>
                    ) : (
                      artistSongs.map((s, idx) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between p-3.5 hover:bg-white/5 transition"
                        >
                          <div
                            onClick={() => playSongList(artistSongs, idx)}
                            className="flex flex-1 items-center gap-3 cursor-pointer min-w-0"
                          >
                            <span className="w-6 text-xs text-[#697287] font-medium">{idx + 1}</span>
                            {s.cover ? (
                              <img src={s.cover} alt={s.title} className="size-9 rounded-lg object-cover border border-white/10 shadow shrink-0" />
                            ) : (
                              <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white shrink-0">
                                <Play size={14} />
                              </span>
                            )}
                            <div className="truncate">
                              <p className={`text-sm font-semibold transition ${nowPlaying?.id === s.id ? 'text-[#a78bfa]' : 'text-white'}`}>
                                {s.title}
                              </p>
                              <p className="text-xs text-[#8e97ac]">{s.album}</p>
                            </div>
                          </div>
                          <span className="text-xs text-[#8e97ac] font-mono">{s.duration}</span>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            )
          })()}

          {/* 8. ALBUM DETAIL VIEW */}
          {currentView.type === 'AlbumDetail' && (() => {
            const album = albums.find((a) => a.id === currentView.albumId)
            if (!album) {
              return (
                <div className="p-8 text-center text-xs text-[#8e97ac]">
                  Album not found.{' '}
                  <button onClick={() => navigateTo({ type: 'Library', tab: 'albums' })} className="text-[#a78bfa] underline">
                    Return to Albums
                  </button>
                </div>
              )
            }
            const albumSongs = songs.filter((s) => s.albumId === album.id)

            return (
              <div className="space-y-8">
                {/* Album Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#121827] to-[#0c101d] p-6 md:p-8">
                  <div className="relative aspect-square size-36 overflow-hidden rounded-2xl bg-gradient-to-br from-[#80a7ff] to-[#c6a7ff] grid place-items-center shadow-2xl">
                    {album.coverPage ? (
                      <img src={album.coverPage} alt={album.title} className="size-full object-cover" />
                    ) : (
                      <Disc3 size={56} className="text-[#0b1016]" />
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                      Album
                    </span>
                    <h1 className="mt-1 text-3xl md:text-5xl font-black tracking-tight">
                      {album.title}
                    </h1>
                    <p
                      onClick={() => navigateTo({ type: 'ArtistDetail', artistId: album.artistId })}
                      className="mt-2 text-sm text-[#8e97ac] cursor-pointer hover:underline hover:text-white"
                    >
                      By {album.artist}
                    </p>
                    <p className="mt-1 text-xs text-[#697287]">
                      Released {album.releaseDate} · {albumSongs.length} tracks
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
                      <button
                        onClick={() => playSongList(albumSongs, 0)}
                        disabled={albumSongs.length === 0}
                        className="flex items-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/20 disabled:opacity-50 transition"
                      >
                        <Play size={15} /> Play Album
                      </button>
                      <button
                        onClick={() => handleDeleteAlbum(album.id)}
                        className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300 hover:bg-red-500/20 transition"
                      >
                        Delete Album
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tracklist */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold">Tracklist</h2>
                    <span className="text-xs text-[#8e97ac]">{albumSongs.length} tracks</span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] divide-y divide-white/5">
                    {albumSongs.length === 0 ? (
                      <p className="p-6 text-center text-xs text-[#8e97ac]">
                        No tracks on this album yet. Use the form below to add songs!
                      </p>
                    ) : (
                      albumSongs.map((s, idx) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between p-3.5 hover:bg-white/5 transition"
                        >
                          <div
                            onClick={() => playSongList(albumSongs, idx)}
                            className="flex flex-1 items-center gap-3.5 cursor-pointer min-w-0"
                          >
                            <span className="w-6 text-xs text-[#697287] font-medium">{idx + 1}</span>
                            <div className="truncate">
                              <p className={`text-sm font-semibold transition ${nowPlaying?.id === s.id ? 'text-[#a78bfa]' : 'text-white'}`}>
                                {s.title}
                              </p>
                              <p className="text-xs text-[#8e97ac]">
                                {s.audioUrl ? (
                                  <span className="font-mono text-[10px] text-[#a78bfa]">
                                    {s.audioUrl.startsWith('youtube:')
                                      ? 'YouTube'
                                      : s.audioUrl.startsWith('spotify:')
                                      ? 'Spotify'
                                      : 'Direct MP3'}
                                  </span>
                                ) : (
                                  'Audio not linked'
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#8e97ac] font-mono">{s.duration}</span>
                            <button
                              onClick={() => handleDeleteSong(s.id)}
                              aria-label={`Delete ${s.title}`}
                              className="rounded-lg p-1.5 text-[#697287] hover:text-red-300 transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* Form: Add Track to this Album */}
                <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus size={16} className="text-[#a78bfa]" /> Add New Track to {album.title}
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <input
                      value={newSongTitle}
                      onChange={(e) => setNewSongTitle(e.target.value)}
                      placeholder="Song title (e.g. Electric Dreams)"
                      className="rounded-xl border border-white/15 bg-black/30 px-3.5 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                    />
                    <input
                      value={newSongDuration}
                      onChange={(e) => setNewSongDuration(e.target.value)}
                      placeholder="Duration in seconds (e.g. 210)"
                      type="number"
                      className="rounded-xl border border-white/15 bg-black/30 px-3.5 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                    />
                    <input
                      value={newSongAudioUrl}
                      onChange={(e) => setNewSongAudioUrl(e.target.value)}
                      placeholder="Audio URL (or youtube:ID / spotify:ID)"
                      className="rounded-xl border border-white/15 bg-black/30 px-3.5 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                    />
                  </div>
                  <button
                    onClick={() => handleCreateSongInAlbum(album.id, album.artistId)}
                    className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#8b5cf6] px-4 py-2 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 transition"
                  >
                    <Plus size={14} /> Add Song to Album
                  </button>
                </section>
              </div>
            )
          })()}

          {/* 9. PLAYLIST DETAIL VIEW */}
          {currentView.type === 'PlaylistDetail' && (() => {
            const playlist = playlists.find((p) => p.id === currentView.playlistId)
            if (!playlist) {
              return (
                <div className="p-8 text-center text-xs text-[#8e97ac]">
                  Playlist not found.{' '}
                  <button onClick={() => navigateTo({ type: 'Playlists' })} className="text-[#a78bfa] underline">
                    Return to Playlists
                  </button>
                </div>
              )
            }
            // Find songs in this playlist
            const inPlaylistSongIds = playlistSongs
              .filter((ps) => ps.playlist_id === playlist.id)
              .map((ps) => ps.song_id)
            const playlistTracklist = songs.filter((s) => inPlaylistSongIds.includes(s.id))

            return (
              <div className="space-y-8">
                {/* Playlist Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#121827] to-[#0c101d] p-6 md:p-8">
                  <div className="grid size-32 place-items-center rounded-2xl bg-gradient-to-br from-[#ffcf70] to-[#f07caa] text-black shadow-2xl">
                    <ListMusic size={48} />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                      Playlist
                    </span>
                    {editingPlaylistId === playlist.id ? (
                      <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <input
                          value={editingPlaylistName}
                          onChange={(e) => setEditingPlaylistName(e.target.value)}
                          className="rounded-xl border border-[#8b5cf6] bg-black/60 px-3.5 py-1.5 text-2xl md:text-3xl font-black text-white outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleUpdatePlaylistName(playlist.id)
                            if (e.key === 'Escape') setEditingPlaylistId(null)
                          }}
                        />
                        <button
                          onClick={() => handleUpdatePlaylistName(playlist.id)}
                          className="flex items-center gap-1.5 rounded-xl bg-[#8b5cf6] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#7c3aed] transition"
                        >
                          <Check size={14} /> Save
                        </button>
                        <button
                          onClick={() => setEditingPlaylistId(null)}
                          className="rounded-xl border border-white/20 px-3.5 py-2 text-xs text-white/70 hover:text-white transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center justify-center sm:justify-start gap-3">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                          {playlist.name}
                        </h1>
                        <button
                          onClick={() => {
                            setEditingPlaylistId(playlist.id)
                            setEditingPlaylistName(playlist.name)
                          }}
                          className="rounded-lg p-1.5 text-white/40 hover:text-[#a78bfa] hover:bg-white/10 transition"
                          title="Rename playlist"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    )}
                    <p className="mt-2 text-xs text-[#8e97ac]">
                      Created {playlist.createdAt} · {playlistTracklist.length} tracks
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
                      <button
                        onClick={() => playSongList(playlistTracklist, 0)}
                        disabled={playlistTracklist.length === 0}
                        className="flex items-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/20 disabled:opacity-50 transition"
                      >
                        <Play size={15} /> Play Playlist
                      </button>
                      <button
                        onClick={() => {
                          setEditingPlaylistId(playlist.id)
                          setEditingPlaylistName(playlist.name)
                        }}
                        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition"
                      >
                        <Pencil size={14} /> Rename
                      </button>
                      <button
                        onClick={() => handleDeletePlaylist(playlist.id)}
                        className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300 hover:bg-red-500/20 transition"
                      >
                        Delete Playlist
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add Song Selector */}
                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <span className="text-xs font-medium text-white">Add song from library:</span>
                  <select
                    value={selectedSongToAddToPlaylist}
                    onChange={(e) => setSelectedSongToAddToPlaylist(e.target.value ? Number(e.target.value) : '')}
                    className="flex-1 min-w-[200px] rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="">-- Choose a song to add --</option>
                    {songs
                      .filter((s) => !inPlaylistSongIds.includes(s.id))
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} · {s.artist}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={() => {
                      if (selectedSongToAddToPlaylist) {
                        handleAddSongToPlaylist(playlist.id, Number(selectedSongToAddToPlaylist))
                      }
                    }}
                    disabled={!selectedSongToAddToPlaylist}
                    className="rounded-xl bg-[#8b5cf6] px-4 py-2 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 disabled:opacity-40 transition"
                  >
                    Add Track
                  </button>
                </div>

                {/* Tracklist */}
                <section>
                  <h2 className="text-xl font-bold mb-3">Tracks</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] divide-y divide-white/5">
                    {playlistTracklist.length === 0 ? (
                      <p className="p-8 text-center text-xs text-[#8e97ac]">
                        This playlist is empty. Select a song above to add it.
                      </p>
                    ) : (
                      playlistTracklist.map((s, idx) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between p-3.5 hover:bg-white/5 transition"
                        >
                          <div
                            onClick={() => playSongList(playlistTracklist, idx)}
                            className="flex flex-1 items-center gap-3.5 cursor-pointer min-w-0"
                          >
                            <span className="w-6 text-xs text-[#697287] font-medium">{idx + 1}</span>
                            {s.cover ? (
                              <img src={s.cover} alt={s.title} className="size-9 rounded-lg object-cover border border-white/10 shadow shrink-0" />
                            ) : (
                              <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white shrink-0">
                                <Play size={14} />
                              </span>
                            )}
                            <div className="truncate">
                              <p className={`text-sm font-semibold transition ${nowPlaying?.id === s.id ? 'text-[#a78bfa]' : 'text-white'}`}>
                                {s.title}
                              </p>
                              <p className="text-xs text-[#8e97ac]">
                                {s.artist} · {s.album}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-[#8e97ac]">{s.duration}</span>
                            <button
                              onClick={() => handleRemoveSongFromPlaylist(playlist.id, s.id)}
                              aria-label={`Remove ${s.title} from playlist`}
                              className="rounded-lg p-1.5 text-[#697287] hover:text-red-300 transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            )
          })()}

          {/* 10. PODCAST DETAIL VIEW */}
          {currentView.type === 'PodcastDetail' && (() => {
            const podcast = podcasts.find((p) => p.id === currentView.podcastId)
            if (!podcast) {
              return (
                <div className="p-8 text-center text-xs text-[#8e97ac]">
                  Podcast not found.{' '}
                  <button onClick={() => navigateTo({ type: 'Podcasts' })} className="text-[#a78bfa] underline">
                    Return to Podcasts
                  </button>
                </div>
              )
            }
            const podEpisodes = episodes.filter((e) => e.podcastId === podcast.id)

            return (
              <div className="space-y-8">
                {/* Podcast Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#121827] to-[#0c101d] p-6 md:p-8">
                  <div className="grid size-32 place-items-center rounded-2xl bg-gradient-to-br from-[#ffcf70] to-[#f07caa] text-black shadow-2xl">
                    <Mic2 size={48} />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                      Podcast Show
                    </span>
                    <h1 className="mt-1 text-3xl md:text-5xl font-black tracking-tight">
                      {podcast.title}
                    </h1>
                    <p className="mt-2 text-xs text-[#8e97ac]">
                      Host: {podcast.creator} · Language: {podcast.language} · {podEpisodes.length} episodes
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
                      <button
                        onClick={() => {
                          const playables: Playable[] = podEpisodes.map((e) => ({
                            id: e.id,
                            title: e.title,
                            artist: podcast.title,
                            album: `Ep. ${e.episodeNo}`,
                            audioUrl: e.audioUrl,
                          }))
                          playTrackList(playables, 0)
                        }}
                        disabled={podEpisodes.length === 0}
                        className="flex items-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/20 disabled:opacity-50 transition"
                      >
                        <Play size={15} /> Play Latest Episode
                      </button>
                      <button
                        onClick={() => handleDeletePodcast(podcast.id)}
                        className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300 hover:bg-red-500/20 transition"
                      >
                        Delete Podcast
                      </button>
                    </div>
                  </div>
                </div>

                {/* Episode List */}
                <section>
                  <h2 className="text-xl font-bold mb-3">Episodes</h2>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] divide-y divide-white/5">
                    {podEpisodes.length === 0 ? (
                      <p className="p-8 text-center text-xs text-[#8e97ac]">
                        No episodes published yet. Use the form below to publish an episode.
                      </p>
                    ) : (
                      podEpisodes.map((ep, idx) => (
                        <div
                          key={ep.id}
                          className="flex items-start justify-between p-4 hover:bg-white/5 transition"
                        >
                          <div
                            onClick={() => {
                              const playables: Playable[] = podEpisodes.map((e) => ({
                                id: e.id,
                                title: e.title,
                                artist: podcast.title,
                                album: `Episode ${e.episodeNo}`,
                                audioUrl: e.audioUrl,
                              }))
                              playTrackList(playables, idx)
                            }}
                            className="flex flex-1 items-start gap-3 cursor-pointer min-w-0"
                          >
                            <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-white shrink-0 mt-0.5">
                              <Play size={16} />
                            </span>
                            <div className="truncate">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a78bfa]">
                                Episode {ep.episodeNo}
                              </span>
                              <p className={`text-sm font-semibold mt-0.5 transition ${nowPlaying?.title === ep.title ? 'text-[#a78bfa]' : 'text-white'}`}>{ep.title}</p>
                              {ep.description && (
                                <p className="text-xs text-[#8e97ac] mt-1 line-clamp-2">
                                  {ep.description}
                                </p>
                              )}
                              <p className="text-[11px] text-[#697287] mt-1.5">
                                Duration: {ep.duration} · {ep.releaseDate || 'Recent'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteEpisode(ep.id)}
                            aria-label={`Delete ${ep.title}`}
                            className="rounded-lg p-2 text-[#697287] hover:text-red-300 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* Form: Add Episode */}
                <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus size={16} className="text-[#a78bfa]" /> Publish New Episode
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    <input
                      value={newEpTitle}
                      onChange={(e) => setNewEpTitle(e.target.value)}
                      placeholder="Episode title"
                      className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                    />
                    <input
                      value={newEpNo}
                      onChange={(e) => setNewEpNo(e.target.value)}
                      placeholder="Episode number"
                      type="number"
                      className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                    />
                    <input
                      value={newEpDuration}
                      onChange={(e) => setNewEpDuration(e.target.value)}
                      placeholder="Duration in seconds"
                      type="number"
                      className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                    />
                    <input
                      value={newEpAudioUrl}
                      onChange={(e) => setNewEpAudioUrl(e.target.value)}
                      placeholder="Audio URL (or youtube:ID)"
                      className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs outline-none focus:border-[#8b5cf6]"
                    />
                  </div>
                  <button
                    onClick={() => handleCreateEpisodeInPodcast(podcast.id)}
                    className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#8b5cf6] px-4 py-2 text-xs font-bold text-white hover:bg-[#7c3aed] shadow-md shadow-[#8b5cf6]/20 transition"
                  >
                    <Plus size={14} /> Publish Episode
                  </button>
                </section>
              </div>
            )
          })()}

          {/* 11. DATA MANAGER VIEW */}
          {currentView.type === 'DataManager' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">CockroachDB Data Manager</h1>
                  <p className="mt-1 text-xs text-[#8e97ac]">
                    Direct CRUD operations across all 13 relational tables with composite key support.
                  </p>
                </div>
              </div>
              <DataManager onSaved={loadData} />
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM MUSIC PLAYER */}
      <Player
        item={nowPlaying}
        queue={queue}
        currentIndex={currentIndex}
        isPremium={plan === 'Premium'}
        onNext={handleNextTrack}
        onPrevious={handlePrevTrack}
      />
    </main>
  )
}
