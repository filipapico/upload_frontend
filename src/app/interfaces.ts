interface Video {
  name: string
  created: string
  mid: string
  field_media_tags: string
  thumbnail__target_id: string
  field_duration: string
  field_media_oembed_video: string
  field_description: string
  field_comments: string
  field_categories: string
  field_logotype: string
  title: string
  nid: string
  field_cover_photo: string
  body: string
}

interface Categories {
  name: string
  tid: string
}

interface Channels {
  title: string
  field_author: string
  nid: string
  field_logotype: string
  field_cover_photo: string
  field_category: string
  body: string
}

interface Thematics {
  nid: string
  title: string
  uid: string
  field_thematic_thumbnail: string
  field_thematic_header_image: string
}

//Maybe update to thematicsTags (used in other contexts?)
interface Tags{
  tid: string
  name: string
}

interface Thematic {
  nid: string
  title: string
  uid: string
  body: string
  field_thematic_teaser: string
  field_thematic_tags: string
  field_thematic_header_image: string
  field_thematic_thumbnail: string
  field_thematic_links: string
}

interface ThematicLink {
  uri: string
  title: string
}

interface ThematicLinks {
  field_thematic_links: ThematicLink[]
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
  title: string
  nid: string
  field_image: string
  field_playlist_category: string
  tid: string
}

export {Video, Categories, Channels, Thematics, Tags, Thematic, ThematicLink, ThematicLinks, Playlist, Playlists};
