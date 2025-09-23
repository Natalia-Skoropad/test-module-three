import axios from 'axios';
import type { Article } from '../types/article';

//===============================================================

interface HnHit {
  objectID: string;
  title?: string | null;
  story_title?: string | null;
  url?: string | null;
  story_url?: string | null;
}

interface ArticlesHttpResponse {
  hits: HnHit[];
}

function normalizeHit(hit: HnHit): Article {
  const title = hit.title ?? hit.story_title ?? 'Untitled';
  const url = hit.url ?? hit.story_url ?? null;
  return { objectID: hit.objectID, title, url };
}

export const fetchArticles = async (topic: string): Promise<Article[]> => {
  const response = await axios.get<ArticlesHttpResponse>(
    'https://hn.algolia.com/api/v1/search',
    { params: { query: topic } }
  );

  return response.data.hits.map(normalizeHit);
};
