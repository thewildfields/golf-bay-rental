import axios from "axios";
import { useEffect, useState } from "react";
import serverConnection from "../../Settings/serverConnection";

const RolesTable = () => {

    const [roles, setRoles] = useState([]);
    const [capabilities, setCapabilities] = useState([]);
    const [activeRole, setActiveRole] = useState(false);

    useEffect(() => {

        axios.get(serverConnection.api+'/roles')
            .then(response => { setRoles( response.data.roles );})
            .catch(err => console.error(err));

        axios.get(serverConnection.api+'/capabilities')
            .then(response => {setCapabilities(response.data.capabilities)})
            .catch(err => console.error(err))

    },[]);

    const activateEditingRow = (e) => {

        const activeRowClass = 'editableRow_open';
        const row = e.target.closest('.editableRow');

        if(!row.classList.contains(activeRowClass)){

            row.classList.add(activeRowClass);
            for (let i = 0; i < row.parentNode.childNodes.length; i++) {
                if( row !== row.parentNode.childNodes[i] ){
                    row.parentNode.childNodes[i].classList.remove(activeRowClass)
                }
            }
        }
    }

    const updateRoleData = (e) => {
        console.log(e.target.getAttribute('role-attribute'))
        e.target.checked = !e.target.checked;
        console.log(e.target.checked)
    }

    // const moveTagItem = (e) => {
    //     const tag = e.target.closest('.tagGroup__item');
    //     const tagGroup = tag.closest('.tagGroup');
    //     const settingsGroup = tag.closest('.settingsContainer');

    //     const currentGroup = tagGroup.getAttribute('tag-group');
    //     let targetGroup, targetGroupContainer;
    //     if(currentGroup === 'added'){
    //         targetGroup = 'available'
    //     } else if(currentGroup === 'available'){
    //         targetGroup = 'added'
    //     }

    //     const newTag = tag.cloneNode(true);
    //     tag.remove();
    //     targetGroupContainer = settingsGroup.querySelector(`.tagGroup[tag-group="${targetGroup}"]`);

    //     targetGroupContainer.appendChild(newTag);

    // }

    return(
        <>
            <h2>Roles</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Can Register</th>
                        <th>Capabilities</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    { roles.map( role => (
                        <tr
                            key={role._id}
                            className="editableRow"
                        >
                            <td className="col-2">{role.roleName}</td>
                            <td className="col-2">
                                <input
                                    role-attribute="canRegister"
                                    type="checkbox"
                                />
                            </td>
                            <td className="col-6">
                                <div className="settingsContainer">
                                    <p><strong>Added Capabilities</strong></p>
                                    <div className="tagGroup" tag-group="added">
                                        {role.capabilities.map( cap => (
                                            <button
                                                className="tagGroup__item"
                                                key={cap}
                                            >
                                                {cap}
                                                <i className="bi bi-x"></i>
                                            </button>
                                        ))}
                                    </div>
                                    <p><strong>Other Available Capabilities</strong></p>
                                    <div className="tagGroup" tag-group="available">
                                        { capabilities.map( cap => (
                                            <span
                                                className="tagGroup__item"
                                                key={cap._id}
                                            >
                                                {cap.capabilityName}
                                                <i className="bi bi-plus"></i>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </td>
                            <td className="col-2">
                                <button
                                    className="btn btn-link"
                                    onClick={e=>activateEditingRow(e)}
                                >Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default RolesTable;