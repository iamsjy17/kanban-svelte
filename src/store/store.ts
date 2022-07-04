import type {List} from '../global';
import {writable} from 'svelte/store';
import {addList, putList, loadLists, deleteList} from '../api';

export const lists = createList();

function createList() {
  const list = [] as List[];
  const {subscribe, set, update} = writable(list);

  return {
    subscribe,
    set,
    update,
    loadLists: async () => {
      const list = await loadLists();

      lists.set(list);
    },
    add: async (title: string) => {
      const addedList = await addList(title);

      lists.update(_lists => [..._lists, addedList]);
    },
    edit: async (id: number, title: string) => {
      const editedList = await putList(id, title);
      const listIdx = list.findIndex(list => editedList?.id === list.id);

      if (listIdx < 0) {
        return;
      }

      lists.update(_lists => {
        _lists[listIdx] = editedList;

        return [..._lists];
      });
    },
    delete : async (id: number) => {
      const deletedList = await deleteList(id);
      const listIdx = list.findIndex(list => deletedList?.id === list.id);

      if (listIdx < 0) {
        return;
      }

      lists.update(_lists => _lists.filter(list => list.id !== listIdx));
    },
  };
}
