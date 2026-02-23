'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, X, ImageIcon, Video, Box, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

interface MediaUploaderProps {
  productId?: string
  existingMedia?: string[]
  onMediaUpdate: (mediaUrls: string[]) => void
  bucket?: string
  folder?: string
  maxFiles?: number
  acceptTypes?: string
  label?: string
}

export default function MediaUploader({
  productId,
  existingMedia = [],
  onMediaUpdate,
  bucket = 'product-media',
  folder = 'products',
  maxFiles = 10,
  acceptTypes = 'image/*,video/*,.glb,.gltf,.obj,.fbx',
  label = 'Product Media (Images, Videos, 3D Models)'
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mediaFiles, setMediaFiles] = useState<string[]>(existingMedia)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    if (mediaFiles.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const uploadedUrls: string[] = []
      const totalFiles = files.length

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i]

        if (file.size > 50 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Max 50MB.`)
          continue
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
        const filePath = `${folder}/${fileName}`

        setUploadProgress(Math.round(((i) / totalFiles) * 100))

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) {
          console.error('Upload error:', error)
          toast.error(`Failed: ${file.name} - ${error.message}`)
          continue
        }

        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath)

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl)
        }
      }

      setUploadProgress(100)

      if (uploadedUrls.length > 0) {
        const newMediaFiles = [...mediaFiles, ...uploadedUrls]
        setMediaFiles(newMediaFiles)
        onMediaUpdate(newMediaFiles)
        toast.success(`Uploaded ${uploadedUrls.length} file(s) successfully`)
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(`Upload failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleRemoveMedia = (url: string) => {
    const newMediaFiles = mediaFiles.filter(m => m !== url)
    setMediaFiles(newMediaFiles)
    onMediaUpdate(newMediaFiles)
    toast.success('Media removed')
  }

  const handleSetPrimary = (url: string) => {
    const newMediaFiles = [url, ...mediaFiles.filter(m => m !== url)]
    setMediaFiles(newMediaFiles)
    onMediaUpdate(newMediaFiles)
    toast.success('Set as primary image')
  }

  const getMediaType = (url: string) => {
    const ext = url.split('.').pop()?.toLowerCase()?.split('?')[0]
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) return 'image'
    if (['mp4', 'webm', 'mov'].includes(ext || '')) return 'video'
    if (['glb', 'gltf', 'obj', 'fbx'].includes(ext || '')) return '3d'
    return 'image'
  }

  const renderMediaPreview = (url: string) => {
    const type = getMediaType(url)

    switch (type) {
      case 'image':
        return (
          <img src={url} alt="Media preview" className="w-full h-full object-cover" loading="lazy" />
        )
      case 'video':
        return (
          <video
            src={url}
            className="w-full h-full object-cover"
            muted
            playsInline
            onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
            onMouseOut={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0 }}
          />
        )
      case '3d':
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-800">
            <Box className="w-8 h-8 text-neutral-400" />
          </div>
        )
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-800">
            <span className="text-xs text-neutral-500">Preview unavailable</span>
          </div>
        )
    }
  }

  const inputId = `media-upload-${productId || 'new'}-${folder}`

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
            dragOver
              ? 'border-purple-500 bg-purple-50 scale-[1.01]'
              : uploading
                ? 'border-purple-300 bg-purple-50/50'
                : 'border-neutral-300 hover:border-purple-400 hover:bg-purple-50/50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={acceptTypes}
            onChange={handleInputChange}
            className="hidden"
            id={inputId}
            disabled={uploading}
          />
          <label
            htmlFor={inputId}
            className={`flex flex-col items-center justify-center gap-3 w-full px-6 py-8 cursor-pointer ${
              uploading ? 'cursor-not-allowed opacity-60' : ''
            }`}
          >
            {uploading ? (
              <>
                <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-neutral-600 font-medium">Uploading... {uploadProgress}%</span>
                <div className="w-48 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-center">
                  <span className="text-sm text-neutral-700 font-medium">Click to upload or drag and drop</span>
                  <p className="text-xs text-neutral-500 mt-1">Max 50MB each, {maxFiles} files max</p>
                </div>
              </>
            )}
          </label>
        </div>

        <p className="text-xs text-neutral-500 mt-2">
          {mediaFiles.length}/{maxFiles} files | First image = primary display image
        </p>
      </div>

      {/* Media Grid */}
      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {mediaFiles.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group">
              <div className={`aspect-square rounded-lg overflow-hidden bg-neutral-100 border-2 transition-colors ${
                index === 0 ? 'border-purple-500' : 'border-neutral-200 group-hover:border-neutral-300'
              }`}>
                {renderMediaPreview(url)}
              </div>

              {index === 0 && (
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded">
                  PRIMARY
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(url)}
                    className="px-2 py-1.5 bg-white text-neutral-700 rounded-md hover:bg-purple-100 transition-colors text-[10px] font-medium"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(url)}
                  className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="absolute bottom-1.5 right-1.5">
                <span className="px-1.5 py-0.5 bg-black/60 text-white text-[9px] rounded flex items-center gap-1">
                  {getMediaType(url) === 'image' && <ImageIcon className="w-2.5 h-2.5" />}
                  {getMediaType(url) === 'video' && <Video className="w-2.5 h-2.5" />}
                  {getMediaType(url) === '3d' && <Box className="w-2.5 h-2.5" />}
                  {getMediaType(url).toUpperCase()}
                </span>
              </div>
            </div>
          ))}

          {mediaFiles.length < maxFiles && (
            <label
              htmlFor={inputId}
              className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 hover:border-purple-400 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Plus className="w-6 h-6 text-neutral-400 hover:text-purple-500 transition-colors" />
            </label>
          )}
        </div>
      )}
    </div>
  )
}
