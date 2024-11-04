import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from "../../Settings/serverConnection";
import Cookies from 'js-cookie'
import FormGroup from '../Forms/FormGroup';
import { useNavigate } from "react-router-dom";

const VenueSettings = () => {

    const { id } = useParams();
    const [userEmail] = useState(JSON.parse(Cookies.get('_auth_state')).email);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const navigate = useNavigate();

    const [timeBlocks, setTimeBlocks] = useState([]);

    const [venue, setVenue] = useState({
        initialPeriodPrice: 1,
        additionalPeriodPrice: 1,
        isOpenAllDay: false,
        openingTime: 18,
        closingTime: 34,
        openDays: [],
        gameModes: [],
        bookingDurationType: 'fixed',
        fixedBookingBlockDuration: 1,
        variableBookingMinimalDuration: 1,
    });

    useEffect(() => {
        axios.get(serverConnection.api+`/user/${userEmail}`)
            .then( response => {
                setUser(response.data[0]);
                setVenue((prevState) => ({
                    ...prevState,
                    owner: response.data[0]._id
                }))
            })
            .catch( err => console.error(err) )
    },[userEmail])

    useEffect(() => {
        if( id === 'new' ){ return; }
        axios.get(`${serverConnection.api}/venue/${id}`)
            .then( response => {
                const venueFromResponse = response.data[0];
                setVenue((prevState) => ({
                    ...prevState,
                    ...venueFromResponse
                }))
            })
            .catch( err => console.error(err))
    },[id])


    const submitVenueForm = (e) => {

        e.preventDefault();

        console.log('form submit')
        setIsSubmitDisabled(true);
        setIsLoading(true);

        axios({
            method: id === 'new' ? 'POST' : 'PUT',
            url: id === 'new' ? serverConnection.api+'/venue/' : serverConnection.api+`/venue/${venue.name}`,
            data: venue
        }).then(response => {

            const isSuccess = response.data.isSuccess;

            if( !isSuccess){
                console.log(response)
                console.log('not success');
                setIsSubmitDisabled(false);
            } else {
                console.log('Success. You will be redirected in 5 seconds')
                setTimeout(() => {
                    navigate('/dashboard/venues');
                }, 5000);
            }
            
        }).catch(err => {
            console.log( 'this was an error');
            console.error( err );
            setIsSubmitDisabled(false);
            setIsLoading(false);
        });

    }

    useEffect(() => {
        const timeBlocks = [];
        for (let i = 0; i < 48; i++) {
            const timeBlock = {
                id: i,
                hours: Math.floor(i/2) < 10 ? '0'+Math.floor(i/2) : Math.floor(i/2),
                minutes: i%2 ? '30' : '00'
            }
            timeBlocks.push(timeBlock);
        }
        setTimeBlocks(timeBlocks);
    },[])
    
    const generateName = (title) => {
        const name = title.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
        return name;
    }

    const handleData = (property,value) => {

        switch (value) {
            case 'true':
                setVenue((prevState) => ({
                    ...prevState,
                    [property]: true
                }))
            break;
            case 'false':
                setVenue((prevState) => ({
                    ...prevState,
                    [property]: false
                }))
            break;
        
            default:
                setVenue((prevState) => ({
                    ...prevState,
                    [property]: value
                }))
            break;
        }
        switch (property) {
            case 'title':
                setVenue((prevState) => ({
                    ...prevState,
                    name: generateName(value)
                }))
            break;
        }
        if(property === 'title'){
        }
    }

    const deleteVenue = () => {
        axios.delete(
            serverConnection.api+'/venue/',
            {
                data: {
                    name: venue.name
                }
            }
        )
            .then( response => {
                navigate('/dashboard/venues')
            })
            .catch( err => console.error(err))
    }

    return(
        <>
            {console.log(venue)}
            <Link to={'/dashboard/venues'}>Back to venues</Link>
            <h2 className='mb-4'>Venue Form</h2>
            <form
                onSubmit={ submitVenueForm }
            >
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                    <FormGroup
                        property='title'
                        title="Venue Title"
                        hint="Displayed venue name"
                        placeholder="New York City Golf"
                        value={venue && venue.title ? venue.title : ''}
                        onValueChange={handleData}
                        required={true}
                    />
                    <FormGroup
                        property='name'
                        title="Venue Name"
                        hint="Unique venue name used for URL and verification"
                        placeholder="new-york-city-golf"
                        value={venue.name ? venue.name : ''}
                        onValueChange={handleData}
                        required={true}
                    />
                   <FormGroup
                        property='gameModes'
                        title="Enabled Game types"
                        hint="Select game types available in this venue."
                        type="checkbox"
                        options={[
                            {value: 'driving-range', label: 'Driving Range', selected: false},
                            {value: 'course-play', label: 'Course Play', selected: false}
                        ]}
                        value={venue.gameModes ? venue.gameModes : ''}
                        onValueChange={handleData}
                    />
                    {/* <FormGroup
                        title="How to use Bays"
                        hint="Whether to use same bays for different game types."
                        type="radio"
                        options={[
                            {value: 'same', label: 'Use same Bays'},
                            {value: 'separate', label: 'Use separate bays'}
                        ]}
                    />
                    <FormGroup
                        title="Bays Count"
                        type="number"
                        hint="Total Bays Count"
                    />
                    <FormGroup
                        title="Driving Range Bays Count"
                        type="number"
                        hint="Driving Range Bays Count"
                    />
                    <FormGroup
                        title="Course Play Bays Count"
                        type="number"
                        hint="Course Play Bays Count"
                    /> */}
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                    <FormGroup
                        property="openDays"
                        title="Venue Open Days"
                        hint="Select which days the venue is open."
                        type="checkbox"
                        options={[
                            {value: 'monday', label: 'Monday'},
                            {value: 'tuesday', label: 'Tuesday'},
                            {value: 'wednesday', label: 'Wednesday'},
                            {value: 'thursday', label: 'Thursday'},
                            {value: 'friday', label: 'Friday'},
                            {value: 'saturday', label: 'Saturday'},
                            {value: 'sunday', label: 'Sunday'},
                        ]}
                        value={venue.openDays}
                        onValueChange={handleData}
                        required={true}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                    <FormGroup
                        property="isOpenAllDay"
                        title="Venue schedule"
                        hint="Check if venue is open 24/7"
                        type="radio"
                        options={[
                            {value: true, label: 'Venue is open 24/7'},
                            {value: false, label: 'Select Venue schedule'}
                        ]}
                        value={venue.isOpenAllDay}
                        onValueChange={handleData}
                        required={true}
                    />
                    { !venue.isOpenAllDay && <div className="grid grid-cols-2 gap-x-8">
                        <FormGroup
                            property="openingTime"
                            title="Opening time"
                            hint="Venue opening time."
                            element="select"
                            options={timeBlocks}
                            value={venue.openingTime}
                            onValueChange={handleData}
                            required={true}
                        />
                        <FormGroup
                            property="closingTime"
                            title="Closing time"
                            hint="Venue closing time."
                            element="select"
                            options={timeBlocks}
                            value={venue.closingTime}
                            onValueChange={handleData}
                            required={true}
                        />
                    </div> }
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                    <FormGroup
                        property='bookingDurationType'
                        title="Booking time Selection"
                        hint="How do you want your guests to book time?"
                        type="radio"
                        value={venue.bookingDurationType}
                        options={[
                            {value: 'fixed', label: 'Fixed-length time slots'},
                            {value: 'variable', label: 'Variable length time slot'}
                        ]}
                        onValueChange={handleData}
                    />
                    { venue.bookingDurationType === 'fixed' && <FormGroup
                        property='fixedBookingBlockDuration'
                        title="Fixed time block duration"
                        hint="Lengths of fix duration blocks in hours"
                        type="number"
                        value={ venue.fixedBookingBlockDuration }
                        onValueChange={handleData}
                    /> }
                    { venue.bookingDurationType === 'variable' && <FormGroup
                        property='variableBookingMinimalDuration'
                        title="Minimal booking time"
                        hint="Minimal duration of the booking"
                        type="number"
                        value={ venue.variableBookingMinimalDuration }
                        onValueChange={handleData}
                    /> }
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3">
                    <FormGroup
                        property='initialPeriodPrice'
                        title="Initial period price"
                        type="number"
                        hint="Minimal price of booking"
                        value={venue.initialPeriodPrice ? venue.initialPeriodPrice : 0}
                        onValueChange={handleData}
                        required={true}
                    />
                    <FormGroup
                        property='additionalPeriodPrice'
                        title="Additional period price"
                        type="number"
                        hint="Price for additional boooking period"
                        value={venue.additionalPeriodPrice ? venue.additionalPeriodPrice : 0}
                        onValueChange={handleData}
                        required={true}
                    />
                </div>
                <div className="flex justify-between">
                    <input
                        type="submit"
                        className='bg-sky-600 rounded py-2 px-4 text-white'
                        value={ id === 'new' ? 'Create Venue' : 'Update Venue' }
                        disabled={isSubmitDisabled}
                    />
                    {
                        id !== 'new' &&
                        <input
                            type="button"
                            className='bg-rose-600 rounded py-2 px-4 text-white'
                            value={ id !== 'new' && 'Delete Venue' }
                            onClick={deleteVenue}
                        />
                    }
                </div>
            </form>
        </>
    )
}

export default VenueSettings;