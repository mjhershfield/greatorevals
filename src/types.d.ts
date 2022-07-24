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

// TODO: change all of these arrays to maps
interface FilterState
{
    departments: Set<number>;
    courses: Set<number>;
    course_levels: Set<number>;
    professors: Set<number>;
    terms: Set<number>;
    questions: Set<number>;
}

interface CompactedData
{
    department: number;
    course: number;
    professor: number;
    terms: Map<number, Map<number, Ratings>>;
}

interface Ratings
{
    percentage_1: number;
    percentage_2: number;
    percentage_3: number;
    percentage_4: number;
    percentage_5: number;
}