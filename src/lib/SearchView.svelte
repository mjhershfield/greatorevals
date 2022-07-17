<script>
    export let data;
    let filtered_data = data

    // TODO: FILTER DATA in a pane on the left side, save filtered data to a filtered_data array
    // TODO: SORT FILTERED DATA BEFORE IT IS SHOWN
    // TODO: CREATE CARDS AND PAGINATION for filtered data
    // TODO: CREATE DETAILS VIEW for when cards are clicked
</script>

<main>
    {#each filtered_data.slice(0, 11) as row}
        <p>Question {row.q}</p>
    {/each}
</main>