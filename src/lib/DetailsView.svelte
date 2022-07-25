<script lang="ts">
    import { onMount } from 'svelte';
    import {course_mappings, department_mappings, professor_mappings, question_mappings} from "../assets/mappings";
    import Chart from 'chart.js/auto/auto.js';
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
</script>

<!-- TODO: show information about what department professor/class is from -->
<!-- TODO: show comparison between professor and similar professors? -->
<canvas bind:this={canvas_element}/>
