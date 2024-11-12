import { useEffect, useState } from "react";
import axios from 'axios';
import serverConnection from "../../Settings/serverConnection";

const TimeSelection = ({onData, venue, booking, dependsOn}) => {

    const [timeBlocks, setTimeBlocks] = useState([]);
    const [disabledTimeBlocks, setDisabledTimeBlocks] = useState([]);
    const [minimalDuration, setMinimalDuration] = useState(1);
    const [baysForMode, setBaysForMode] = useState(0);
    const [bookingsForDay, setBookingsForDay] = useState([]);
    const [bookingTimeBlocks, setBookingTimeBlocks] = useState([]);

    useEffect(() => {
        setMinimalDuration(
            venue.bookingDurationType === 'fixed'
                ? venue.fixedBookingBlockDuration
                : venue.variableBookingMinimalDuration
        )
    }, [venue]);

    useEffect(() => {
        if( booking.gameMode === 'course-play'){
            setBaysForMode(venue.coursePlayBayCount)
        } else if( booking.gameMode === 'driving-range'){
            setBaysForMode(venue.drivingRangeBayCount)
        }
        if( !booking.date ){ return; }
        axios.get(serverConnection.api+`/bookings/venue/${venue._id}/date/${booking.date}/game-mode/${booking.gameMode}`)
            .then(response => setBookingsForDay(response.data))
            .catch(error => console.error(error));
    },[venue, booking])

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

    useEffect(() => {
        setDisabledTimeBlocks([]);
        if( !bookingsForDay.length ){ return; }
        const disabledBlocks = [];
        timeBlocks.map( (block) => {
            const bookingsForBlock = bookingsForDay.filter( booking => booking.timeBlocks.includes(block.id));
            if( bookingsForBlock.length >= baysForMode ){
                disabledBlocks.push(block);
            }
        });
        setDisabledTimeBlocks(disabledBlocks);
    }, [booking, bookingsForDay]);

    const addOneHour = () => {
        const lastBlock = bookingTimeBlocks[bookingTimeBlocks.length-1];
        bookingTimeBlocks.push(lastBlock+1)
        bookingTimeBlocks.push(lastBlock+2)
        console.log(bookingTimeBlocks);
        setBookingTimeBlocks(bookingTimeBlocks);
        // console.log('add one hour');
    }


    return(
        <>
            {booking[dependsOn] && <div className="mb-4">
                <h2 className="font-medium text-2xl mb-1">Available Tee Times</h2>
                <h2 className="mb-3">{venue.bookingDurationType === 'fixed' ? `${venue.fixedBookingBlockDuration}-hour blocks` : `${venue.variableBookingMinimalDuration}-hour minimal booking`}</h2>
                <div className="flex flex-wrap gap-2">
                    { timeBlocks.map( block => (
                        <button
                            className={`bg-sky-600 text-white py-2 px-3 rounded disabled:bg-zinc-700 disabled:cursor-not-allowed ${bookingTimeBlocks.includes(block.id) && 'bg-green-500'}`}
                            type="button"
                            key={block.id}
                            value={block.id}
                            disabled={disabledTimeBlocks.includes(block)}
                            onClick={ e => {
                                const newBookingTimeBlocks = [];
                                for (let i = Number(e.target.value); i < Number(e.target.value) + 2*minimalDuration; i++) {
                                    newBookingTimeBlocks.push(i)
                                }
                                setBookingTimeBlocks(newBookingTimeBlocks);
                                console.log(bookingTimeBlocks);
                                onData(bookingTimeBlocks);
                            } }
                        >{`${block.hours}:${block.minutes}`}</button>
                    ))}
                </div>
                {/* <button
                    type="button"
                    onClick={ e=> addOneHour()}
                >
                    {`Add Another ${venue.fixedBookingBlockDuration}-hour block`}
                </button> */}
            </div>}
        </>
    )
}

export default TimeSelection;