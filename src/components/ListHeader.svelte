<script lang="ts">
  import {lists} from '../store/store';
  import {isNumber} from 'lodash-es';

  export let title = '';
  export let id: number;
  let isEditing = false;

  async function editList() {
    if (!title || !isNumber(id)) {
      return;
    }

    isEditing = false;
    await lists.edit(id, title);
  }

  async function deleteList() {
    if (!isNumber(id)) {
      return;
    }

    isEditing = false;
    await lists.delete(id);
  }
</script>

<div class="list-header">
  {#if !isEditing}
    <div class="title">
      {title}
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
        placeholder="Enter a title for this list..."
        bind:value={title}
      />
      <div class="actions ">
        <div class="btn success" on:click={editList}>Save</div>
        <div
          class="btn"
          on:click={() => {
            isEditing = false;
          }}
        >
          Cancel
        </div>
        <div class="btn danger" on:click={deleteList}>Delete List</div>
      </div>
    </div>
  {/if}
  <p class="card-num">0 cards</p>
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
