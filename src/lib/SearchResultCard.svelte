<script lang="ts">
    import { Paper, Grid, Progress, Tooltip, Button } from "@svelteuidev/core";
    import { course_mappings, department_mappings, professor_mappings } from "./mappings";
    import { createEventDispatcher } from "svelte";
    export let overall_data: EvaluationQuestions[];
    export let group_data : GroupedData;
    export let grouping_method: GroupingOptions;
    const dispatch = createEventDispatcher();

    function open_details_view()
    {
        dispatch("open_details", {
            data: group_data,
            grouping_method: grouping_method
        });
    }
</script>

<Paper>
    <Grid justify="space-around" align="center">
        <Grid.Col span={6}>
            {#if grouping_method == "Course"}
                <p>Course: {course_mappings[overall_data[group_data.matching_rows[0]].c]}</p>
            {:else if grouping_method == "Professor"}
                <p>Professor: {professor_mappings[overall_data[group_data.matching_rows[0]].p]}</p>
            {:else if grouping_method == "Department"}
                <p>Department: {department_mappings[overall_data[group_data.matching_rows[0]].d]}</p>
            {/if}
        </Grid.Col>
        <Grid.Col span={3}>
            <Tooltip label="Average Rating: {group_data.overall_average_rating.toFixed(3)}" class=" w-full">
                <Progress size="xl" value={group_data.overall_average_rating * 20}/>
            </Tooltip>
        </Grid.Col>
        <Grid.Col span={3} class="flex flex-row justify-end">
            <Button variant="subtle" compact ripple on:click={open_details_view}>Click for more info ></Button>
        </Grid.Col>
    </Grid>
</Paper>