import type {Card, List} from './global';

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function loadLists(page = 1, limit = 5): Promise<List[]> {
  const response = await fetch(
    `${API_URL}/posts?_page=${page}&_limit=${limit}`
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

export async function putList(id: number, title: string): Promise<List> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
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
