/**
 * Input data
 */
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
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
    }
];

/* Output format:

const result = [
    {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
    },
    {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
    }
];

*/
/****************************************************************************/
/* Logic section */

try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

    console.log(result);
}
catch (err) {
    console.log(err);
}
console.log("test Log")
/***************************************************************************/
/*Function declaration section */


/**steps 
 * 1) take assignment group and loop for each assignment
 * 2) check if this assignment due date is passed if no - skip this assignment
 * 3) check submissions
 * 4) if there is the first submission for student - create an object, else add new submission 
 * 5) create additional properties for average score calculation
 * 6) calculate all average scores
 * 7) output result
*/
/*
 * Function for counting scores
 * @param {object} course  - course that would be evaluated
 * @param {object} ag  - assignment information for cource
 * @param {array of object} submissions  - students' submission
 * @returns  {array of objects} - return information about each student - their average score and for each assignment
 */
function getLearnerData(course, ag, submissions) {

    let learnerData = {
        id: "",
        avg: "",
        avg_result: 0, //additional property
        avg_max: 0, //additional property
        //"assignment_id":"assignment_score"

    };
    let result = [];
    //Firstly, check that assignment group is belong to course. Otherwise throw an error
    if (course.id !== ag.course_id) { throw new Error("You try to check Assignment Group for another Course!") };

    const currentDate = String(new Date().toJSON()).slice(0, 10); //take current date
    //loop for each assignment
    for (const assignment of ag.assignments) {
        //check the due date to be sure that we need to estimate this assignment
        
        if (assignment.due_at <= currentDate) {
            console.log(assignment);
            //check all students submission for that assignment
            for(const learnerSubmition of submissions.filter( submission => submission.assignment_id === assignment.id)){
                console.log(learnerSubmition);
                let student = getLearner(result, learnerSubmition.learner_id); //get reference of a learner from result array
                console.log(student);
                student.avg +=1;
            };

        } else {
            continue; //skip the assignment if it is not yet due
        }

    }

    return result;
}

function getLearner(learners, learner_id){
    let learner = {};
    if (learners.some(item => item.id === learner_id)){
        learner = learners.find(item => item.id === learner_id)
        console.log(learner);
        learner.avg += 20;
        console.log(learners);
    }
    else{
        learner = {
            id: learner_id,
            avg: 0,
        }
        learners.push(learner);
    }

    return learner;
}
