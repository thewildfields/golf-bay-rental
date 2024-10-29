import { useEffect, useState } from "react";

const VenueModal = ({venue}) => {

    const [venueName, setVenueName] = useState(venue && venue.venueName || '');
    const [venueId, setVenueId] = useState(venue && venue.venueId || '');
    const [venueOpeningTime, setVenueOpeningTime] = useState(venue && venue.venueOpeningTime || '09:00');
    const [venueClosingTime, setVenueClosingTime] = useState(venue && venue.venueClosingTime || '18:00');
    const [bookingFrequency, setBookingFrequency] = useState(venue && venue.bookingFrequency || 30);
    const [minimalBookingTime, setMinimalBookingTime] = useState(venue && venue.minimalBookingTime || 1);
    const [bayCount, setBayCount] = useState(venue && venue.bayCount || 1);
    const [initialPeriodPrice, setInitialPeriodPrice] = useState(venue && venue.initialPeriodPrice || 50);
    const [additionalPeriodPrice, setAdditionalPeriodPrice] = useState(venue && venue.additionalPeriodPrice || 30);

    return(
        <>
        {console.log( venue ) }
        <div className="modal" tabIndex="-1" id="eventModal">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{ venueName }</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default VenueModal;