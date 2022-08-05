<script lang="ts">
  import {lists, cards} from '../store/store';
  import {v4 as uuidv4} from 'uuid';
  import {getPos} from '../util.ts';
  import {dropzone} from '../Draggable.ts';
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
    <div
      use:dropzone={{
        type: 'card',
        axis: 'vertical',
        onDrop: srcId => {
          if (isList) {
            return;
          }

          const srcCard = $cards.find(card => card.id === srcId);
          isEditing = true;
          title = srcCard.title;
        },
      }}
    >
      + Add {isList ? 'List' : 'Card'}
    </div>
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
    background: #e2e6ea;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: darken(#e2e6ea, 10%);
    }
  }
</style>
