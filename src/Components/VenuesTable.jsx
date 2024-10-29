import { useEffect, useState } from "react";
import VenueForm from "./VenueForm";
import { Link } from "react-router-dom";

const VenuesTable = (props) => {

    return(
        <>
            {/* <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Venue Name</th>
                        <th scope="col">Venue Id</th>
                        <th scope="col">Payment Account</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { props.venues.map( (venue, index) => (
                        <tr key={venue.venueId}>
                            <th scope="row">{ index+1 }</th>
                            <td>{ venue.venueName }</td>
                            <td>{ venue.venueId }</td>
                            <td>Payment Account</td>
                            <td>
                                <Link
                                    to={`${venue.venueId}`}
                                >Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <div className="venuesTable">
                <div className="accordion" id="accordionExample">
                    { props.venues.map( venue => (
                        <div className="accordion-item" key={venue._id}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${venue._id}`} aria-expanded="false" aria-controls="collapseOne">
                                    {venue.venueName}
                                </button>
                            </h2>
                            <div id={`collapse-${venue._id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <VenueForm venue={venue} user={props.user}/>
                                </div>
                            </div>
                      </div>
                    ))}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNew" aria-expanded="false" aria-controls="collapseNew">
                            Create New Venue
                        </button>
                        </h2>
                        <div id="collapseNew" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <VenueForm user={props.user} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default VenuesTable;