import { lyrequest } from "./index";

export function getSearchHot() {
  return lyrequest.get({
    url: "/search/hot",
  });
}

export function getSearchAssociation(keywords, type = "mobile") {
  return lyrequest.get({
    url: "/search/suggest",
    data: {
      keywords,
      type,
    },
  });
}

export function getSearchKeyword(keywords, type = 1, offset = 0, limit = 20) {
  return lyrequest.get({
    url: "/search",
    data: {
      keywords,
      type,
      offset,
      limit,
    },
  });
}
