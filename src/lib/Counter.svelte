<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment} class="w-52 bg-orange-600/10 px-1 py-2 rounded-full border-2 border-solid border-transparent focus:border-orange-600 cursor-pointer active:bg-orange-600/20">
  Clicks: {count}
</button>
