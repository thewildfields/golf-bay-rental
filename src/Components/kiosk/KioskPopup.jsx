import axios from "axios";
import { useState } from "react";
import serverConnection from "../../Settings/serverConnection";

const KioskPopup = ({venue, onSuccessfullBooking}) => {

    const [bookingRequest, setBookingRequest] = useState({
        venue: venue,
        phone: ''
    })

    const [booking, setBooking] = useState(false)

    const findBooking = (e) => {
        e.preventDefault();
        if( !bookingRequest.phone || !bookingRequest.phone.length ){ return; }
        axios.get(serverConnection.api+`/kiosk/${bookingRequest.venue}/${bookingRequest.phone}`)
            .then(response => {
                console.log(response.data)
                setBooking(response.data);
                setTimeout(() => {
                    onSuccessfullBooking(true)
                }, 5000);
            })
            .catch(err => console.error(err))
    }
    
    return(
        <div
            className="fixed bg-gray-300 w-1/2 rounded-xl p-10 flex flex-col items-center gap-6"
        >
            <p className="text-center font-bold">
                Have You Reserved this bay?<br/>
                Enter Your Phone Number to Unlock.
            </p>
            <form
                className="w-2/3 flex flex-col items-center gap-3"
                onSubmit={ findBooking }
            >
                <input
                    type="tel"
                    className="rounded px-3 py-2 w-full text-center text-2xl"
                    placeholder="(123) 456-7890"
                    value={bookingRequest.phone}
                    onInput={ e => {
                        setBookingRequest(prevState => ({
                            ...prevState,
                            phone: e.target.value
                        }))
                    }}
                />
                <input type="submit" value="Search" />
            </form>
            {
                !booking && 
                <p className="text-center font-bold">
                    No reservation? No problem!<br/>
                    Scan this QR code to book next available bay.
                </p>
            }
            {
                booking &&
                <>
                <p className="text-center font-bold">{`Hello ${booking.customerName}`}</p>
                <p className="text-center font-bold">
                    We found your Booking.<br/>
                    Your game will start in 5 seconds
                </p>
                </>
            }
        </div>
    )
}

export default KioskPopup;