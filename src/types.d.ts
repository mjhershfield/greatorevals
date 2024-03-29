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
    sort_by: SortOptions;
    sort_order: SortOrders;
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

interface DevInfo
{
    sort_algorithm: SortAlgorithms;
    overall_data_size: number;
    filtered_data_size: number;
    grouped_data_size: number;
    filtering_time: number;
    grouping_time: number;
    averaging_time: number;
    sorting_time: number;
}

type GroupingOptions = "Department" | "Course" | "Professor";
type SortOptions = "Rating" | "Name";
type SortOrders = "Ascending" | "Descending";
type SortAlgorithms = "JS Array.sort()" | "Merge Sort" | "Heap Sort" | "Insertion Sort" | "Bubble Sort";