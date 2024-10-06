import { useParams } from 'react-router-dom';

const BasicTemplate = () => {
    const { id } = useParams();
    return(
        <>
        {console.log( id)}
            <h1>Basic Template</h1>
        </>
    )
}

export default BasicTemplate;