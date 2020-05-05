export default {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'],
    size: ['Narrow', 'Tiny', 'Small', 'Medium', 'Large', 'X-Large', 'Super'],
    time: {
        fish: ['All day', '9 AM - 4 PM', '4 PM - 9 AM', '9 AM - 4 PM, 9 PM - 4 AM', '4 AM - 9 PM', '6 PM - 4 AM', '9 PM - 4 AM'],
        bugs: ['All day', '4 AM - 7 PM', '8 AM - 5 PM', '8 AM - 7 PM', '5 PM - 8 AM', '7 PM - 4 AM', '7 PM - 8 AM',
                '11 PM - 8 AM', '11 PM - 4 PM', '4 PM - 11 PM', '4 PM - 5 PM', '8 AM - 4 PM', '4 AM - 8 AM ',
                '4 PM - 7 PM', '5 PM - 7 PM', '5 PM - 4 AM', '4 AM - 8 AM, 4 PM - 7 PM', '4 AM - 8 AM, 5 PM - 7 PM'
              ]
    },
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
        bugs: [
            {},// all day
            {res: false, min: 4, max: 19},// 2 = 4 AM - 7 PM
            {res: false, min: 8, max: 17},// 3 = 8 AM - 5 PM
            {res: false, min: 8, max: 19},// 4 = 8 AM - 7 PM
            {res: true, min: 17, max: 8},// 5 = 5 PM - 8 AM
            {res: true, min: 19, max: 4},// 6 = 7 PM - 4 AM
            {res: true, min: 19, max: 8},// 7 = 7 PM - 8 AM
            {res: true, min: 23, max: 8},// 8 = 11 PM - 8 AM
            {res: true, min: 23, max: 16},// 9 = 11 PM - 4 PM
            {res: false, min: 16, max: 23},// 10 = 4 PM - 11 PM
            {res: false, min: 16, max: 17},// 11 = 4 PM - 5 PM
            {res: false, min: 8, max: 16},// 12 = 8 AM - 4 PM
            {res: false, min: 4, max: 8},// 13 = 4 AM - 8 AM 
            {res: false, min: 16, max: 19},// 14 = 4 PM - 7 PM
            {res: false, min: 17, max: 19},// 15 = 5 PM - 7 PM
            {res: true, min: 17, max: 4},// 16 = 5 PM - 4 AM
            {double: true, falseRange: [9,10,11,12,13,14,15,20,21,22,23,0]},// 17 = 4 AM - 8 AM, 4 PM - 7 PM
            {double: true, falseRange: [9,10,11,12,13,14,15,16,20,21,22,23,0]}// 18 = 4 AM - 8 AM, 5 PM - 7 PM
        ]
    },
    seasons: {
        "5": [3,4,5], //spring
        "6": [6,7,8], //summer
        "7": [9,10,11], //fall
        "8": [12,1,2]   //winter
    }
}