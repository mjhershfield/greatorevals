interface EvaluationQuestions
{
    d: number, // Department (int)
    c: number, // Course Number/description
    p: number, // Professor
    t: number, // Term (int)
    q: number, // Question (int)
    p1: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
}

interface FilterState
{
    group_by: GroupingOptions;
    departments: Set<number>;
    courses: Set<number>;
    course_levels: Set<number>;
    professors: Set<number>;
    terms: Set<number>;
    questions: Set<number>;
}

interface GroupedData
{
    matching_rows: number[];
    average_ratings_by_question: number[];
    overall_average_rating : number;
}

type GroupingOptions = "Department" | "Course Number" | "Professor";