<script lang="ts">
    import { Button, Checkbox, Stack, TextInput, Divider } from '@svelteuidev/core';
    import {createEventDispatcher} from "svelte";
    import {course_mappings, course_level_mappings, department_mappings, professor_mappings, question_mappings, term_mappings} from "../assets/mappings";

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

    $: department_search_result = department_search.search(department_search_term).slice(0, 5);
    $: course_search_result = course_search.search(course_search_term).slice(0, 5);
    $: prof_search_result = prof_search.search(prof_search_term).slice(0, 5);

    let filter_state: FilterState = {
        departments: [],
        courses: [],
        course_levels:[],
        professors: [],
        terms: [],
        questions: []
    };

    function department_clicked(department_num: number) 
    {
        if (filter_state.departments.includes(department_num))
        {
            filter_state.departments.splice(filter_state.departments.indexOf(department_num), 1)
        }
        else 
        {
            filter_state.departments.push(department_num);
        }
        filter_state = filter_state;
        console.log(filter_state.departments);
    };

    function course_clicked(course_num: number) 
    {
        if (filter_state.courses.includes(course_num))
        {
            filter_state.courses.splice(filter_state.courses.indexOf(course_num), 1)
        }
        else 
        {
            filter_state.courses.push(course_num);
        }
        filter_state = filter_state;
        console.log(filter_state.courses);
    };

    function course_level_clicked(course_level: number) 
    {
        if (filter_state.course_levels.includes(course_level))
        {
            filter_state.course_levels.splice(filter_state.course_levels.indexOf(course_level), 1)
        }
        else 
        {
            filter_state.course_levels.push(course_level);
        }
        filter_state = filter_state;
        console.log(filter_state.course_levels);
    };

    function prof_clicked(prof_num: number) 
    {
        if (filter_state.professors.includes(prof_num))
        {
            filter_state.professors.splice(filter_state.professors.indexOf(prof_num), 1)
        }
        else 
        {
            filter_state.professors.push(prof_num);
        }
        filter_state = filter_state;
        console.log(filter_state.professors);
    };

    function question_clicked(question_num: number) 
    {
        if (filter_state.questions.includes(<number> question_num))
        {
            filter_state.questions.splice(filter_state.questions.indexOf(<number> question_num), 1)
        }
        else 
        {
            filter_state.questions.push(<number> question_num);
        }
        filter_state = filter_state;
        console.log(filter_state.questions);
    };

    function term_clicked(term_num: number) 
    {
            if (filter_state.terms.includes(<number> term_num))
            {
                filter_state.terms.splice(filter_state.terms.indexOf(<number> term_num), 1)
            }
            else 
            {
                filter_state.terms.push(<number> term_num);
            }
            filter_state = filter_state;
            console.log(filter_state.terms);
    };

    function dispatch_filter_signal()
    {
        dispatch("new_filter", {filter: filter_state});
    }
</script>

<div class="flex flex-col gap-2 overflow-y-auto">
    <!-- Filtering Menu -->
    <p>Filtering Options:</p>
    <details>
        <summary class="text-center cursor-pointer">Departments</summary>
        <TextInput placeholder="Search for a department" bind:value={department_search_term}/>
        <Stack override={{ gap: 2}}>
            {#each department_search_result as result}
                <Button variant="light" ripple on:click={()=>{department_clicked(result.refIndex)}}>{result.item}</Button>
            {/each}
            <Divider />
            {#each filter_state.departments as department_index}
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
            {#each filter_state.courses as course_index}
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
            {#each filter_state.professors as prof_index}
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

    <Button on:click={dispatch_filter_signal} variant="gradient" ripple class="min-h-4 flex-shrink-0">Filter</Button>
</div>