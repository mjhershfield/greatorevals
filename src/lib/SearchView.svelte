<script lang="ts">
    import { Stack, Modal} from "@svelteuidev/core";
    import { course_mappings, department_mappings, professor_mappings } from "../assets/mappings";
    import SearchResultCard from "./SearchResultCard.svelte";
    import DetailsView from './DetailsView.svelte';
    
    export let data: EvaluationQuestions[];
    export let filter: FilterState;
    let rows_matching_filter: number[];
    let grouped_data: GroupedData[];
    let processing_in_progress: boolean = false;
    let opened: boolean = false;
    let details_index: number = 0;

    function open_details_view(index: number)
    {
        opened = true;
        details_index = index;
    }

    function close_modal()
    {
        opened = false;
    }

    function filter_data(filter: FilterState)
    {
        rows_matching_filter = []
        if (filter === undefined)
        {
            return;
        }
        else
        {
            for (const row of data.entries())
            {
                if ((filter.departments.size > 0) && !filter.departments.has(row[1].d))
                {
                    continue;
                }
                if ((filter.courses.size > 0) && !filter.courses.has(row[1].c))
                {
                    continue;
                }
                if ((filter.course_levels.size > 0) && !filter.course_levels.has(+course_mappings[row[1].c].at(3)))
                {
                    continue;
                }
                if ((filter.professors.size > 0) && !filter.professors.has(row[1].p))
                {
                    continue;
                }
                if ((filter.terms.size > 0) && !filter.terms.has(row[1].t))
                {
                    continue;
                }
                if ((filter.questions.size > 0) && !filter.questions.has(row[1].q))
                {
                    continue;
                }
                rows_matching_filter.push(row[0]);
            }
            rows_matching_filter = rows_matching_filter;
        }
        // COMPACT DATA REPRESENTATION SO THAT ALL QUESTIONS FOR SAME COURSE ARE MERGED INTO ONE?
    }

    function group_data()
    {
        grouped_data = [];
        // department/course/professor id -> index in grouped_data for matching data
        let index_mappings = new Map<number, number>;
        let index_to_match: number;
        for (const row_index of rows_matching_filter)
        {
            if (filter.group_by == "Course Number")
            {
                index_to_match = data[row_index].c;
            }
            else if (filter.group_by == "Department")
            {
                index_to_match = data[row_index].d;
            }
            else if (filter.group_by == "Professor")
            {
                index_to_match = data[row_index].p;
            }

            if (index_mappings.has(index_to_match))
            {
                // Add to existing GroupedData object
                grouped_data[index_mappings.get(index_to_match)].matching_rows.push(row_index);
            }
            else
            {
                // create new GroupedData object
                index_mappings.set(index_to_match, grouped_data.length);
                grouped_data.push({
                    matching_rows: [row_index],
                    average_ratings_by_question: new Array(10).fill(0, 0),
                    overall_average_rating: 0
                });
            }
        }
        return;
    }

    function compute_averages()
    {
        let number_of_rows_per_question: number[] = new Array(10);
        let current_row: EvaluationQuestions;
        let number_of_questions_answered_in_group: number;
        for (let group of grouped_data)
        {
            number_of_rows_per_question.fill(0, 0);
            number_of_questions_answered_in_group = 0;

            for (const row_index of group.matching_rows)
            {
                current_row = data[row_index]
                group.average_ratings_by_question[current_row.q] += 
                    (1 * current_row.p1 + 2 * current_row.p2 + 3 * current_row.p3 +
                     4 * current_row.p4 + 5 *current_row.p5);
                number_of_rows_per_question[current_row.q] += 1;
            }

            for (let q_index = 0; q_index < 10; q_index++) {
                if (number_of_rows_per_question[q_index] > 0)
                {
                    group.average_ratings_by_question[q_index] /= number_of_rows_per_question[q_index];
                    number_of_questions_answered_in_group += 1;
                    group.overall_average_rating += group.average_ratings_by_question[q_index];
                }
            }

            group.overall_average_rating /= number_of_questions_answered_in_group;
        }

        console.log(grouped_data);
    }

    $: {
            processing_in_progress = true;
            filter_data(filter);
            group_data();
            compute_averages();
            processing_in_progress = false;
        }
</script>

<Modal {opened} on:close={close_modal} withCloseButton={false} centered size="90vw">
    <DetailsView details_data={grouped_data[details_index]} grouping_method={filter.group_by} overall_data={data} />
</Modal>
<Stack>
    <!-- Search Results -->
    {#if filter === undefined}
        <p>Choose a filter from the left panel</p>
    {:else if processing_in_progress}
        <p>Processing in progress</p>
    {:else if grouped_data.length == 0}
        <p>No results match your filter selection</p>
    {:else}
        {#each grouped_data.slice(0, 10) as row, index}
            <SearchResultCard overall_data={data} group_data={row} grouping_method={filter.group_by} on:open_details={() => {open_details_view(index)}}/>
        {/each}
    {/if}
</Stack>
