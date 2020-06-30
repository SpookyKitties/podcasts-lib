import { readFile } from "fs-extra";
import { of } from "rxjs";
import { read } from "fs";
import normalize from "normalize-path";
import { flatMap$ } from "./podcast-manager";
import { map } from "rxjs/operators";
import { JSDOM } from "jsdom";

export function parseDoc(selector: string, err: string): string {
    const podcastElement = document.querySelector(selector);

    if (!podcastElement || podcastElement.textContent === null) {
        throw new Error(err);
    }
    return (podcastElement.textContent);
}


export function parsePodcastTitle(document: Document) {


    return parseDoc('rss > channel > title', 'No Podcast Title found');
}


function main() {
    of(readFile(normalize('./src/podcast.xml'))).pipe(flatMap$, map(o => {
        const document = new JSDOM(o, { contentType: 'text/xml' }).window.document;
        console.log(parsePodcastTitle(document));

    }
    )).subscribe();
}

main();