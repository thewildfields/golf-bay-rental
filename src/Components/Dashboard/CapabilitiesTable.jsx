import axios from "axios";
import { useEffect, useState } from "react";
import serverConnection from "../../Settings/serverConnection";

const CapabilitiesTable = () => {

    const [capabilities, setCapabilities] = useState([]);

    useEffect(() => {
        axios.get(serverConnection.api+'/capabilities')
            .then( response => {
                setCapabilities( response.data.capabilities );
            })
            .catch( err => console.error(err) )
    },[]);

    return(
        <>
            <h2>Capabilities</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Depends on</th>
                        <th>Enables</th>
                    </tr>
                </thead>
                <tbody>
                    { capabilities.map( cap => (
                        <tr key={cap._id}>
                            <td>{cap.capabilityName}</td>
                            <td>{cap.description}</td>
                            <td></td>
                            <td>{cap.Enables}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CapabilitiesTable;