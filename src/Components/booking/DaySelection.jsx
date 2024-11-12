import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const DaySelection = ({onData, openDays, daysCount, dependsOn, venue, booking}) => {

    const [initiateDatePicker, setInitiateDatePicker] = useState(true);
    const [days, setDays] = useState([]);
    

    const selectDays = (numberOfDays) => {

        let today = new Date();
        let day = new Date();
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday'];
        let days = [];

        while( days.length < numberOfDays ){
            while(true){
                if( openDays.includes(daysOfWeek[day.getDay()]) ){
                    const newDay = {
                        isToday: today === day,
                        dayOfWeek: daysOfWeek[day.getDay()],
                        date: day.toISOString().split('T')[0]
                    }
                    days.push(newDay);
                    break;
                }
                day.setDate(day.getDate()+1);
            }
            day.setDate(day.getDate()+1);
        }
        return days;
    }

    useEffect(() => {
        if(openDays){
            setDays(selectDays(daysCount))
        }

    },[openDays, daysCount]);


    return(
        <>
            { booking[dependsOn] && <div className={`grid grid-cols-${daysCount} mb-4`}>
                { days.length > 0 && days.map( (day, index) => (
                    <button
                        type="button"
                        key={index}
                        value={day.date}
                        onClick={ e => onData(day.date)}
                        className={`text-center disabled:cursor-not-allowed font-medium capitalize ${day.date === booking.date && 'text-green-500 underline'}`}
                    >
                        <p>
                            {day.isToday ? 'Today' : day.dayOfWeek}
                            {!day.isToday && <br/>}
                            {!day.isToday && day.date}
                        </p>
                    </button>
                ))}
            </div> }
        </>
    )
}

export default DaySelection;