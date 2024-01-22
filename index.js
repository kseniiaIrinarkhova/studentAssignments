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
console.log("******************************************************************")
try {
    console.log(`Assignment for '${CourseInfo.name}'`);
    //result for correct assignment
    let result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

    console.log(result);

    console.log(`Assignment for '${NewCourseInfo.name}'`);
    //result for wrong course
    result = getLearnerData(NewCourseInfo, AssignmentGroup, LearnerSubmissions);

    console.log(result);
}
catch (err) {
    console.log(err);
}
console.log("******************************************************************")
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
    //array with learner's info
    let result = [];
    //Firstly, check that assignment group is belong to course. Otherwise throw an error
    if (course.id !== ag.course_id) { throw new Error("You try to check Assignment Group for another Course!") };

    const currentDate = String(new Date().toJSON()).slice(0, 10); //take current date
    //loop for each assignment
    for (const assignment of ag.assignments) {
        //check the due date to be sure that we need to estimate this assignment

        if (assignment.due_at <= currentDate) {
            //check all students submission for that assignment
            for (const learnerSubmition of submissions.filter(submission => submission.assignment_id === assignment.id)) {
                let student = getLearner(result, learnerSubmition.learner_id); //get reference of a learner from result array
                //add new property where key is assignment id and value is calculated score
                student[assignment.id] = calculateAssignmentScore(student, assignment, learnerSubmition.submission); // calculate assignment score
            };

        } else {
            continue; //skip the assignment if it is not yet due
        }

    }

    calculateAverageScore(result); //calculate average score for each student in list
    deleteAdditionalProperties(result, "avg_result", "avg_max"); //delete additional properties that we need to calculate average score
    
    //return the output
    return result;
}

/**
 * Function that get existing student from the list or add new student to list before return the result
 * @param {array of objects} learners  - lest of all students that submitted assignments
 * @param {number} learner_id  - id of examine learner
 * @returns - the reference for the learner 
 */
function getLearner(learners, learner_id) {
    let learner = {}; //create a new object
    const isStudentExist = learners.some(item => item.id === learner_id); //Boolean variable
    if (isStudentExist) { //check if there we have any other assignments for that student in our result array
        learner = learners.find(item => item.id === learner_id) //if yes, assign the link for the existing object
    }
    else {
        //if there is new student create a new object and add it to our result array
        learner = {
            id: learner_id,
            avg: 0,
            avg_result: 0, //additional properties for average score calculation
            avg_max: 0 //additional properties for average score calculation

        }
        //add new student to list to be sure that next time we will work with the same object
        learners.push(learner); 
    }

    return learner; // return the learner object (reference connected with result array)
}

/**
 * Function to calculate assignment score
 * @param {object} student -student who submit the assignment
 * @param {object} assignmentInfo - assignment info
 * @param {object} learnerSubmition - submition information
 * @returns assignment score rounded to 3 decimal
 */
function calculateAssignmentScore(student, assignmentInfo, learnerSubmition) {
    let studentScore = learnerSubmition.score // local variable for student score
    //check if the submition wasn't late
    if (learnerSubmition.submitted_at > assignmentInfo.due_at) {
        studentScore -= assignmentInfo.points_possible * 0.1 //penalty for late submission
    }
    //check if assignment count or not for final grade
    //decide that if possible scores is 0 - assignment doesn't count
    if (assignmentInfo.points_possible === 0) {
        const scoreMsg = "This assignment does not count toward the final grade."; //string variable
        return scoreMsg;
    }
    //increase additional properties for average score
    student.avg_result += studentScore;
    student.avg_max += assignmentInfo.points_possible;
    //return the result
    return (studentScore / assignmentInfo.points_possible).toFixed(3); //round number to 3 decimal

}

/**
 * Function that calculate average score for each student
 * @param {array of objects} studentsScores 
 */
function calculateAverageScore(studentsScores) {
    //loop through all student's score info
    for (const index in studentsScores) {
        //if maximum available score is 0 skip this student
        if (studentsScores[index].avg_max !== 0) {
            //calculate average score
            studentsScores[index].avg = (studentsScores[index].avg_result / studentsScores[index].avg_max).toFixed(3);
        }
        else { continue; }
    }
    //no return value as we worked with references
}

/**
 * Function that delete listed properties from objects in provided array
 * @param {array of objects with properties} dataArray 
 * @param  {property names} properties 
 */
function deleteAdditionalProperties(dataArray, ...properties){
if(properties.length > 0) // if we have any properties that we want to delete
{
    //loop for each element in dataArray
    dataArray.forEach(element => { 
        //loop for each property in property list
        properties.forEach(property =>{
            //delete property in object
            delete element[property]
        });
        
    });
}
}