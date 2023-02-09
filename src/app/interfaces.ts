interface Comment {
  entity_id: string,
  entity_type: string,
  comment_type: string,
  field_name: string,
  field_comment_name?: string
  field_comment_name_media?: string
  field_email: string,
  comment_body: string
  nid: string
  mid: string
  created: string
  cid: string
  field_report_media_comment?: boolean
  field_report_reason_media?: string
  field_report_channel_comment?: boolean
  field_report_reason_channel?: string
}

interface Video {
  name: string
  created: string
  mid: string
  field_media_tags: string
  thumbnail__target_id: string
  field_duration: string
  field_media_oembed_video: string
  field_description: string
  field_categories: string
  field_logotype: string
  title: string
  nid: string
  field_cover_photo: string
  body: string
  uid: string
  tid: string
  view_media: string //video "friendly" URL
  view_node: string
  tag_name: string //tag name
}

interface Likes {
  mid: string
  name: string
  count: string
}

interface Categories {
  name: string
  tid: string
}

interface Channels {
  title: string
  nid: string
  field_logotype: string
  field_cover_photo: string
  field_category: string
  body: string
  uid: string
  view_node: string
}

interface Thematics {
  nid: string
  title: string
  field_thematic_thumbnail: string
  field_thematic_header_image: string
  uid: string
  field_thematic_tags: string
  view_node: string
}

interface Tags {
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
  tid: string
  view_node: string
  name: string //tag name
}

interface ThematicLink {
  uri: string
  title: string
}

interface ThematicLinks {
  field_thematic_links: ThematicLink[]
}

//MAYBE LATER BE IMPROVED - distinguish between counting media or content.
interface PagesCount {
  count: string
}

/*Might not be necessary!?
interface VideoTags {
  mid: string
  field_media_oembed_video: string
}*/

interface Playlist {
  name: string
  thumbnail__target_id: string
  field_media_oembed_video: string
  field_playlist_category: string
  title: string
  video_url: string
  nid: string
  uid: string
  user_picture: string
  mid: string
}

interface Playlists {
  title: string
  nid: string
  field_playlist_category: string
  tid: string
  name: string
  user_picture: string
  thumbnail__target_id: string
  created: string
  view_node: string
}

export {
  Video,
  Likes,
  Categories,
  Channels,
  Comment,
  Thematics,
  Tags,
  Thematic,
  ThematicLink,
  ThematicLinks,
  PagesCount,
  Playlist,
  Playlists
};
