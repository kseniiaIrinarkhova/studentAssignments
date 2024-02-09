/**
 * Input data
 */
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

const NewCourseInfo = {
    id: 423,
    name: "Introduction to Python"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        },
        {
            //case for 0 possible points
            id: 4,
            name: "Look at Loops",
            due_at: "2023-02-13",
            points_possible: 0
        },
        {
            //case for string in  possible points
            id: 5,
            name: "Look at Arrays",
            due_at: "2023-02-13",
            points_possible: "Not graded"
        }


    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    },
    //additional test cases
    {
        learner_id: 125,
        assignment_id: 4,
        submission: {
            submitted_at: "2023-01-29",
            score: 0,
        }
    },
    {
        learner_id: 132,
        assignment_id: 4,
        submission: {
            submitted_at: "2023-02-20",
            score: 100,
        }
    },
    {
        learner_id: 111,
        assignment_id: 4,
        submission: {
            submitted_at: "2023-02-21",
            score: 0,
        }
    },
    {
        learner_id: 111,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-01",
            score: "25", //string instead of number, but still number
        }
    },
    {
        learner_id: 111,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-01-21",
            score: "I didn't do it", //string
        }
    },
    {
        learner_id: 111,
        assignment_id: 5, //test for possible points not a number
        submission: {
            submitted_at: "2023-01-21",
            score: 10
        }
    }

];

export { CourseInfo, NewCourseInfo, AssignmentGroup, LearnerSubmissions };