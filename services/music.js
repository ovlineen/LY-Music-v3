import { lyrequest } from "./index";

export function getBannerCarousel(type = 2) {
  return lyrequest.get({
    url: "/banner",
    data: {
      type,
    },
  });
}

export function getPlayList(id = 3778678) {
  return lyrequest.get({
    url: "/playlist/detail",
    data: {
      id,
    },
  });
}

export function getSonglist(cat = "流行", limit = 6, offset = 0) {
  return lyrequest.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset,
    },
  });
}
