import Helpers from './helpers';

function generateTags(item, north, type){
    let tags = [];
    if(availableNow(item, north, type)){
        tags.push({text: 'now', class: 'tag-now'})
    }
    if(newThisMonth(item, north)){
        tags.push({text: 'new', class: 'tag-new'})
    }
    if(overSoon(item, north)){
        tags.push({text: 'over soon', class: 'tag-oversoon'})
    }
    return tags
}

function overSoon(item, north){
    if(item.allYear){
        return false;
    }
    let curMonth = new Date().getMonth() + 1;
    let months = north ? item.monthsN : item.monthsS;
    return !months.includes(curMonth+1) && months.includes(curMonth);
}

function newThisMonth(item, north){
    if(item.allYear){
        return false;
    }
    let curMonth = new Date().getMonth() + 1;
    let months = north ? item.monthsN : item.monthsS;
    return !months.includes(curMonth-1) && months.includes(curMonth);
}

function availableNow(item, north, type){
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
    let timeRange = Helpers.timeRanges[type][time - 1];
    if(timeRange){
        let curHour = new Date().getHours();
        if(timeRange.double){
            return !timeRange.falseRange.includes(curHour)
        }
        if(!timeRange.res){
            return (curHour >= timeRange.min && curHour < timeRange.max)
        }else{
            return (curHour >= timeRange.min || curHour < timeRange.max)
        }
    }
}

function withinMonth(months){
    let curMonth = new Date().getMonth() + 1;
    return months.includes(curMonth)
}

export {
    generateTags,
    overSoon,
    availableNow,
    newThisMonth,
}