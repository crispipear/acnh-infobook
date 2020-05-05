import Helpers from './helpers';

function generateTags(item, north, type){
    let tags = [];
    let status = availabilityStatus(item, north, type);
    if(status.includes(1)){
        tags.push({text: 'now', class: 'tag-now'});
    }
    if(!status.includes(2)){
        tags.push({text: 'unavailable', class: 'tag-unavai'})
    }
    if(status.includes(3)){
        tags.push({text: 'over soon', class: 'tag-oversoon'})
    }
    if(status.includes(4)){
        tags.push({text: 'new', class: 'tag-new'})
    }

    return tags
}

function availabilityStatus(item, north, type){
    //statusType: 
    //1 = available at the very moment
    //2 = available this month
    //3 = over soon
    //4 = new this month
    //5 = spring
    //6 = summer
    //7 = autumn
    //8 = winter

    let status = []
    let curMonth = new Date().getMonth() + 1;
    let months = north ? item.monthsN : item.monthsS;
    if(item.allYear){
        status.push(2);
        if(item.time == 1){
            status.push(1);
        }else if(withinTime(item.time, type)){
            status.push(1);
        }
    }else{
        if(withinMonth(months)){
            status.push(2);
            if(item.time == 1 || withinTime(item.time, type)){
                status.push(1);
            }
            if(!months.includes(curMonth+1)){
                status.push(3);
            }
            if(!months.includes(curMonth-1)){
                status.push(4);
            }
        }
        //check seasons
        [5,6,7,8].map(seasonNum => {
            if(months.some(m => Helpers.seasons[seasonNum].includes(m))){
                status.push(seasonNum)
            }
        })
    }

    return status;
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
    availabilityStatus
}