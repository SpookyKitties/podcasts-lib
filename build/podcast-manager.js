"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshPodcasts = exports.refreshPodcast$ = exports.refreshPodcast = exports.parsePodcastRequest = exports.flatMap$ = exports.podcasts = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var axios_1 = __importDefault(require("axios"));
function getPodcast(request) {
    var req = request.username && request.password
        ? axios_1.default.get(request.url, {
            auth: { username: request.username, password: request.password },
        })
        : axios_1.default.get(request.url);
    return rxjs_1.of(req, exports.flatMap$, operators_1.map(function (o) { }));
}
exports.podcasts = [];
exports.flatMap$ = operators_1.flatMap(function (o) { return o; });
function parsePodcastRequest(req) {
    var xmlParser = new DOMParser();
    return xmlParser.parseFromString(req, "text/xml");
}
exports.parsePodcastRequest = parsePodcastRequest;
function refreshPodcast(podcast) {
    return getPodcast({
        url: podcast.url,
        username: podcast.username,
        password: podcast.password,
    }).pipe();
}
exports.refreshPodcast = refreshPodcast;
exports.refreshPodcast$ = operators_1.map(function (podcast) {
    return refreshPodcast(podcast);
});
function refreshPodcasts() {
    return rxjs_1.of(exports.podcasts).pipe(operators_1.filter(function (o) { return o !== undefined && o !== null; }), exports.flatMap$, operators_1.filter(function (o) { return o && !o.refreshing; }), exports.refreshPodcast$);
}
exports.refreshPodcasts = refreshPodcasts;
