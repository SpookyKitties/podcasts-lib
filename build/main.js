"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePodcastTitle = exports.parseDoc = void 0;
var fs_extra_1 = require("fs-extra");
var rxjs_1 = require("rxjs");
var normalize_path_1 = __importDefault(require("normalize-path"));
var podcast_manager_1 = require("./podcast-manager");
var operators_1 = require("rxjs/operators");
var jsdom_1 = require("jsdom");
function parseDoc(selector, err) {
    var podcastElement = document.querySelector(selector);
    if (!podcastElement || podcastElement.textContent === null) {
        throw new Error(err);
    }
    return (podcastElement.textContent);
}
exports.parseDoc = parseDoc;
function parsePodcastTitle(document) {
    return parseDoc('rss > channel > title', 'No Podcast Title found');
}
exports.parsePodcastTitle = parsePodcastTitle;
function main() {
    rxjs_1.of(fs_extra_1.readFile(normalize_path_1.default('./src/podcast.xml'))).pipe(podcast_manager_1.flatMap$, operators_1.map(function (o) {
        var document = new jsdom_1.JSDOM(o, { contentType: 'text/xml' }).window.document;
        console.log(parsePodcastTitle(document));
    })).subscribe();
}
main();
