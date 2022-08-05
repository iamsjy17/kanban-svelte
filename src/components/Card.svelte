<script lang="ts">
  import {Card} from '../global';
  import {draggable} from '../Draggable.ts';
  import EditButton from './EditButton.svelte';

  export let card: Card;
  let isEditing = false;
</script>

<div
  class="card {!isEditing ? 'normal' : ''}"
  data-card-id={card.id}
  use:draggable={{type: 'card'}}
>
  <div class="card-color-bar" style="background-color: {card.color}">
    <span class="card-color-bar" />
  </div>
  <EditButton item={card} type="card" bind:isEditing />
</div>

<style lang="scss">
  .card {
    margin-bottom: 8px;

    .card-color-bar {
      height: 8px;
      margin: 0 4px 4px 0;
      max-width: 40px;
      min-width: 40px;
      padding: 0;
      width: auto;
      cursor: pointer;
    }

    .title {
      position: relative;
      border-radius: 4px;
      background: #fff;
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
  .card.normal {
    &:hover {
      background: lightgray;
    }
  }
</style>
