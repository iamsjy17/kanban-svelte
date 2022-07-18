<script lang="ts">
  import {Card} from '../global';
  import {draggable} from '../Draggable.ts';
  import {isNumber} from 'lodash-es';
  import {lists} from '../store/store';

  //   TODO: ListHeader와 중복되는 부분 분리
  export let card: Card;
  let isEditing = false;

  async function editCard() {
    if (!card.name || !isNumber(card.id)) {
      return;
    }

    isEditing = false;
    await lists.edit(card.id, card.name);
  }

  async function deleteCard() {
    if (!isNumber(card.id)) {
      return;
    }

    isEditing = false;
    await lists.delete(card.id);
  }
</script>

<!-- use:draggable={{type: 'card', id: card.id}} -->
<div class="card">
  {#if !isEditing}
    <div class="title">
      {card.name}
      <div
        class="btn small"
        on:click={() => {
          isEditing = true;
        }}
      >
        Edit
      </div>
    </div>
  {:else}
    <div class="edit-mode ">
      <textarea
        placeholder="Enter a title for this card..."
        bind:value={card.name}
      />
      <div class="actions">
        <div class="btn success" on:click={editCard}>Save</div>
        <div
          class="btn"
          on:click={() => {
            isEditing = false;
          }}
        >
          Cancel
        </div>
        <div class="btn danger" on:click={deleteCard}>Delete Card</div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
 .card {
    margin-bottom: 8px;
    
    .title {
        position: relative;
        border-radius: 4px;
        background: #FFF;
        padding: 6px 8px;
        line-height: 20px; 
        user-select: none;

        .btn {
            position: absolute;
            top: 6px;
            right: 8px;
        }
    }
 }
</style>
