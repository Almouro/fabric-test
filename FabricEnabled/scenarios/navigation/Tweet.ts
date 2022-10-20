interface APITweet {
  author_id: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  created_at: string;
  referenced_tweets?: {
    type: string;
    id: string;
  }[];
  text: string;
  attachments?: {
    media_keys: string[];
  };
  id: string;
}

export interface Tweet {
  id: string;
  text: string;
  public_metrics: APITweet['public_metrics'];
  createdAt: APITweet['created_at'];
  image: {url: string; width: number; height: number} | null;
  author: {
    name: string;
    profile_image_url: string;
    username: string;
  };
}

export interface Feed {
  tweets: Tweet[];
  isLoading: boolean;
}
