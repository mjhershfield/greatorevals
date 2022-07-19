export function filter_data(filter_options: FilterState, original_data: EvaluationQuestions[]) : EvaluationQuestions[]
{
    let filtered_data: EvaluationQuestions[];

    let check_dept: boolean = (filter_options.departments.length != 0);

    for (let index = 0; index < original_data.length; index++) {
        const row = original_data[index];
        
        if (check_dept && !filter_options.departments.includes(row.d))
        {
            continue;
        }

        filtered_data.push(row);
    }

    return filtered_data;
}