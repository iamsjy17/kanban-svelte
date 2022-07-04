<script lang="ts">
  import {lists} from '../store/store';

  let isEditing = false;
  let title = '';

  async function addList() {
    if (!title) {
      return;
    }

    isEditing = false;
    await lists.add(title);
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
    + Add another List
  {:else}
    <div class="edit-mode">
      <textarea
        placeholder="Enter a title for this list..."
        bind:value={title}
      />
      <div class="actions">
        <div class="btn success" on:click|stopPropagation={addList}>
          Add List
        </div>
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
