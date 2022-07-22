<script lang="ts">
  import {Card} from '../global';
  import {draggable} from '../Draggable.ts';
  import EditButton from './EditButton.svelte';

  export let card: Card;
</script>

<div class="card" data-card-id={card.id} use:draggable={{type: 'card'}}>
  <EditButton item={card} type="card" />
</div>

<style lang="scss">
  .card {
    margin-bottom: 8px;

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
</style>
