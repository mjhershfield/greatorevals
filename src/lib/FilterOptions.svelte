<script lang="ts">
    import { Button, Checkbox, Stack, TextInput, Divider, NativeSelect } from '@svelteuidev/core';
    import {createEventDispatcher} from "svelte";
    import {course_mappings, course_level_mappings, department_mappings, professor_mappings, question_mappings, term_mappings} from "./mappings";
    import Fuse from "fuse.js";

    const dispatch = createEventDispatcher();

    let department_search_term: string = "";
    let course_search_term: string = "";
    let prof_search_term: string = "";

    let department_search_result: Fuse.FuseResult<string>[];
    let course_search_result: Fuse.FuseResult<string>[];
    let prof_search_result: Fuse.FuseResult<string>[];

    const search_options: Fuse.IFuseOptions<string> = 
    {
        minMatchCharLength: 3,
    };

    const department_search: Fuse<string> = new Fuse(department_mappings, search_options);
    const course_search: Fuse<string> = new Fuse(course_mappings, search_options);
    const prof_search: Fuse<string> = new Fuse(professor_mappings, search_options);

    // Whenever a search term updates, we update the corresponding search results.
    $: department_search_result = department_search.search(department_search_term).slice(0, 5);
    $: course_search_result = course_search.search(course_search_term).slice(0, 5);
    $: prof_search_result = prof_search.search(prof_search_term).slice(0, 5);

    let filter_state: FilterState = {
        group_by: "Department",
        sort_by: "Rating",
        sort_order: "Descending",
        departments: new Set<number>,
        courses: new Set<number>,
        course_levels: new Set<number>,
        professors: new Set<number>,
        terms: new Set<number>,
        questions: new Set<number>
    };

    // When a department search result is clicked, toggle its membership in the filter
    function department_clicked(department_num: number) 
    {
        if (filter_state.departments.has(department_num))
            {
                filter_state.departments.delete(department_num);
            }
            else 
            {
                filter_state.departments.add(department_num);
            }
            filter_state = filter_state;
    };

    // When a course search result is clicked, toggle its membership in the filter
    function course_clicked(course_num: number) 
    {
        if (filter_state.courses.has(course_num))
            {
                filter_state.courses.delete(course_num);
            }
            else 
            {
                filter_state.courses.add(course_num);
            }
            filter_state = filter_state;
    };

    // When a course level checkbox is clicked, toggle its membership in the filter
    function course_level_clicked(course_level: number) 
    {
        if (filter_state.course_levels.has(course_level))
            {
                filter_state.course_levels.delete(course_level);
            }
            else 
            {
                filter_state.course_levels.add(course_level);
            }
            filter_state = filter_state;
    };

    // When a professor search result is clicked, toggle its membership in the filter
    function prof_clicked(prof_num: number) 
    {
        if (filter_state.professors.has(prof_num))
            {
                filter_state.professors.delete(prof_num);
            }
            else 
            {
                filter_state.professors.add(prof_num);
            }
            filter_state = filter_state;
    };

    // When a question checkbox is clicked, toggle its membership in the filter
    function question_clicked(question_num: number) 
    {
        if (filter_state.questions.has(question_num))
            {
                filter_state.questions.delete(question_num);
            }
            else 
            {
                filter_state.questions.add(question_num);
            }
            filter_state = filter_state;
    };

    // When a term checkbox is clicked, toggle its membership in the filter
    function term_clicked(term_num: number) 
    {
            if (filter_state.terms.has(term_num))
            {
                filter_state.terms.delete(term_num);
            }
            else 
            {
                filter_state.terms.add(term_num);
            }
            filter_state = filter_state;
    };

    // When the "Filter" button is clicked, fire an even to update the current state of the filter
    // throughout the entire app.
    function dispatch_filter_signal()
    {
        dispatch("new_filter", {filter: filter_state});
    }
</script>

<Stack>
    <NativeSelect data={["Department", "Course", "Professor"]} label="Compare:" bind:value={filter_state.group_by}/>
    <NativeSelect data={["Rating", "Name"]} label="Sort By:" bind:value={filter_state.sort_by}/>
    <NativeSelect data={["Descending", "Ascending"]} label="Sort Order:" bind:value={filter_state.sort_order}/>
    <p>Filtering Options:</p>
    <details>
        <summary class="text-center cursor-pointer">Departments</summary>
        <TextInput placeholder="Search for a department" bind:value={department_search_term}/>
        <Stack override={{ gap: 2}}>
            {#each department_search_result as result}
                <Button variant="light" ripple on:click={()=>{department_clicked(result.refIndex)}}>{result.item}</Button>
            {/each}
            <Divider />
            {#each [...filter_state.departments.values()] as department_index}
                <Button variant="filled" ripple on:click={()=>{department_clicked(department_index)}}>{department_mappings[department_index]}</Button>
            {/each}
        </Stack>
    </details>

    <details>
        <summary class="text-center cursor-pointer">Courses</summary>
        <TextInput placeholder="Search for a course" bind:value={course_search_term}/>
        <Stack override={{ gap: 2}}>
            {#each course_search_result as result}
                <Button variant="light" ripple on:click={()=>{course_clicked(result.refIndex)}}>{result.item}</Button>
            {/each}
            <Divider />
            {#each [...filter_state.courses.values()] as course_index}
                <Button variant="filled" ripple on:click={()=>{course_clicked(course_index)}}>{course_mappings[course_index]}</Button>
            {/each}
        </Stack>
    </details>

    <details>
        <summary class="text-center cursor-pointer">Course Level</summary>
            {#each course_level_mappings as level, index}
                <Checkbox label="{level}" on:click={() => course_level_clicked(index + 1)} class=" my-2"/>
            {/each}
    </details>

    <details>
        <summary class="text-center cursor-pointer">Professors</summary>
        <TextInput placeholder="Search for a professor" bind:value={prof_search_term}/>
        <Stack override={{ gap: 2}}>
            {#each prof_search_result as result}
                <Button variant="light" ripple on:click={()=>{prof_clicked(result.refIndex)}}>{result.item}</Button>
            {/each}
            <Divider />
            {#each [... filter_state.professors.values()] as prof_index}
                <Button variant="filled" ripple on:click={()=>{prof_clicked(prof_index)}}>{professor_mappings[prof_index]}</Button>
            {/each}
        </Stack>
    </details>

    <details>
        <summary class="text-center cursor-pointer">Terms</summary>
            {#each term_mappings as term, index}
                <Checkbox label="{term}" on:click={() => term_clicked(index)} class=" my-2"/>
            {/each}
    </details>

    <details>
        <summary class="text-center cursor-pointer">Questions</summary>
            {#each question_mappings as question, index}
                <Checkbox label="{question}" on:click={() => question_clicked(index)} class=" my-2"/>
            {/each}
    </details>

    <Button on:click={dispatch_filter_signal} variant="gradient" ripple class="min-h-4 flex-shrink-0 mb-2">Filter</Button>
</Stack>