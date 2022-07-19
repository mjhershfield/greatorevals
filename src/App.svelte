<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
  import EvalsChart from './lib/EvalsChart.svelte';
  import SearchView from './lib/SearchView.svelte';

  //TODO: create splash screen/pretty loading screen while data is being parsed
</script>

<main>
    <h1>GreatorEvals</h1>
  {#await fetch("final_data.json")}
        <p>waiting for file to be requested</p>
    {:then resp} 
        {#await resp.json()}
            <p>waiting for json parsing</p>
        {:then json} 
            <SearchView data={json} />
        {/await}
    {/await}

</main>
