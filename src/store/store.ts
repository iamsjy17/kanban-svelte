import type {List, Card} from '../global';
import {writable} from 'svelte/store';
import {
  addList,
  putList,
  loadLists,
  deleteList,
  loadCards,
  addCard,
  putCard,
  deleteCard,
} from '../api';

export const lists = createLists();
export const cards = createCards();

// TODO: createList, createCard 중복 코드 제거. 제네릭으로 만들기
function createLists() {
  const _lists = [] as List[];
  const {subscribe, set, update} = writable(_lists);

  return {
    subscribe,
    set,
    update,
    load: async () => {
      const _lists = await loadLists();

      lists.set(_lists);
    },
    add: async (list: List) => {
      const addedList = await addList(list);

      lists.update(_lists => [..._lists, addedList]);
    },
    edit: async (id: string, list: List) => {
      const editedList = await putList(id, list);

      lists.update(_lists => {
        const listIdx = _lists.findIndex(list => editedList?.id === list.id);

        if (listIdx < 0) {
          return _lists;
        }

        _lists[listIdx] = editedList;

        return [..._lists];
      });
    },
    delete: async (id: string) => {
      await deleteList(id);

      lists.update(_lists => _lists.filter(list => list.id !== id));
    },
  };
}

function createCards() {
  const _cards = [] as Card[];
  const {subscribe, set, update} = writable(_cards);

  return {
    subscribe,
    set,
    update,
    load: async () => {
      const _cards = await loadCards();

      cards.set(_cards);
    },
    add: async (card: Card) => {
      const addedCard = await addCard(card);

      cards.update(_cards => [..._cards, addedCard]);
    },
    edit: async (id: string, card: Card) => {
      const editedCard = await putCard(id, card);

      cards.update(_cards => {
        const cardIdx = _cards.findIndex(card => editedCard?.id === card.id);

        if (cardIdx < 0) {
          return _cards;
        }

        _cards[cardIdx] = editedCard;

        return [..._cards];
      });
    },
    delete: async (id: string) => {
      await deleteCard(id);

      cards.update(_cards => _cards.filter(card => card.id !== id));
    },
  };
}
