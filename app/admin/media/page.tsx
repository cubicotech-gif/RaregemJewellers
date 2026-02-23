'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { adminApi } from '@/lib/admin-api'
import {
  ImageIcon, Video, Upload, Save, X, Check, AlertCircle,
  Monitor, Smartphone, Eye, RefreshCw, Trash2, Film, Layout
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MediaSlot {
  key: string
  label: string
  description: string
  accepts: 'image' | 'video' | 'both'
  section: string
  currentMedia: { type: 'image' | 'video'; url: string } | null
}

const MEDIA_SLOTS: Omit<MediaSlot, 'currentMedia'>[] = [
  {
    key: 'hero_media',
    label: 'Hero Section — Background',
    description: 'Full-screen hero video or image. Recommended: 1920x1080 HD video (MP4) or high-res image.',
    accepts: 'both',
    section: 'Homepage',
  },
  {
    key: 'story_section_image',
    label: 'Our Story — Craftsman Image',
    description: 'Image shown in the "Our Story" section. Recommended: 800x1000 portrait orientation.',
    accepts: 'image',
    section: 'Homepage',
  },
  {
    key: 'gemstone_diamond_image',
    label: 'Diamond Collection — Cover',
    description: 'Cover image for Diamond gemstone showcase. Recommended: 800x1067 (3:4 ratio).',
    accepts: 'image',
    section: 'Gemstone Showcase',
  },
  {
    key: 'gemstone_sapphire_image',
    label: 'Sapphire Collection — Cover',
    description: 'Cover image for Sapphire gemstone showcase. Recommended: 800x1067 (3:4 ratio).',
    accepts: 'image',
    section: 'Gemstone Showcase',
  },
  {
    key: 'gemstone_emerald_image',
    label: 'Emerald Collection — Cover',
    description: 'Cover image for Emerald gemstone showcase. Recommended: 800x1067 (3:4 ratio).',
    accepts: 'image',
    section: 'Gemstone Showcase',
  },
  {
    key: 'gemstone_ruby_image',
    label: 'Ruby Collection — Cover',
    description: 'Cover image for Ruby gemstone showcase. Recommended: 800x1067 (3:4 ratio).',
    accepts: 'image',
    section: 'Gemstone Showcase',
  },
  {
    key: 'about_hero_image',
    label: 'About Page — Hero Image',
    description: 'Hero banner image for the About page. Recommended: 1920x800.',
    accepts: 'image',
    section: 'About Page',
  },
  {
    key: 'contact_hero_image',
    label: 'Contact Page — Hero Image',
    description: 'Hero banner image for the Contact page. Recommended: 1920x800.',
    accepts: 'image',
    section: 'Contact Page',
  },
  {
    key: 'shop_hero_image',
    label: 'Shop Page — Banner Image',
    description: 'Top banner for the Shop/Collections page. Recommended: 1920x600.',
    accepts: 'image',
    section: 'Shop Page',
  },
]

export default function AdminMediaPage() {
  const [slots, setSlots] = useState<MediaSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string>('all')

  useEffect(() => {
    fetchAllMedia()
  }, [])

  async function fetchAllMedia() {
    setLoading(true)
    try {
      const keys = MEDIA_SLOTS.map(s => s.key)
      const { data } = await supabase
        .from('store_settings')
        .select('setting_key, setting_value')
        .in('setting_key', keys)

      const mediaMap: Record<string, any> = {}
      if (data) {
        data.forEach(item => {
          mediaMap[item.setting_key] = item.setting_value
        })
      }

      const loadedSlots: MediaSlot[] = MEDIA_SLOTS.map(slot => ({
        ...slot,
        currentMedia: mediaMap[slot.key] || null
      }))

      setSlots(loadedSlots)
    } catch (error) {
      console.error('Error fetching media:', error)
      toast.error('Failed to load media settings')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(slotKey: string, file: File) {
    const slot = MEDIA_SLOTS.find(s => s.key === slotKey)
    if (!slot) return

    // Validate type
    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')

    if (slot.accepts === 'image' && !isImage) {
      toast.error('This slot only accepts images')
      return
    }
    if (slot.accepts === 'video' && !isVideo) {
      toast.error('This slot only accepts videos')
      return
    }
    if (slot.accepts === 'both' && !isImage && !isVideo) {
      toast.error('Please upload an image or video file')
      return
    }

    // Validate size (100MB for video, 20MB for image)
    const maxSize = isVideo ? 100 * 1024 * 1024 : 20 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error(`File too large. Max ${isVideo ? '100MB' : '20MB'}.`)
      return
    }

    setUploading(slotKey)

    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const fileName = `${slotKey}-${Date.now()}.${fileExt}`
      const filePath = `site-media/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        toast.error(`Upload failed: ${uploadError.message}`)
        return
      }

      const { data: urlData } = supabase.storage
        .from('product-media')
        .getPublicUrl(filePath)

      if (!urlData?.publicUrl) {
        toast.error('Failed to get file URL')
        return
      }

      const mediaValue = {
        type: isVideo ? 'video' : 'image',
        url: urlData.publicUrl,
        fileName: file.name,
        uploadedAt: new Date().toISOString()
      }

      const result = await adminApi.updateSetting(slotKey, mediaValue)

      if (result.success) {
        toast.success('Media uploaded and saved!')
        // Update local state
        setSlots(prev => prev.map(s =>
          s.key === slotKey ? { ...s, currentMedia: mediaValue as any } : s
        ))
      } else {
        toast.error(result.error || 'Failed to save setting')
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(`Upload failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setUploading(null)
    }
  }

  async function handleRemove(slotKey: string) {
    try {
      const result = await adminApi.updateSetting(slotKey, null)
      if (result.success) {
        toast.success('Media removed. Default will be used.')
        setSlots(prev => prev.map(s =>
          s.key === slotKey ? { ...s, currentMedia: null } : s
        ))
      }
    } catch {
      toast.error('Failed to remove media')
    }
  }

  const sections = ['all', ...Array.from(new Set(MEDIA_SLOTS.map(s => s.section)))]
  const filteredSlots = selectedSection === 'all'
    ? slots
    : slots.filter(s => s.section === selectedSection)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Media Manager</h1>
        <p className="text-neutral-600">
          Upload and manage images & videos for different sections of your website.
          Changes appear instantly on the live site.
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map(section => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSection === section
                ? 'bg-purple-600 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {section === 'all' ? 'All Sections' : section}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-neutral-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Layout className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{slots.length}</p>
              <p className="text-xs text-neutral-500">Total Slots</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{slots.filter(s => s.currentMedia).length}</p>
              <p className="text-xs text-neutral-500">Custom Media Set</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{slots.filter(s => !s.currentMedia).length}</p>
              <p className="text-xs text-neutral-500">Using Defaults</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6 animate-pulse">
              <div className="flex gap-6">
                <div className="w-48 h-32 bg-neutral-200 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-neutral-200 rounded w-1/3" />
                  <div className="h-4 bg-neutral-200 rounded w-2/3" />
                  <div className="h-10 bg-neutral-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSlots.map(slot => (
            <MediaSlotCard
              key={slot.key}
              slot={slot}
              uploading={uploading === slot.key}
              onUpload={(file) => handleUpload(slot.key, file)}
              onRemove={() => handleRemove(slot.key)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MediaSlotCard({
  slot,
  uploading,
  onUpload,
  onRemove
}: {
  slot: MediaSlot
  uploading: boolean
  onUpload: (file: File) => void
  onRemove: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(false)

  const acceptStr = slot.accepts === 'both'
    ? 'image/*,video/mp4,video/webm,video/quicktime'
    : slot.accepts === 'video'
      ? 'video/mp4,video/webm,video/quicktime'
      : 'image/*'

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = ''
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-colors">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview Area */}
          <div className="w-full lg:w-56 flex-shrink-0">
            <div className="relative aspect-video bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200">
              {slot.currentMedia ? (
                slot.currentMedia.type === 'video' ? (
                  <video
                    src={slot.currentMedia.url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0 }}
                  />
                ) : (
                  <img
                    src={slot.currentMedia.url}
                    alt={slot.label}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-xs">No custom media</span>
                </div>
              )}

              {/* Type Badge */}
              {slot.currentMedia && (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/60 text-white text-[10px] font-medium rounded">
                  {slot.currentMedia.type === 'video' ? (
                    <><Film className="w-3 h-3" /> VIDEO</>
                  ) : (
                    <><ImageIcon className="w-3 h-3" /> IMAGE</>
                  )}
                </div>
              )}

              {/* Status Badge */}
              <div className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded ${
                slot.currentMedia
                  ? 'bg-green-500 text-white'
                  : 'bg-neutral-300 text-neutral-600'
              }`}>
                {slot.currentMedia ? 'CUSTOM' : 'DEFAULT'}
              </div>
            </div>
          </div>

          {/* Info & Actions */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase">
                    {slot.section}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Accepts: {slot.accepts === 'both' ? 'Images & Videos' : slot.accepts === 'video' ? 'Videos Only' : 'Images Only'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{slot.label}</h3>
              </div>
            </div>

            <p className="text-sm text-neutral-500 mb-4">{slot.description}</p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={inputRef}
                type="file"
                accept={acceptStr}
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  uploading
                    ? 'bg-purple-100 text-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    {slot.currentMedia ? 'Replace' : 'Upload'}
                  </>
                )}
              </button>

              {slot.currentMedia && (
                <>
                  <a
                    href={slot.currentMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </a>
                  <button
                    onClick={onRemove}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
