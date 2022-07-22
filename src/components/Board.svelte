<script lang="ts">
  import {onMount} from 'svelte';
  import {isNumber} from 'lodash-es';
  import List from './List.svelte';
  import AddButton from './AddButton.svelte';
  import {lists, cards} from '../store/store';
  import {dropzone, DRAGGABLE_TYPE} from '../Draggable.ts';
  import {getClosest, getPos} from '../util.ts';
  import {Wave} from 'svelte-loading-spinners';

  const loadingDelay = 2500; // 일반적인 API 응답을 받는 정도의 delay를 주고 Spinner가 잘 노출되는지 확인하기 위함.
  const dragType = 'list';
  let isLoaded = false;
  $: sortedList = $lists?.sort((a, b) => {
    return a.pos - b.pos;
  });

  onMount(async () => {
    await Promise.all([
      lists.load(),
      cards.load(),
      new Promise(resolve => setTimeout(() => resolve(), loadingDelay)),
    ]);
    isLoaded = true;
  });
</script>

<div class="board">
  {#if isLoaded}
    <div
      class="list-container dropzone"
      use:dropzone={{
        type: dragType,
        axis: 'horizontal',
        onDrop: async (srcId, destId, dropPosition) => {
          const srcList = sortedList.find(list => list.id === srcId);
          const destIdx = sortedList.findIndex(list => list.id === destId);

          let beforeList = null;
          let afterList = null;

          if (isNumber(destIdx) && destIdx >= 0) {
            if (dropPosition === 'after') {
              beforeList = sortedList[destIdx];
              afterList =
                destIdx < sortedList.length - 1
                  ? sortedList[destIdx + 1]
                  : null;
            } else {
              beforeList = destIdx > 0 ? sortedList[destIdx - 1] : null;
              afterList = sortedList[destIdx];
            }
          }

          await lists.edit(srcList.id, {
            ...srcList,
            pos: getPos(beforeList?.pos, afterList?.pos),
          });
        },
      }}
    >
      {#each sortedList as list}
        <List {list} />
      {/each}
    </div>
    <AddButton type="list" />
  {:else}
    <div class="spinner">
      <Wave size="200" color="#FF3E00" unit="px" />
    </div>
  {/if}
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
  .spinner {
    min-width: 250px;
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
</style>
