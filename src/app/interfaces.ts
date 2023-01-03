interface LatestVideo {
  name: string
  created: string
  mid: string
  field_media_tags: string
  thumbnail__target_id: string
}

interface Playlist {
    name: string
    thumbnail__target_id: string
    field_media_oembed_video: string
    field_playlist_category: string
    title: string
    video_url: string
}
