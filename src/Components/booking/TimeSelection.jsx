import { useEffect, useState } from "react";
import axios from 'axios';
import serverConnection from "../../Settings/serverConnection";

const TimeSelection = ({onData, venue, booking}) => {

    const [timeBlocks, setTimeBlocks] = useState([]);
    const [minimalDuration, setMinimalDuration] = useState(1);

    useEffect(() => {
        setMinimalDuration(
            venue.bookingDurationType === 'fixed'
                ? venue.fixedBookingBlockDuration
                : venue.variableBookingMinimalDuration
        )
    }, [venue])

    useEffect(() => {
        const timeBlocks = [];
        for (let i = 0; i < 48; i++) {
            const timeBlock = {
                id: i,
                hours: Math.floor(i/2) < 10 ? '0'+Math.floor(i/2) : Math.floor(i/2),
                minutes: i%2 ? '30' : '00'
            }
            if(
                !venue.isOpenAllDay &&
                i < venue.openingTime ||
                i > venue.closingTime - 2 * (
                    venue.bookingDurationType === 'fixed'
                        ? Number(venue.fixedBookingBlockDuration)
                        : Number(venue.variableBookingMinimalDuration)
                )
            ){
                continue;
            } else {
                timeBlocks.push(timeBlock);
            }
        }
        setTimeBlocks(timeBlocks);
    },[venue])


    return(
        <div className="flex flex-wrap gap-2">
        { timeBlocks.map( block => (
            <button
                className="bg-sky-600 text-white py-2 px-3 rounded"
                type="button"
                key={block.id}
                value={block.id}
                disabled={ !booking.date}
                onClick={ e => {
                    const bookingTimeBlocks = [];
                    for (let i = Number(e.target.value); i < Number(e.target.value) + 2*minimalDuration; i++) {
                        bookingTimeBlocks.push(i)
                    }
                    onData(bookingTimeBlocks)
                } }
            >{`${block.hours}:${block.minutes}`}</button>
        ))}
    </div>
    )
}

export default TimeSelection;