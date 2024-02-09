import * as InputData from './input_data.mjs';
import calculateAssignments from './utilities.mjs'

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
    console.log(`Assignment for '${InputData.CourseInfo.name}'`);
    //result for correct assignment
    let result = calculateAssignments(InputData.CourseInfo, InputData.AssignmentGroup, InputData.LearnerSubmissions);

    console.log(result);

    console.log(`Assignment for '${InputData.NewCourseInfo.name}'`);
    //result for wrong course
    result = calculateAssignments(InputData.NewCourseInfo, InputData.AssignmentGroup, InputData.LearnerSubmissions);

    console.log(result);
}
catch (err) {
    console.log(err);
}
console.log("******************************************************************")
