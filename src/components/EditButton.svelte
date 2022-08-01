<script lang="ts">
  import {lists, cards} from '../store/store';
  import {List, Card} from '../global';

  export let type: 'list' | 'card';
  export let item: List | Card;
  $: isList = type === 'list';
  let isEditing = false;
  const store = type === 'list' ? lists : cards;

  async function edit() {
    if (!item.id || !item.title) {
      return;
    }

    isEditing = false;
    await store.edit(item.id, {...item, title: item.title});
  }

  async function deleteItem() {
    if (!item.id) {
      return;
    }

    isEditing = false;
    await store.delete(item.id);
  }
</script>

<div class="list-header">
  {#if !isEditing}
    <div class="title">
      {item.title}
      <span
        class="btn small"
        on:click={() => {
          isEditing = true;
        }}>Edit</span
      >
    </div>
  {:else}
    <div class="edit-mode">
      <textarea
        placeholder="Enter a title for this {isList ? 'list' : 'card'}..."
        bind:value={item.title}
      />
      <div class="actions ">
        <div class="btn success" on:click={edit}>Save</div>
        <div
          class="btn"
          on:click={() => {
            isEditing = false;
          }}
        >
          Cancel
        </div>
        <div class="btn danger" on:click={deleteItem}>Delete</div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .list-header {
    margin-bottom: 10px;

    .title {
      font-weight: 700;
      padding: 4px 8px;
      cursor: pointer;
    }

    p {
      color: #5e6c84;
      padding: 0 8px;
      margin: 0;
    }
  }
</style>
