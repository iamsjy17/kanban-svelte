import type {Card, List} from './global';

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function loadLists(page = 1, limit = 5, embed='comments'): Promise<List[]> {
  const response = await fetch(
    `${API_URL}/posts?_page=${page}&_limit=${limit}&_embed=${embed}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List[]>;
}

export async function addList(title: string): Promise<List> {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List>;
}

export async function patchList(id: number, list: List): Promise<List> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...list,
      id,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List>;
}

export async function deleteList(id: number): Promise<List> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List>;
}

export async function getCards(postId: number): Promise<Card[]> {
  const response = await fetch(`${API_URL}/comments?postId=${postId}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<Card[]>;
}
