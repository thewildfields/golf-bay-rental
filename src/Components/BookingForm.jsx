import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from '../Settings/serverConnection';
import FormGroup from "./Forms/FormGroup";
import { useParams } from "react-router-dom";
import DaySelection from "./booking/DaySelection";
import TimeSelection from "./booking/TimeSelection";
import GameModeSelection from "./booking/GameModeSelection";
import StripePayment from "./Payments/StripePayment";


const BookingForm = () => {

    const [venue, setVenue] = useState({
        name: useParams().name,
    })

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [bookingStep, setBookingStep] = useState('initial');

    const [booking, setBooking] = useState({
        venueId: false,
        isPaid: false,
        firstName: 'Oleksii',
        lastName: 'Tsioma',
        phone: '9713350554',
        date: false,
        timeBlocks: false,
        gameMode: '',
        email: 'oleksiitsioma@gmail.com',
        guestCount: 1,
        bay: 'driving-range-1',
        price: 50
    })

    useEffect(() => {
        axios.get(serverConnection.api+'/venue/'+venue.name)
            .then( response => {
                const venueData = response.data[0]
                setVenue(venueData)
                setBooking((prevState) => ({
                    ...prevState,
                    venueId: venueData._id,
                    bookingPrice: venue.initialPeriodPrice
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
        e && e.preventDefault();
        booking.bay = `${booking.gameMode}-1`;
        setBooking(booking);
        setBookingStep('payment');
        console.log(booking);
        axios.post(serverConnection.api+'/booking/', booking)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }

    const setDate = (e) => {
        e.preventDefault();
        setBooking((prevState) => ({
            ...prevState,
            date: e.target.value
        }))
    }

    const submitMembershipBooking = () => {

        console.log('membership');

        handleData('isMembership', true);

        console.log(booking);

        axios.post(serverConnection.api+'/booking/', booking)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }



    return(
        <>
            <div className="grid grid-cols-2 gap-x-8">
                <form
                    onSubmit={submitBooking}
                >
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
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
                        <FormGroup
                            property='guestCount'
                            title="Guest Count"
                            hint="How many people will come"
                            placeholder="1"
                            value={booking.guestCount ? booking.guestCount : 1}
                            onValueChange={handleData}
                            required={true}
                        />
                    </div>
                    <GameModeSelection
                        venue={venue}
                        booking={booking}
                        onData={ val => setBooking((prevState) => ({
                            ...prevState,
                            gameMode: val,
                        }))}
                    />
                    <DaySelection
                        venue={venue}
                        booking={booking}
                        openDays={venue.openDays}
                        daysCount={3}
                        dependsOn="gameMode"
                        onData={ val => setBooking((prevState) => ({
                            ...prevState,
                            date: val
                        }))}
                    />
                    <TimeSelection
                        property='timeBlocks'
                        venue={venue}
                        booking={booking}
                        dependsOn="date"
                        onData={ val => setBooking((prevState) => ({
                            ...prevState,
                            timeBlocks: val
                        }))}
                    />
                    <div>
                        { Boolean(booking.timeBlocks.length) && <h2 className="text-2xl font-medium mb-4">{`Price: ${booking.price}`}</h2> }
                    </div>
                    { Boolean(booking.timeBlocks.length) &&  <div className="flex gap-4">
                        <input
                            type="submit"
                            className={`bg-sky-600 rounded py-2 px-4 text-white disabled:opacity-50`}
                            value={ 'Proceed to Payment' }
                        />
                        <button
                            className="underline font-medium hover:text-sky-500"
                            type="button"
                            onClick={e => submitMembershipBooking()}
                        >I have membership</button>
                    </div> }
                </form>
                { bookingStep === 'payment' && <StripePayment price={booking.price} />}
            </div>
        </>
    )
}

export default BookingForm;