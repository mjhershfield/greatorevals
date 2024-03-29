<script lang="ts">
    import { Stack, Modal, Group} from "@svelteuidev/core";
    import { course_mappings, department_mappings, professor_mappings } from "./mappings";
    import { bubble_sort, heap_sort, insertion_sort, merge_sort } from "./sorts";
    import SearchResultCard from "./SearchResultCard.svelte";
    import DetailsView from './DetailsView.svelte';
    
    export let data: EvaluationQuestions[];
    export let filter: FilterState;
    export let dev_info: DevInfo = {
        sort_algorithm: "JS Array.sort()",
        overall_data_size: 0,
        filtered_data_size: 0,
        grouped_data_size: 0,
        filtering_time: 0,
        grouping_time: 0,
        averaging_time: 0,
        sorting_time: 0
    };

    let rows_matching_filter: number[] = new Array();
    let grouped_data: GroupedData[] = new Array();
    let opened: boolean = false;
    let details_index: number = 0;
    let processing_start: number;
    let filtering_end: number;
    let grouping_end: number;
    let averaging_end: number;
    let sorting_end: number;

    // Open details view showing details for GroupedData at the given index in the grouped_data array
    function open_details_view(index: number)
    {
        opened = true;
        details_index = index;
    }

    // Close details view modal
    function close_details_view()
    {
        opened = false;
    }

    // Set rows_matching_filter to include the index of every element in the overall data array
    // that matches the user-defined filter from FilterOptions.svelte
    function filter_data(filter: FilterState)
    {
        // Remove all items from rows_matching_filter
        rows_matching_filter.splice(0);
        // If the app is opened for the first time, the filter will be undefined until the "Filter"
        // button is pressed for the first time. In this case, we return early since there is no 
        // defined filter
        if (filter === undefined)
        {
            return;
        }
        else
        {
            for (const row of data.entries())
            {
                // Skip over every row of the overall data that doesn't match the filter.
                // We consider an empty filter to mean that every item is allowed.
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
                // If the row matches every criteria, add it to the list of filtered data
                rows_matching_filter.push(row[0]);
            }
        }
    }

    function group_data()
    {
        // Remove all existing items from grouped_data
        grouped_data.splice(0);
        // index mappings maps from a department/course/professor ID -> index in grouped_data for
        // data that matches that ID
        let index_mappings = new Map<number, number>;
        let index_to_match: number;
        for (const row_index of rows_matching_filter)
        {
            // Determine what integer corresponds to a match based on what type of comparison we
            // are making.
            switch (filter.group_by)
            {
                case "Course":
                    index_to_match = data[row_index].c;
                    break;
                case "Department":
                    index_to_match = data[row_index].d;
                    break;
                case "Professor":
                    index_to_match = data[row_index].p;
                    break;
            }

            if (index_mappings.has(index_to_match))
            {
                // Add current row to existing GroupedData object
                grouped_data[index_mappings.get(index_to_match)].matching_rows.push(row_index);
            }
            else
            {
                // Create new GroupedData object
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

    // Compute average ratings per question in each group and the overall average rating for each group.
    function compute_averages()
    {
        let number_of_rows_per_question: number[] = new Array(10);
        let current_row: EvaluationQuestions;
        let number_of_questions_answered_in_group: number;
        for (let group of grouped_data)
        {
            // Reset the number of rows per question and the number of questions answered in this group to 0
            number_of_rows_per_question.fill(0, 0);
            number_of_questions_answered_in_group = 0;

            // For each data object in the group, add the average rating for the question represented
            // by that row to the index in the group's average ratings by question array representing
            // that question.
            for (const row_index of group.matching_rows)
            {
                current_row = data[row_index]
                group.average_ratings_by_question[current_row.q] += 
                    (1 * current_row.p1 + 2 * current_row.p2 + 3 * current_row.p3 +
                     4 * current_row.p4 + 5 *current_row.p5);
                number_of_rows_per_question[current_row.q] += 1;
            }

            // Based on how many data objects there were for each question, compute the average rating for
            // each question and add it to the overall average rating for the group.
            for (let q_index = 0; q_index < 10; q_index++) {
                if (number_of_rows_per_question[q_index] > 0)
                {
                    group.average_ratings_by_question[q_index] /= number_of_rows_per_question[q_index];
                    number_of_questions_answered_in_group += 1;
                    group.overall_average_rating += group.average_ratings_by_question[q_index];
                }
            }

            // Compute the overall average rating for the group
            group.overall_average_rating /= number_of_questions_answered_in_group;
        }
    }

    // Sort the data for viewing by the user
    function sort_data()
    {
        // If the "Filter" button has not been pressed yet (e.g. page reload), don't bother sorting.
        if (filter === undefined)
        {
            return;
        }

        let comparison_function: (a: GroupedData, b: GroupedData) => number;

        // Choose correct comparison function depending on what we are sorting by and the comparison order.
        if (filter.sort_order == "Ascending")
        {
            switch (filter.sort_by)
            {
                case "Name":
                    switch(filter.group_by)
                    {
                        case "Course":
                            comparison_function = (a, b) => course_mappings[data[a.matching_rows[0]].c].localeCompare(course_mappings[data[b.matching_rows[0]].c]);
                            break;
                        case "Department":
                            comparison_function = (a, b) => department_mappings[data[a.matching_rows[0]].d].localeCompare(department_mappings[data[b.matching_rows[0]].d]);
                            break;
                        case "Professor":
                            comparison_function = (a, b) => professor_mappings[data[a.matching_rows[0]].p].localeCompare(professor_mappings[data[b.matching_rows[0]].p]);
                            break;
                    }
                    break;

                    case "Rating":
                        comparison_function = (a, b) => a.overall_average_rating - b.overall_average_rating;
                        break;
            }
        }
        else if (filter.sort_order == "Descending")
        {
            switch (filter.sort_by)
            {
                case "Name":
                    switch(filter.group_by)
                    {
                        case "Course":
                            comparison_function = (a, b) => course_mappings[data[b.matching_rows[0]].c].localeCompare(course_mappings[data[a.matching_rows[0]].c]);
                            break;
                        case "Department":
                            comparison_function = (a, b) => department_mappings[data[b.matching_rows[0]].d].localeCompare(department_mappings[data[a.matching_rows[0]].d]);
                            break;
                        case "Professor":
                            comparison_function = (a, b) => professor_mappings[data[b.matching_rows[0]].p].localeCompare(professor_mappings[data[a.matching_rows[0]].p]);
                            break;
                    }
                    break;

                    // Sort by ratings by default
                    case "Rating":
                        comparison_function = (a, b) => b.overall_average_rating - a.overall_average_rating;
                        break;
            }
        }
        
        // Use sorting algorithm specified in the Dev Info modal
        switch (dev_info.sort_algorithm)
        {
            case "Bubble Sort":
                grouped_data = bubble_sort(grouped_data, comparison_function);
                break;
            case "Insertion Sort":
                grouped_data = insertion_sort(grouped_data, comparison_function);
                break;
            case "Heap Sort":
                grouped_data = heap_sort(grouped_data, comparison_function);
                break;
            case "Merge Sort":
                grouped_data = merge_sort(grouped_data, comparison_function);
                break;
            case "JS Array.sort()":
                grouped_data = grouped_data.sort(comparison_function);
                break;
        }
    }

    // Updates the dev_info object with how long each step of data processing took and the length
    // of each list processed.
    function update_dev_info()
    {
        dev_info.overall_data_size = data.length;
        dev_info.filtered_data_size = rows_matching_filter.length;
        dev_info.grouped_data_size = grouped_data.length;
        dev_info.filtering_time = (filtering_end - processing_start) / 1000;
        dev_info.grouping_time = (grouping_end - filtering_end) / 1000;
        dev_info.averaging_time = (averaging_end - grouping_end) / 1000;
        dev_info.sorting_time = (sorting_end - averaging_end) / 1000;
    }

    // Whenever filter changes ("Filter" button is pressed), reprocess the list of data to be viewed.
    $: {
            processing_start = Date.now();
            filter_data(filter);
            filtering_end = Date.now()
            group_data();
            grouping_end = Date.now()
            compute_averages();
            averaging_end = Date.now()
            sort_data();
            sorting_end = Date.now()
            update_dev_info()
        }
</script>

<Modal {opened} on:close={close_details_view} withCloseButton={false} centered size="90vw">
    <DetailsView details_data={grouped_data[details_index]} grouping_method={filter.group_by} overall_data={data} />
</Modal>
<Stack>
    {#if filter === undefined}
        <p class=" text-center">Choose a filter from the left panel</p>
    {:else if grouped_data.length == 0}
        <p class=" text-center">No results match your filter selection</p>
    {:else}
        {#each grouped_data.slice(0, 30) as row, index}
            <SearchResultCard overall_data={data} group_data={row} grouping_method={filter.group_by} on:open_details={() => {open_details_view(index)}}/>
        {/each}
    {/if}
</Stack>
