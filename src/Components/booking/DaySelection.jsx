import { useEffect, useState } from "react";

const DaySelection = ({onData, openDays, daysCount}) => {

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
                        date: `${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}-${day.getFullYear()}`
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
        <div className="flex">
            { days.length > 0 && days.map( (day, index) => (
                <button
                    type="button"
                    key={index}
                    value={day.date}
                    onClick={ e => onData(e.target.value)}
                >{`${day.isToday ? 'Today' : day.dayOfWeek} (${day.date})`}</button>
            ))}
            <input
                type="date"
            />
        </div>
    )
}

export default DaySelection;