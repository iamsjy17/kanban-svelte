<script lang="ts">
  import {List} from '../global';
  import EditButton from './EditButton.svelte';
  import {draggable} from '../Draggable.ts';
  import Card from './Card.svelte';
  import AddButton from './AddButton.svelte';
  import {cards} from '../store/store';
  import {getClosest, getPos} from '../util.ts';
  import {dropzone, DRAGGABLE_TYPE} from '../Draggable.ts';

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
        onDrop: async (event, type, startId) => {
          if (type !== dragType) {
            return;
          }
          const currentCard = getClosest(
            event?.target,
            `[${DRAGGABLE_TYPE}="${dragType}"]`
          );

          if (!currentCard) {
            return;
          }

          const targetId = currentCard.getAttribute(`data-${dragType}-id`);
          const startCard = $cards.find(card => card.id === startId);
          const targetCards = $cards
            .filter(card => card.listId === list.id)
            .sort((a, b) => {
              return a.pos - b.pos;
            });
          const targetIdx = targetCards.findIndex(card => card.id === targetId);
          const targetList = targetCards[targetIdx];
          const nextList = targetCards[targetIdx + 1];

          // TODO: target 위, 아래에 들어갈지 bound
          // TODO: 카드에 겹쳐서 올리지 않고 리스트에 넣는 경우 마지막에 붙이기.

          await cards.edit(startId, {
            ...startCard,
            listId: targetList.listId,
            pos: getPos(targetList.pos, nextList?.pos),
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
