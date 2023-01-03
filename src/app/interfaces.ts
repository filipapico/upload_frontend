interface Video {
  name: string
  created: string
  mid: string
  field_media_tags: string
  thumbnail__target_id: string
  field_duration: string
  field_media_oembed_video: string
  field_comments: string
  field_categories: string
}

export {Video};

interface Playlist {
  name: string
  thumbnail__target_id: string
  field_media_oembed_video: string
  field_playlist_category: string
  title: string
  video_url: string
}

export {Playlist};
