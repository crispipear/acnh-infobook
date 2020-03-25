import Helpers from './helpers';
import { within } from '@testing-library/react';

function getAvailability(item, north){
    if(item.allYear){
        if(item.time == 1){
            return true
        }else if(withinTime(item.time)){
            return true
        }

    }
    if(!item.allYear){
        let months = north ? item.monthsN : item.monthsS;
        if(withinMonth(months)){
            if(item.time == 1 || withinTime(item.time)){
                return true
            }
        }
    }
    return false;
}

function withinTime(time){
    let curTime = new Date().getHours();
    let timeRange = Helpers.timeRanges[time - 1];
    if (timeRange.includes(curTime)){
        return true;
    }
}

function withinMonth(months){
    let curMonth = new Date().getMonth() + 1;
    return months.includes(curMonth)
}

export default getAvailability