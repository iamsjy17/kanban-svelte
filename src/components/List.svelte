<script lang="ts">
  import {List} from '../global';
  import EditButton from './EditButton.svelte';
  import {draggable} from '../Draggable.ts';
  import Card from './Card.svelte';
  import AddButton from './AddButton.svelte';
  import {cards} from '../store/store';
  import {getClosest, getPos} from '../util.ts';
  import {dropzone, DRAGGABLE_TYPE} from '../Draggable.ts';
  import {isNumber} from 'lodash-es';

  export let list: List;
  const dragType = 'card';

  $: cardsInList = $cards
    .filter(card => card.listId === list.id)
    .sort((a, b) => {
      return a.pos - b.pos;
    });
</script>

<div class="list" data-list-id={list.id} use:draggable={{type: 'list'}}>
  <div class="list-inner">
    <EditButton item={list} type="list" />
    <div
      class="card-container"
      use:dropzone={{
        type: dragType,
        axis: 'vertical',
   
        onDrop: async (srcId, destId, dropPosition) => {
          const srcCard = $cards.find(card => card.id === srcId);
          const destIdx = cardsInList.findIndex(card => card.id === destId);

          let beforeCard = null;
          let afterCard = null;

          if (isNumber(destIdx) && destIdx >= 0) {
            if (dropPosition === 'after') {
              beforeCard = cardsInList[destIdx];
              afterCard =
                destIdx < cardsInList.length - 1
                  ? cardsInList[destIdx + 1]
                  : null;
            } else {
              beforeCard = destIdx > 0 ? cardsInList[destIdx - 1] : null;
              afterCard = cardsInList[destIdx];
            }
          }

          await cards.edit(srcId, {
            ...srcCard,
            listId: list.id,
            pos: getPos(beforeCard?.pos, afterCard?.pos),
          });
        },
      }}
    >
      {#each cardsInList as card}
        <Card {card} />
      {/each}
    </div>
    <AddButton type="card" listId={list.id} />
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
      .card-container {
        overflow-x: hidden;
        overflow-y: auto;
        margin-bottom: 10px;
        border: solid;
        border-width: 1px;
        border-color: cornflowerblue;
        padding: 5px;
      }
    }
  }
</style>
