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
  field_channel: string
}

interface Playlist {
  name: string
  thumbnail__target_id: string
  field_media_oembed_video: string
  field_playlist_category: string
  title: string
  video_url: string
  nid: string
}

interface Playlists {
  title : string
  nid: string
  field_image : string
}

interface Thematic{
  body: string
  field_thematic_header_image: string
  field_thematic_links: string
  field_thematic_tags: string
  field_thematic_thumbnail: string
  title: string
  uid: string
}

interface Thematics{
  title: string
}

export {Video, Playlist, Playlists, Thematic, Thematics};


