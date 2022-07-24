<script lang="ts">
    import { course_mappings, professor_mappings, term_mappings } from "../assets/mappings";
    export let data: EvaluationQuestions[];
    export let filter: FilterState;
    let filtered_data: EvaluationQuestions[] = data;
    let compacted_filtered_data = data;

    function filter_data(filter: FilterState)
    {
        if (filter === undefined)
        {
            filtered_data = data;
        }
        else
        {
            filtered_data = data.filter((row: EvaluationQuestions): boolean => {
                if ((filter.departments.size > 0) && !filter.departments.has(row.d))
                {
                    return false;
                }
                if ((filter.courses.size > 0) && !filter.courses.has(row.c))
                {
                    return false;
                }
                if ((filter.course_levels.size > 0) && !filter.course_levels.has(+course_mappings[row.c].at(3)))
                {
                    return false;
                }
                if ((filter.professors.size > 0) && !filter.professors.has(row.p))
                {
                    return false;
                }
                if ((filter.terms.size > 0) && !filter.terms.has(row.t))
                {
                    return false;
                }
                if ((filter.questions.size > 0) && !filter.questions.has(row.q))
                {
                    return false;
                }
                return true;
            })
        }
        // COMPACT DATA REPRESENTATION SO THAT ALL QUESTIONS FOR SAME COURSE ARE MERGED INTO ONE?
    }

    $: filter_data(filter);
</script>

<div>
    <!-- Search Results -->
    {#each filtered_data.slice(0, 10) as row}
        <p>Course: {course_mappings[row.c]}</p>
        <p>Professor: {professor_mappings[row.p]}</p>
        <p>Term: {term_mappings[row.t]}</p>
        <p>Click for more info</p>
    {/each}
</div>
