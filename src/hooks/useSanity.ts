import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'

// ─── Homepage ───────────────────────────────────────────────────

export function useChapters() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "chapter"] | order(orderIndex asc) {
      _id, "id": _id, title, "imageUrl": image.asset->url, sticker, stickerRotate, path, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

export function useQuote() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "quote" && isActive == true][0] {
      _id, quoteText, author, isActive
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

// ─── Music ──────────────────────────────────────────────────────

export function useSongs() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "song"] | order(orderIndex asc) {
      _id, "id": _id, "coverImage": coverImage.asset->url, title, year, genre, description, color, "audioUrl": audioFile.asset->url, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

export function useConcertPhotos() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "concertPhoto"] | order(orderIndex asc) {
      _id, "id": _id, "imageUrl": image.asset->url, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

export function useBehindTheScenes() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "behindTheScenes"] | order(orderIndex asc) {
      _id, "id": _id, title, description, "image1": image1.asset->url, "image2": image2.asset->url, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

export function useThoughts() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "thought"] | order(orderIndex asc) {
      _id, "id": _id, "thumbnail": thumbnail.asset->url, title, excerpt, dateMonth, dateYear, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

// ─── Research ───────────────────────────────────────────────────

export function useResearchPapers() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "researchPaper"] | order(orderIndex asc) {
      _id, "id": _id, "image": image.asset->url, title, brief, categoryTag, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

export function useInteractiveInstallations() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "interactiveInstallation"] | order(orderIndex asc) {
      _id, "id": _id, "image": image.asset->url, title, brief, categoryTag, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

// ─── Life ───────────────────────────────────────────────────────

export function usePhotos() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "photo"] | order(orderIndex asc) {
      _id, "id": _id, "imageUrl": image.asset->url, title, caption, aspectRatio, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

export function usePets() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "pet"] | order(orderIndex asc) {
      _id, "id": _id, "imageUrl": image.asset->url, name, breed, bio, dateLabel, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}

export function useConcertMemories() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "concertMemory"] | order(orderIndex asc) {
      _id, "id": _id, "imageUrl": image.asset->url, concertDate, artist, venue, memoryQuote, orderIndex
    }`).then((res) => { setData(res); setLoading(false) })
  }, [])

  return { data, loading }
}
