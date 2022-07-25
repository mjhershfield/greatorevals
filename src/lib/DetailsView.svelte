<script lang="ts">
    import { onMount } from 'svelte';
    import {course_mappings, department_mappings, professor_mappings, question_mappings} from "../assets/mappings";
    import Chart from 'chart.js/auto/auto.js';
    import { Grid } from "@svelteuidev/core";
    export let overall_data: EvaluationQuestions[];
    export let details_data: GroupedData;
    export let grouping_method: GroupingOptions;

    let canvas_element: HTMLCanvasElement;
    let chart_title: string;
    let ones: number[] = new Array(10).fill(1, 0);
    let twos: number[] = new Array(10).fill(1, 0);
    let threes: number[] = new Array(10).fill(1, 0);
    let fours: number[] = new Array(10).fill(1, 0);
    let fives: number[] = new Array(10).fill(1, 0);
    let extra_info_array: number[] = [];

    // TODO: compute actual data for chart lol

    chart_title = "Details for ";
    if (grouping_method == "Course Number")
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

    const data = {
    labels: question_mappings,
    datasets: [
        {
            // 1 ratings for every question
        label: 'Strongly Disagree',
        data: ones,
        backgroundColor: "#ff0000bb",
        },
        {
            // 2 ratings for every question
        label: 'Disagree',
        data: twos,
        backgroundColor: "#00ff00bb",
        },
        {
            // 3 ratings for every question
        label: 'Neutral',
        data: threes,
        backgroundColor: "#0000ffbb",
        },
        {
            // 4 ratings for every question
        label: 'Agree',
        data: fours,
        backgroundColor: "#ffff00bb",
        },
        {
            // 5 ratings for every question
        label: 'Strongly Agree',
        data: fives,
        backgroundColor: "#00ffffbb",
        }]
    };
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
            // Is responsive necessary?
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
    onMount(()=> {
        const ctx = canvas_element.getContext('2d');
        // Initialize chart using default config set
        let myChart = new Chart(ctx, config);
    });

    function populate_info_array(details_data: GroupedData)
    {
        extra_info_array.splice(0);
        let extra_info_set: Set<number> = new Set<number>;
        if (grouping_method == "Department")
        {
            return;
        }
        for (const row_index of details_data.matching_rows)
        {
            if (grouping_method == "Course Number")
            {
                if (!extra_info_set.has(overall_data[row_index].p))
                {
                    extra_info_set.add(row_index);
                    extra_info_array.push(row_index);
                }
            }
            else if (grouping_method == "Professor")
            if (!extra_info_set.has(overall_data[row_index].c))
            {
                extra_info_set.add(row_index);
                extra_info_array.push(row_index);
            }
        }
    }

    $: populate_info_array(details_data);
</script>

<!-- TODO: show comparison between professor and similar professors? -->
<Grid>
    <Grid.Col span={3}>
        {#if grouping_method == "Course Number" || grouping_method == "Professor"}
            <p>Department: {department_mappings[overall_data[details_data.matching_rows[0]].d]}</p>
        {/if}
        {#if grouping_method == "Course Number"}
            <p>Professors that have taught this course:</p>
            {#each extra_info_array as professor_index}
                <p>{professor_mappings[professor_index]}</p>
            {/each}
        {:else if grouping_method == "Professor"}
            <p>Courses that this professor has taught:</p>
            {#each extra_info_array as course_index}
                <p>{course_mappings[course_index]}</p>
            {/each}
        {/if}
    </Grid.Col>
    <Grid.Col span={9}>
        <canvas bind:this={canvas_element}/>
    </Grid.Col>
</Grid>
