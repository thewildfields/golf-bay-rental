import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from '../Settings/serverConnection';

const VenueForm = (props) => {

    const venue = props.venue;

    const [venueName, setVenueName] = useState(venue && venue.venueName || '');
    const [venueId, setVenueId] = useState(venue && venue.venueId || '');
    const [venueOpeningTime, setVenueOpeningTime] = useState(venue && venue.venueOpeningTime || '09:00');
    const [venueClosingTime, setVenueClosingTime] = useState(venue && venue.venueClosingTime || '18:00');
    const [bookingFrequency, setBookingFrequency] = useState(venue && venue.bookingFrequency || 30);
    const [minimalBookingTime, setMinimalBookingTime] = useState(venue && venue.minimalBookingTime || 1);
    const [bayCount, setBayCount] = useState(venue && venue.bayCount || 1);
    const [initialPeriodPrice, setInitialPeriodPrice] = useState(venue && venue.initialPeriodPrice || 50);
    const [additionalPeriodPrice, setAdditionalPeriodPrice] = useState(venue && venue.additionalPeriodPrice || 30);
    const [owner, setOwner] = useState(props.user);

    useEffect(() => {
        setOwner(props.user._id)
    },[props])

    const generateId = () => {
        if( venueName.length && !venueId ){
            const generatedVenueId = venueName.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
            setVenueId( generatedVenueId );
        }
    }

    const gatherVenueData = () => {

        const venueData = {
            venueName: venueName,
            venueId: venueId,
            venueOpeningTime: venueOpeningTime,
            venueClosingTime: venueClosingTime,
            bookingFrequency: bookingFrequency,
            minimalBookingTime: minimalBookingTime,
            bayCount: bayCount,
            initialPeriodPrice: initialPeriodPrice,
            additionalPeriodPrice: additionalPeriodPrice,
            owner: owner
        }

        return venueData;

    }

    const createVenue = (e) => {

        e.preventDefault();

        const venueData = gatherVenueData();
        
        console.log('create venue');

        axios.post(serverConnection.api+'/venue', venueData)
            .then(response => window.location.reload())
            .catch(err => console.error(err));
    }

    const updateVenue = (e) => {

        e.preventDefault();

        const venueData = gatherVenueData();

        console.log('update venue')

        axios.put(serverConnection.api+`/venue/${venueData/venueId}`, venueData)
            .then(response => window.location.reload())
            .catch(err => console.error(err));
    }

    return(
        <>
            <h2>{venueName.length ? venueName : 'New Venue Form'}</h2>
            <form
                className="gbrForm"
                onSubmit={ createVenue }
            >
                <div className="gbrForm__group">
                    <label htmlFor="booking-name" className="form-label">Venue name</label>
                    <input
                        type="text"
                        className="gbrForm__input form-control mb-2"
                        id="booking-name"
                        value={venueName}
                        onChange={ e => setVenueName(e.target.value)}
                        onBlur={ generateId }
                        required
                    />
                </div>
                <div className="gbrForm__group">
                    <label htmlFor="booking-name" className="form-label">Venue ID</label>
                    <input
                        type="text"
                        className="gbrForm__input form-control mb-2"
                        id="booking-name"
                        value={venueId}
                        onChange={ e => setVenueId(e.target.value)}
                        required
                    />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="gbrForm__group">
                            <label htmlFor="booking-name" className="form-label">Opening Time</label>
                            <input
                                type="time"
                                className="gbrForm__input form-control mb-2"
                                id="booking-name"
                                value={venueOpeningTime}
                                onChange={ e => setVenueOpeningTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="gbrForm__group">
                            <label htmlFor="booking-name" className="form-label">Closing Time</label>
                            <input
                                type="time"
                                className="gbrForm__input form-control mb-2"
                                id="booking-name"
                                value={venueClosingTime}
                                onChange={ e => setVenueClosingTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="gbrForm__group">
                    <label htmlFor="booking-name" className="form-label">Booking Frequency</label>
                    <select
                        className="form-select mb-2"
                        value={ bookingFrequency }
                        onChange={e => setBookingFrequency(e.target.value)}
                    >
                        <option value="15">Every 15 minutes</option>
                        <option value="30">Every 30 minutes</option>
                        <option value="60">Every Hour</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="gbrForm__group">
                            <label htmlFor="booking-name" className="form-label">Minimal Booking Time</label>
                            <input
                                type="number"
                                className="gbrForm__input form-control mb-2"
                                id="booking-name"
                                value={minimalBookingTime}
                                onChange={ e => setMinimalBookingTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="gbrForm__group">
                            <label htmlFor="booking-name" className="form-label">Bay Count</label>
                            <input
                                type="number"
                                className="gbrForm__input form-control mb-2"
                                id="booking-name"
                                value={bayCount}
                                onChange={ e => setBayCount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="gbrForm__group">
                            <label htmlFor="booking-name" className="form-label">Initial Price</label>
                            <input
                                type="number"
                                className="gbrForm__input form-control mb-2"
                                id="booking-name"
                                value={initialPeriodPrice}
                                onChange={ e => setInitialPeriodPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="gbrForm__group">
                            <label htmlFor="booking-name" className="form-label">Additional Hour Price</label>
                            <input
                                type="number"
                                className="gbrForm__input form-control mb-2"
                                id="booking-name"
                                value={additionalPeriodPrice}
                                onChange={ e => setAdditionalPeriodPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <input type="submit" value={ props.venue ? 'Update Venue' : 'Create Venue'} className="btn btn-primary" />
            </form>
        </>
    )
}

export default VenueForm;