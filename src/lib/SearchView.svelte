<script lang="ts">
    import FilterOptions from "./FilterOptions.svelte";

    export let data: EvaluationQuestions[];
    let filtered_data = data

    // TODO: FILTER DATA in a pane on the left side, save filtered data to a filtered_data array
    // TODO: SORT FILTERED DATA BEFORE IT IS SHOWN
    // TODO: CREATE CARDS AND PAGINATION for filtered data
    // TODO: CREATE DETAILS VIEW for when cards are clicked
</script>

<main class=" flex flex-row h-max gap-2 p-1">
    <FilterOptions />
    <div>
        <!-- Search Results -->
        {#each filtered_data.slice(0, 11) as row}
            <p>Question {row.q}</p>
        {/each}
    </div>
</main>