import { Observable, of } from "rxjs";
import { Podcast } from "./podcast";
import { find, filter, flatMap, map } from "rxjs/operators";
import axios from "axios";

export interface PodcastRequest {
  url: string;
  username?: string;
  password?: string;
}

function getPodcast(request: PodcastRequest) {
  const req =
    request.username && request.password
      ? axios.get(request.url, {
          auth: { username: request.username, password: request.password },
        })
      : axios.get(request.url);
  return of(
    req,
    flatMap$,
    map((o: string) => {})
  );
}

export const podcasts: Podcast[] = [];

export const flatMap$ = flatMap(<T>(o: T[] | Observable<T> | Promise<T>) => o);

export function parsePodcastRequest(req: string) {
  const xmlParser = new DOMParser();
  return xmlParser.parseFromString(req, "text/xml");
}

export function refreshPodcast(podcast: Podcast) {
  return getPodcast({
    url: podcast.url,
    username: podcast.username,
    password: podcast.password,
  }).pipe();
}

export const refreshPodcast$ = map((podcast: Podcast) => {
  return refreshPodcast(podcast);
});

export function refreshPodcasts() {
  return of(podcasts).pipe(
    filter((o) => o !== undefined && o !== null),
    flatMap$,
    filter((o: Podcast) => o && !o.refreshing),
    refreshPodcast$
  );
}
