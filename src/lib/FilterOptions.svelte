<script lang="ts">
    import {question_mappings, term_mappings} from "../assets/mappings";
    import {onMount} from "svelte";
    let filter_options: FilterState;
    let show_questions: boolean = false;

    function toggle_questions_visible() {show_questions = !show_questions};
</script>

<form class="flex flex-col gap-2 h-max max-w-sm bg-blue-100 p-2 rounded-lg overflow-y-auto">
        <!-- Filtering Menu -->
        <p>Filtering Options:</p>
        <div>
            <p class="text-center">Departments</p>
        </div>
        <div>
            <p class="text-center">Classes</p>
        </div>
        <div>
            <p class="text-center">Professors</p>
        </div>
        <div>
            <p class="text-center">Terms</p>
        </div>
        <p class="text-center cursor-pointer" on:click={toggle_questions_visible}>Questions</p>
        <div class=" bg-gray-50 rounded-lg p-2 {show_questions ? "" : "invisible"}">
            {#each question_mappings as question, index}
            <div class="overflow-x-clip">
                <input type="checkbox" id="question_box_{index}">
                <label for="question_box_{index}">{question}</label>
            </div>
            {/each}
        </div>
        <input type="button" value="Filter" class=" cursor-pointer">
</form>