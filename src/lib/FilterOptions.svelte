<script lang="ts">
    import 'tw-elements';
    import {question_mappings, term_mappings} from "../assets/mappings";
    import {question_filter, term_filter} from "./stores";

    function question_clicked(event: Event) 
    {
        const target = event.target as HTMLInputElement;
        const question_num: unknown = target.id.at(-1);
        question_filter.update(current_filter => {
            if (current_filter.includes(<number> question_num))
            {
                current_filter.splice(current_filter.indexOf(<number> question_num), 1)
            }
            else 
            {
                current_filter.push(<number> question_num);
            }
            return current_filter;
        });
    };

    function term_clicked(event: Event) 
    {
        const target = event.target as HTMLInputElement;
        const term_num: unknown = target.id.at(-1);
        term_filter.update(current_filter => {
            if (current_filter.includes(<number> term_num))
            {
                current_filter.splice(current_filter.indexOf(<number> term_num), 1)
            }
            else 
            {
                current_filter.push(<number> term_num);
            }
            console.log(current_filter);
            return current_filter;
        });
    };
</script>

<form class="flex flex-col gap-2 h-max w-1/5 bg-blue-100 p-2 rounded-lg overflow-y-auto">
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
        <p class="text-center cursor-pointer" data-bs-toggle="collapse" href="#terms_div">Terms</p>
        <div class=" bg-gray-50 rounded-lg p-2 collapse" id="terms_div">
            {#each term_mappings as term, index}
            <div class=" overflow-x-clip my-2">
                <input type="checkbox" id="term_box_{index}" on:change={term_clicked}>
                <label for="question_box_{index}">{term}</label>
            </div>
            {/each}
        </div>
        <p class="text-center cursor-pointer" data-bs-toggle="collapse" href="#questions_div">Questions</p>
        <div class=" bg-gray-50 rounded-lg p-2" id="questions_div">
            {#each question_mappings as question, index}
            <div class="overflow-x-clip my-2">
                <input type="checkbox" id="question_box_{index}" on:change={question_clicked}>
                <label for="question_box_{index}">{question}</label>
            </div>
            {/each}
        </div>
        <input type="button" value="Filter" class=" cursor-pointer">
</form>