import type {Card, List} from './global';

const API_URL = 'http://localhost:3000';

// TODO: card, list API 중복 코드 제거. 제네릭으로 만들기
export async function loadLists(): Promise<List[]> {
  const response = await fetch(`${API_URL}/lists`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List[]>;
}

export async function addList(list: List): Promise<List> {
  const response = await fetch(`${API_URL}/lists`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List>;
}

export async function putList(id: string, list: List): Promise<List> {
  const response = await fetch(`${API_URL}/lists/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(list),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List>;
}

export async function patchList(id: string, title: string): Promise<List> {
  const response = await fetch(`${API_URL}/lists/${id}`, {
    method: 'PATCH',
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

export async function deleteList(id: string): Promise<List> {
  const response = await fetch(`${API_URL}/lists/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<List>;
}

export async function loadCards(): Promise<Card[]> {
  const response = await fetch(`${API_URL}/cards`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<Card[]>;
}

export async function addCard(card: Card): Promise<Card> {
  const response = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    body: JSON.stringify(card),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<Card>;
}

export async function putCard(id: string, card: Card): Promise<Card> {
  const response = await fetch(`${API_URL}/cards/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(card),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<Card>;
}

export async function patchCard(id: string, title: string): Promise<Card> {
  const response = await fetch(`${API_URL}/cards/${id}`, {
    method: 'PATCH',
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

  return response.json() as Promise<Card>;
}

export async function deleteCard(id: string): Promise<Card> {
  const response = await fetch(`${API_URL}/cards/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<Card>;
}
