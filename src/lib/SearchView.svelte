<script lang="ts">
    import { course_mappings, professor_mappings, term_mappings } from "../assets/mappings";
    export let data: EvaluationQuestions[];
    export let filter: FilterState;
    let filtered_data = data

    function filter_data(filter: FilterState)
    {
        if (filter === undefined)
        {
            filtered_data = data;
        }
        else
        {
            filtered_data = data.filter((row: EvaluationQuestions): boolean => {
                if ((filter.departments.length > 0) && !filter.departments.includes(row.d))
                {
                    return false;
                }
                if ((filter.courses.length > 0) && !filter.courses.includes(row.c))
                {
                    return false;
                }
                let upper_digit_of_course: unknown = course_mappings[row.c].at(3);
                if ((filter.course_levels.length > 0) && !filter.course_levels.includes(<number> upper_digit_of_course))
                {
                    return false;
                }
                if ((filter.professors.length > 0) && !filter.professors.includes(row.p))
                {
                    return false;
                }
                if ((filter.terms.length > 0) && !filter.terms.includes(row.t))
                {
                    return false;
                }
                if ((filter.questions.length > 0) && !filter.questions.includes(row.q))
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
