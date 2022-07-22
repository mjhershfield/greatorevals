<script lang="ts">
    export let data: EvaluationQuestions[];
    let filtered_data = data
</script>

<main class=" flex flex-row h-max gap-2 p-1">
    <div>
        <!-- Search Results -->
        {#each filtered_data.slice(0, 11) as row}
            <p>Question {row.q}</p>
        {/each}
    </div>
</main>