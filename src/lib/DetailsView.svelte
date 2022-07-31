<script lang="ts">
    import { onMount } from 'svelte';
    import {course_mappings, department_mappings, professor_mappings, question_mappings} from "./mappings";
    import Chart from 'chart.js/auto/auto.js';
    import { Grid } from "@svelteuidev/core";
    export let overall_data: EvaluationQuestions[];
    export let details_data: GroupedData;
    export let grouping_method: GroupingOptions;

    let canvas_element: HTMLCanvasElement;
    let chart_title: string;
    let ones: number[] = new Array(10);
    let twos: number[] = new Array(10);
    let threes: number[] = new Array(10);
    let fours: number[] = new Array(10);
    let fives: number[] = new Array(10);
    let num_answers_per_question: number[] = new Array(10);
    let extra_info_array: number[] = [];
    let extra_info_span: number = 3;

    // Data object used to create chart
    const data = {
    labels: question_mappings,
    datasets: [
        {
            // 1 ratings for every question
        label: 'Strongly Disagree',
        data: ones,
        backgroundColor: "#FD141FBB",
        },
        {
            // 2 ratings for every question
        label: 'Disagree',
        data: twos,
        backgroundColor: "#fd7e14bb",
        },
        {
            // 3 ratings for every question
        label: 'Neutral',
        data: threes,
        backgroundColor: "#7B8791bb",
        },
        {
            // 4 ratings for every question
        label: 'Agree',
        data: fours,
        backgroundColor: "#7AB9F0BB",
        },
        {
            // 5 ratings for every question
        label: 'Strongly Agree',
        data: fives,
        backgroundColor: "#228be6bb",
        }]
    };

    // Configuration info used to create the chart
    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: "y",
            plugins: {
            title: {
                display: true,
                text: chart_title
            },
            },
            responsive: true,
            scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
            }
        }
    };

    // When the DetailsView modal is opened, create the chart.
    onMount(()=> {
        const ctx = canvas_element.getContext('2d');
        // Initialize chart using default config set
        let evals_chart = new Chart(ctx, config);
    });

    // Sets chart title to reflect the group that was clicked
    function update_chart_title()
    {
        chart_title = "Details for ";
        if (grouping_method == "Course")
        {
            chart_title += course_mappings[overall_data[details_data.matching_rows[0]].c];
        }
        else if (grouping_method == "Department")
        {
            chart_title += department_mappings[overall_data[details_data.matching_rows[0]].d];
        }
        else if (grouping_method == "Professor")
        {
            chart_title += professor_mappings[overall_data[details_data.matching_rows[0]].p];
        }
    }

    // The info array is the source of the bulleted list on the left side of the Details View modal.
    // It is in lieu of more detailed statistics being shown. For now, it shows the professors that
    // have taught a selected course and the list of courses taught by a selected professor.
    function populate_info_array()
    {
        extra_info_array = [];
        let extra_info_set: Set<number> = new Set<number>;
        if (grouping_method == "Department")
        {
            return;
        }
        for (const row_index of details_data.matching_rows)
        {
            if (grouping_method == "Course")
            {
                if (!extra_info_set.has(overall_data[row_index].p))
                {
                    extra_info_set.add(overall_data[row_index].p);
                    extra_info_array.push(overall_data[row_index].p);
                }
            }
            else if (grouping_method == "Professor")
            {
                if (!extra_info_set.has(overall_data[row_index].c))
                {
                    extra_info_set.add(overall_data[row_index].c);
                    extra_info_array.push(overall_data[row_index].c);
                }
            }
        }
    }

    // Sets the data used in the chart to reflect the rating distribution in the selected group.
    function update_chart_data()
    {
        // Reset chart data to be all 0's for every question
        ones.fill(0, 0);
        twos.fill(0, 0);
        threes.fill(0, 0);
        fours.fill(0, 0);
        fives.fill(0, 0);
        num_answers_per_question.fill(0, 0);
        let current_row: EvaluationQuestions;
        let current_question_index: number;

        // Iterate through every row in the group to find the average values for each rating for 
        // each question based on how many responses there are per question. Luckily, a divide by 
        // zero leads to an NaN, which is not shown on the chart.
        for (const row_index of details_data.matching_rows)
        {
            current_row = overall_data[row_index];
            current_question_index = current_row.q;

            ones[current_question_index] += current_row.p1;
            twos[current_question_index] += current_row.p2;
            threes[current_question_index] += current_row.p3;
            fours[current_question_index] += current_row.p4;
            fives[current_question_index] += current_row.p5;

            num_answers_per_question[current_question_index] += 1;
        }

        for (let i = 0; i < 10; i++)
        {
            ones[i] /= num_answers_per_question[i];
            twos[i] /= num_answers_per_question[i];
            threes[i] /= num_answers_per_question[i];
            fours[i] /= num_answers_per_question[i];
            fives[i] /= num_answers_per_question[i];
        }
    }

    // Whenever the details data is updated, we update the chart's title, data, and we repopulate the
    // auxiliary info array.
    $: {
        details_data = details_data;
        update_chart_title();
        update_chart_data();
        populate_info_array();
    }

    // Since we don't show any auxiliary info when we are showing details for a department, we set the
    // width of the extra info display to be 0 in this case.
    $: {
        if (grouping_method == "Department")
        {
            extra_info_span = 0;
        }
        else
        {
            extra_info_span = 3;
        }
    }
</script>

<!-- TODO: show comparison between professor and similar professors? -->
<Grid>
    <Grid.Col span={extra_info_span}>
        {#if grouping_method == "Course" || grouping_method == "Professor"}
            <p>Department: {department_mappings[overall_data[details_data.matching_rows[0]].d]}</p>
            <br>
        {/if}
        {#if grouping_method == "Course"}
            <p>Professors that have taught this course:</p>
            <ul class=" list-disc ml-1">
            {#each extra_info_array as professor_index}
                <li>{professor_mappings[professor_index]}</li>
            {/each}
            </ul>
        {:else if grouping_method == "Professor"}
            <p>Courses that this professor has taught:</p>
            <ul class=" list-disc ml-1">
            {#each extra_info_array as course_index}
                <li>{course_mappings[course_index]}</li>
            {/each}
            </ul>
        {/if}
    </Grid.Col>
    <Grid.Col span={12 - extra_info_span}>
        <canvas bind:this={canvas_element}/>
    </Grid.Col>
</Grid>
