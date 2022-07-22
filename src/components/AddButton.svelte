<script lang="ts">
  import {lists, cards} from '../store/store';
  import {v4 as uuidv4} from 'uuid';
  import {getPos} from '../util.ts';

  export let type: 'list' | 'card';
  export let listId: string;
  $: isList = type === 'list';
  let isEditing = false;
  let title = '';

  async function add() {
    if (!title || !type) {
      return;
    }

    const id = uuidv4();

    isEditing = false;

    const store = type === 'list' ? lists : cards;
    const values = type === 'list' ? $lists : $cards;
    const leftPos = values.length > 0 ? values[values.length - 1]?.pos : 0;
    const data = {
      id,
      title,
      pos: getPos(leftPos),
    };

    if (!isList && listId) {
      Object.assign(data, {listId});
    }

    await store.add(data);

    title = '';
  }
</script>

<div
  class="create-list"
  on:click={() => {
    isEditing = true;
  }}
>
  {#if !isEditing}
    + Add {isList ? 'List' : 'Card'}
  {:else}
    <div class="edit-mode">
      <textarea
        placeholder="Enter a title for this list..."
        bind:value={title}
      />
      <div class="actions">
        <div class="btn success" on:click|stopPropagation={add}>Add</div>
        <div
          class="btn"
          on:click|stopPropagation={() => {
            isEditing = false;
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .create-list {
    font-size: 16px;
    display: inline-block;
    vertical-align: top;
    width: 250px;
    margin: 0 4px;
    padding: 10px 8px;
    background: rgba(235, 236, 240, 0.6);
    border-radius: 4px;
    cursor: pointer;
  }
</style>
