<script lang="ts">
  let colors = [
    'yellow',
    'skyblue',
    'lime',
    'orange',
    'pink',
    'purple',
    'green',
    'blue',
    'red',
    'black',
  ];
  export let value = '';
  $: selectedIndex = colors.indexOf(value);
</script>

<div class="color-board">
  {#each colors as color, index}
    <span
      class="card-label"
      style="background-color: {color}"
      data-color={color}
      on:click={() => {
        if (colors[index]) {
          value = colors[index];
        }
      }}
    >
      {#if selectedIndex === index}
        <!-- TODO: 밝기에 따라서 icon 변경하도록-->
        <span style="color:{index >= 5 ? 'white' : 'black'}">v</span>
      {/if}
    </span>
  {/each}
</div>

<style lang="scss">
  .color-board {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 280px;
    padding-bottom: 20px;

    .card-label {
      cursor: pointer;
      float: left;
      height: 32px;
      margin: 0 8px 8px 0;
      padding: 0;
      width: 48px;
      background-color: #61bd4f;
      border-radius: 4px;
      position: relative;
    }
  }
</style>
