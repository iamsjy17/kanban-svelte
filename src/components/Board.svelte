<script lang="ts">
  import {onMount} from 'svelte';
  import List from './List.svelte';
  import AddListButton from './AddListButton.svelte';
  import {lists} from '../store/store';
  import {dropzone, DRAGGABLE_TYPE} from '../Draggable.ts';
  import {getClosest} from '../util.ts';

  let isEditing = false;
  let title = '';

  const dragType = 'list';

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
  <div
    class="list-container dropzone"
    use:dropzone={{
      type: dragType,
      onDrop: (event, startId) => {
        const currentList = getClosest(
          event?.target,
          `[${DRAGGABLE_TYPE}="${dragType}"]`
        );

        if (!currentList) {
          return;
        }

        const targetId = Number(currentList.dataset.id);

        lists.update(lists => {
          const startIdx = lists.findIndex(list => list.id === startId);
          const targetIdx = lists.findIndex(list => list.id === targetId);
          const startEl = document.querySelector(`[data-id="${startId}"]`);
          const targetEl = document.querySelector(`[data-id="${targetId}"]`);

          if (startIdx < 0 || targetIdx < 0 || !startEl || !targetEl) {
            return lists;
          }

          startEl.setAttribute(`data-id`, targetId.toString());
          targetEl.setAttribute(`data-id`, startId.toString());

          const temp = lists[startIdx];
          lists[startIdx] = lists[targetIdx];
          lists[targetIdx] = temp;

          return [...lists];
        });
      },
    }}
    on:drop
  >
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
