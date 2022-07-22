interface EvaluationQuestions
{
    d: number, // Department (int)
    c: string, // Course Number/description
    p: string, // Professor
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
    departments: number[];
    courses: number[];
    course_levels: number[];
    professors: number[];
    terms: number[];
    questions: number[];
}