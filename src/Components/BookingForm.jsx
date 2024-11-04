import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from '../Settings/serverConnection';
import FormGroup from "./Forms/FormGroup";
import { useParams } from "react-router-dom";
import DaySelection from "./booking/DaySelection";
import TimeSelection from "./booking/TimeSelection";

const BookingForm = () => {

    const [venue, setVenue] = useState({
        name: useParams().name,
    })

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const [booking, setBooking] = useState({
        venueId: false,
        isPaid: false,
        firstName: 'Oleksii',
        lastName: 'Tsioma',
        phone: '+19713350554',
        date: false,
        timeBlocks: false,
        email: 'oleksiitsioma@gmail.com'
    })

    useEffect(() => {
        axios.get(serverConnection.api+'/venue/'+venue.name)
            .then( response => {
                const venueData = response.data[0]
                setVenue(venueData)
                setBooking((prevState) => ({
                    ...prevState,
                    venueId: venueData._id
                }))
            })
            .catch( err => console.error(err))
    }, [] )

    const handleData = (property,value) => {

        let updatedValue;

        switch (value) {
            case 'true':
                updatedValue = true
            break;
            case 'false':
                updatedValue = false
            break;        
            default:
                updatedValue = value
            break;
        }

        setBooking((prevState) => ({
            ...prevState,
            [property]: updatedValue
        }))


    }

    useEffect(() => {
        if( booking.date && booking.timeBlocks && booking.timeBlocks.length > 0 ){
            setIsSubmitDisabled(false)
        }
    },[booking])

    const submitBooking = (e) => {
        e.preventDefault();

        setIsSubmitDisabled(true)

        console.log(booking);

        axios.post(serverConnection.api+'/booking/', booking)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }

    const gameModeOptions = [
        {value: 'driving-range', label: 'Driving Range', selected: false},
        {value: 'course-play', label: 'Course Play', selected: false}
    ]

    const setDate = (e) => {
        e.preventDefault();
        setBooking((prevState) => ({
            ...prevState,
            date: e.target.value
        }))
    }



    return(
        <>
            {venue && venue.title && <h1>{`Your booking at ${venue.title}`}</h1>}
            <div className="container mx-auto grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                <form
                    onSubmit={submitBooking}
                >   
                    <h2>Available times</h2>
                    <DaySelection
                        openDays={venue.openDays}
                        daysCount={2}
                        onData={ val => setBooking((prevState) => ({
                            ...prevState,
                            date: val
                        }))}
                    />
                    <TimeSelection
                        venue={venue}
                        booking={booking}
                        onData={ val => setBooking((prevState) => ({
                            ...prevState,
                            timeBlocks: val
                        }))}
                    />
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                        <FormGroup
                            property="firstName"
                            title="First Name"
                            placeholder="John"
                            value={booking.firstName ? booking.firstName : ''}
                            onValueChange={handleData}
                            required={true}
                        />
                        <FormGroup
                            property="lastName"
                            title="Last Name"
                            placeholder="Doe"
                            value={booking.lastName ? booking.lastName : ''}
                            onValueChange={handleData}
                            required={true}
                        />
                        <FormGroup
                            property='phone'
                            title="Phone Number"
                            type="tel"
                            placeholder="+1 (123) 456-7890"
                            value={booking.phone ? booking.phone : ''}
                            onValueChange={handleData}
                            required={true}
                        />
                        <FormGroup
                            property='email'
                            title="Email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={booking.email ? booking.email : ''}
                            onValueChange={handleData}
                            required={true}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                    </div>

                    <div>
                        <input
                            type="submit"
                            className={`bg-sky-600 rounded py-2 px-4 text-white ${isSubmitDisabled && 'disabled'}`}
                            disabled={isSubmitDisabled}
                            value={ 'Proceed to Payment' }
                        />
                    </div>
                </form>
            </div>
            {/* <div className="container">
                {/* <div className="row">
                    <div className="nav nav-pills">
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                value={'course-play'}
                                onClick={handleBookingTypeSwitch}
                            >Course Play Bays</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                value={'driving-range'}
                                onClick={handleBookingTypeSwitch}
                            >Driving Range Bays</button>
                        </li>
                    </div>
                </div>
                <div className="row">
                    <div className="col">                        
                        <form
                        className="gbrForm"
                        onSubmit={handleSubmit}
                        >
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-name" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="gbrForm__input form-control"
                                            id="booking-name"
                                            value={firstName}
                                            onChange={ e => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-name" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="gbrForm__input form-control"
                                            id="booking-name"
                                            value={lastName}
                                            onChange={ e => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-phone" className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="gbrForm__input form-control"
                                            id="booking-phone"
                                            value={customerPhone}
                                            onChange={e => setCustomerPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-people" className="form-label">Number of People</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="gbrForm__input form-control"
                                            id="booking-people"
                                            value={guestsCount}
                                            onChange={e => setGuestsCount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>                            
                            <div className="gbrForm__group">
                                <label htmlFor="booking-date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="gbrForm__input form-control"
                                    id="booking-date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="gbrForm__group">
                                <label htmlFor="booking-time" className="form-label">Time</label>
                                <div>
                                { timeBlocks.map( (block, index) => (
                                    <button
                                        className={'px-2 py-1 bg-gray-400 rounded mb-2 mr-2 timeSlot'}
                                        disabled={ bookedSlots[block.id] == venue.bayCount }
                                        key={block.id}
                                        timeslot-value={block.id}
                                        type="button"
                                        onClick={ e => {
                                            setTime(block.id);
                                            selectBookingSlotsByTime(e)
                                        }}
                                    >{ `${block.hours}:${block.minutes}`}</button>
                                ) )}
                                </div>
                            </div>
                            <div className="gbrForm__group mb-3">
                                <label htmlFor="booking-duration" className="form-label">Booking Duration, hours</label>
                                <input
                                    type="number"
                                    min={ 1 }
                                    className="gbrForm__input form-control"
                                    id="booking-duration"
                                    value={bookingDuration}
                                    onChange={ e => {
                                        selectBookingSlotsByDuration(e);
                                    }}
                                    required
                                />
                            </div>
                            <h2>{`Price: ${bookingPrice}`}</h2>
                            <div className="gbrForm__group">
                                <input type="submit" className="gbrForm__input form-control gbrForm__input_submit" value="Continue" />
                            </div>
                        </form>
                        <p>{ `Bay Count: ${venue.bayCount}`}</p>
                        
                    </div>
                    <div className="col">
                        { bookingStep === 'payment' && <StripePayment price={bookingPrice} bookingId={newBookingId} />}
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default BookingForm;