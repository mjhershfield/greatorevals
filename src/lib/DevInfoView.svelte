<script lang="ts">
    import { NativeSelect} from "@svelteuidev/core";
    import { onMount } from "svelte";

    export let dev_info: DevInfo;

    let sort_algorithm_list: SortAlgorithms[] = ["JS Array.sort()", "Merge Sort", "Heap Sort", "Insertion Sort", "Bubble Sort"];
    let sort_algorithm_list_for_dropdown: SortAlgorithms[]

    onMount(()=>{
        sort_algorithm_list_for_dropdown = sort_algorithm_list;
        sort_algorithm_list_for_dropdown.splice(sort_algorithm_list.indexOf(dev_info.sort_algorithm), 1);
        sort_algorithm_list_for_dropdown = [dev_info.sort_algorithm].concat(sort_algorithm_list_for_dropdown);
    });
</script>

<p>Dev Info</p>
<NativeSelect label="Sorting Algorithm" bind:value={dev_info.sort_algorithm} data={sort_algorithm_list_for_dropdown}/>
<p>Size of overall dataset pre-filtering: {dev_info.overall_data_size} elements</p>
<p>Time taken filtering data: {dev_info.filtering_time}s</p>
<p>Size of filtered data: {dev_info.filtered_data_size} elements</p>
<p>Time taken grouping data: {dev_info.grouping_time}s</p>
<p>Number of data groups: {dev_info.grouped_data_size} elements</p>
<p>Time taken computing averages: {dev_info.averaging_time}s</p>
<p>Time taken sorting data: {dev_info.sorting_time}s</p>