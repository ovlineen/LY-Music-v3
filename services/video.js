import { lyrequest } from "./index";

export function getTopMv(offset = 0, limit = 20) {
  return lyrequest.get({
    url: "/top/mv",
    data: {
      limit,
      offset,
    },
  });
}

export function getMvURL(id) {
  return lyrequest.get({
    url: "/mv/url",
    data: {
      id,
    },
  });
}

export function getDetail(mvid) {
  return lyrequest.get({
    url: "/mv/detail",
    data: {
      mvid,
    },
  });
}
