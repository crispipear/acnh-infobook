import Helpers from './helpers';

function getAvailability(item, north, type){
    if(item.allYear){
        if(item.time == 1){
            return true
        }else if(withinTime(item.time, type)){
            return true
        }

    }
    if(!item.allYear){
        let months = north ? item.monthsN : item.monthsS;
        if(withinMonth(months)){
            if(item.time == 1 || withinTime(item.time, type)){
                return true
            }
        }
    }
    return false;
}

function withinTime(time, type){
    let curHour = new Date().getHours();
    let timeRange = Helpers.timeRanges[type][time - 1];
    if(timeRange.double){
        return !timeRange.falseRange.includes(curHour)
    }
    if(timeRange.res){
        return (curHour >= timeRange.min && curHour <= timeRange.max)
    }else{
        return (curHour >= timeRange.min || curHour <= timeRange.max)
    }
}

function withinMonth(months){
    let curMonth = new Date().getMonth() + 1;
    return months.includes(curMonth)
}

export default getAvailability