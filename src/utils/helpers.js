export default {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'],
    size: ['Narrow', 'Tiny', 'Small', 'Medium', 'Large', 'X-Large', 'Super'],
    time: ['All day', '9 AM - 4 PM', '4 PM - 9 AM', '9 AM - 4 PM, 9 PM - 4 AM', '4 AM - 9 PM', '6 PM - 4 AM', '9 PM - 4 AM'],
    timeRanges: { //res = respectively
        fish: [
            {}, //all day
            {res: false, min: 9, max: 16}, // 9 AM - 4 PM
            {res: true, min: 16, max: 9}, // 4 PM - 9 AM
            {double: true, falseRange: [17,18,19,20,5,6,7,8]}, //(9 AM - 4 PM & 9 PM - 4 AM)
            {res: false, min: 4, max: 21},  // 4 AM - 9 PM
            {res: true, min: 18, max: 4},  // 6 PM - 4 AM
            {res: true, min: 21, max: 4} // 9 PM - 4 AM
        ],
        bugs: []
    }
}