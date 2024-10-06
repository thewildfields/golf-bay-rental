import BookingForm from "./BookingForm";


const Venue = () => {
    const venueData = {
        title: 'Clackamas Golf',
        id: 'clackamas-golf',
        openingTime: 930,
        closingTime: 1800,
        bookingFrequency: 30,
        minimalBookingTime: 1
    }

    return(
        <>
            Hello {venueData.title}
            <BookingForm venue={venueData} />
        </>
    )

}

export default Venue;