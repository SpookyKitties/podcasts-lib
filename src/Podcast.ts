export class Podcast {
  public title: string;
  public homepageLink: string;
  public language: string;
  public copyright: string;
  public subtitle: string;
  public author: string;
  public summary: string;
  public description: string;
  public explicit: boolean;
  public type: string;
  public keywords: string;
  public image: string;
  public url: string;
  public refreshing?: boolean;
  public username?: string;
  public password?: string;
  public category: string[];
}

export class PodcastOwner {
  public name?: string;
  public email?: string;
}

export class PodcastImage {
  public url: string;
  public title: string;
  public link: string;
}
