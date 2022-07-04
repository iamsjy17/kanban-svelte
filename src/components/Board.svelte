<script lang="ts">
  import {onMount} from 'svelte';
  import List from './List.svelte';
  import AddListButton from './AddListButton.svelte';
  import {lists} from '../store/store';

  let isEditing = false;
  let title = '';

  onMount(async () => {
    await lists.loadLists();
  });

  async function addList() {
    if (!title) {
      alert('Title을 입력해주세요.');
      return;
    }

    isEditing = false;
    await lists.add(title);
    title = '';
  }
</script>

<div class="board">
  <div class="list-container">
    {#each $lists as list}
      <List {list} />
    {/each}
  </div>
  <AddListButton />
</div>

<style lang="scss">
  .board {
    width: 100%;
    height: calc(100vh - 40px);
    padding: 30px 10px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .list-container {
    display: inline-block;
  }

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
