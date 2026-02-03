'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, X, Image, Video, Box } from 'lucide-react'
import toast from 'react-hot-toast'

interface MediaUploaderProps {
  productId?: string
  existingMedia?: string[]
  onMediaUpdate: (mediaUrls: string[]) => void
}

export default function MediaUploader({ productId, existingMedia = [], onMediaUpdate }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<string[]>(existingMedia)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const uploadedUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `products/${fileName}`

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('product-media')
          .upload(filePath, file)

        if (error) {
          console.error('Upload error:', error)
          toast.error(`Failed to upload ${file.name}`)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('product-media')
          .getPublicUrl(filePath)

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl)
        }
      }

      const newMediaFiles = [...mediaFiles, ...uploadedUrls]
      setMediaFiles(newMediaFiles)
      onMediaUpdate(newMediaFiles)
      toast.success(`Uploaded ${uploadedUrls.length} file(s)`)

    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveMedia = (url: string) => {
    const newMediaFiles = mediaFiles.filter(m => m !== url)
    setMediaFiles(newMediaFiles)
    onMediaUpdate(newMediaFiles)
    toast.success('Media removed')
  }

  const getMediaType = (url: string) => {
    const ext = url.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image'
    if (['mp4', 'webm', 'mov'].includes(ext || '')) return 'video'
    if (['glb', 'gltf', 'obj', 'fbx'].includes(ext || '')) return '3d'
    return 'unknown'
  }

  const renderMediaPreview = (url: string) => {
    const type = getMediaType(url)

    switch (type) {
      case 'image':
        return (
          <img
            src={url}
            alt="Product"
            className="w-full h-full object-cover"
          />
        )
      case 'video':
        return (
          <video
            src={url}
            className="w-full h-full object-cover"
            controls
          />
        )
      case '3d':
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
            <Box className="w-8 h-8 text-neutral-400" />
          </div>
        )
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
            <span className="text-xs text-neutral-500">Preview unavailable</span>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Product Media (Images, Videos, 3D Models)
        </label>

        {/* Upload Button */}
        <div className="relative">
          <input
            type="file"
            multiple
            accept="image/*,video/*,.glb,.gltf,.obj,.fbx"
            onChange={handleFileUpload}
            className="hidden"
            id="media-upload"
            disabled={uploading}
          />
          <label
            htmlFor="media-upload"
            className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-neutral-600">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-neutral-500" />
                <span className="text-neutral-600">Click to upload or drag and drop</span>
              </>
            )}
          </label>
        </div>

        <p className="text-xs text-neutral-500 mt-1">
          Supported: Images (JPG, PNG, GIF, WebP), Videos (MP4, WebM, MOV), 3D Models (GLB, GLTF, OBJ, FBX)
        </p>
      </div>

      {/* Media Grid */}
      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaFiles.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                {renderMediaPreview(url)}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemoveMedia(url)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Media Type Badge */}
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-1 bg-black/50 text-white text-xs rounded">
                  {getMediaType(url) === 'image' && <Image className="w-3 h-3 inline mr-1" />}
                  {getMediaType(url) === 'video' && <Video className="w-3 h-3 inline mr-1" />}
                  {getMediaType(url) === '3d' && <Box className="w-3 h-3 inline mr-1" />}
                  {getMediaType(url).toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
