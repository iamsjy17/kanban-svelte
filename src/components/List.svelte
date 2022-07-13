<script lang="ts">
  import {List} from '../global';
  import ListHeader from './ListHeader.svelte';
  import {draggable} from '../Draggable.ts';

  export let list: List;
</script>

<div class="list" use:draggable={{type: 'list', id: list.id}}>
  <div class="list-inner">
    <ListHeader title={list.title} id={list.id} />
    <div class="card-container" />
    <div class="add-another-card">+ Add a card</div>
  </div>
</div>

<style lang="scss">
  .list {
    display: inline-block;
    min-width: 250px;
    height: 100%;
    margin: 0px 5px;
    word-break: break-all;
    vertical-align: top;
    line-height: 20px;
    user-select: none;

    .list-inner {
      display: flex;
      flex-direction: column;
      padding: 10px 8px;
      background: #ebecf0;
      border-radius: 4px;

      .add-another-card {
        padding: 4px 8px;
        font-size: 14px;
        color: #5e6c84;
        cursor: pointer;
        border-radius: 4px;
      }
    }
  }
</style>
