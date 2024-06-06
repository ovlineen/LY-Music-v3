import { lyrequest } from "./index";

export function getSongDetail(ids) {
  return lyrequest.get({
    url: "/song/detail",
    data: {
      ids,
    },
  });
}

export function getLyricsData(id) {
  return lyrequest.get({
    url: "/lyric",
    data: {
      id,
    },
  });
}
