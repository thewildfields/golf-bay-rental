import { useEffect, useId, useState } from "react";

const FormGroup = ({hideCondition, onValueChange, property, title, hint, type, options, min, max, element, placeholder, value, required}) => {

    const id = useId();

    const [updatedValue, setUpdatedValue] = useState(value);

    useEffect(()=>{
        setUpdatedValue(value)
    },[value])

    return(
        <>
            {
                !hideCondition &&
                <div>
                    <label
                        className='mb-1 text-lg font-medium cursor-pointer capitalize'
                        htmlFor={id}
                    >{title}</label>

                    {
                        element === 'select' &&
                        <select
                            className="block border border-current rounded w-full px-2 py-1 mb-1 cursor-pointer"
                            onChange={e => {
                                setUpdatedValue(e.target.value)
                                onValueChange( property, e.target.value);
                            }}
                            value={updatedValue}
                        >
                            { options.map( (block) => (
                                <option
                                    key={block.id}
                                    value={block.id}
                                    // selected={block.id == updatedValue}
                                >{`${block.hours}:${block.minutes}`}</option> 
                            )) }
                        </select>
                    }
                    {
                        element != 'select' && ( type === 'checkbox' || type === 'radio' ) && 
                        <div className="flex gap-4 mb-2">
                            { options.map( (option, index) => (
                                <div
                                    className="flex gap-2 items-center"
                                    key={index}
                                >
                                    <input
                                        type={type}
                                        className='block border border-current rounded px-2 py-1 cursor-pointer'
                                        name={id}
                                        id={`${id}-${index}`}
                                        value={option.value}
                                        checked={
                                            type === 'checkbox'
                                                ? updatedValue.includes(option.value)
                                                : updatedValue === option.value
                                        }
                                        onChange={e => {
                                            let newValue;
                                            switch (e.target.value) {
                                                case 'false':
                                                    newValue = false
                                                break;
                                                case 'true':
                                                    newValue = true
                                                break;                                    
                                                default:
                                                    newValue = e.target.value;
                                                break;
                                            }
                                            if( type === 'radio' ){
                                                setUpdatedValue(newValue)
                                                onValueChange( property, e.target.value);
                                            } else { 
                                                updatedValue.includes(newValue)
                                                    ? updatedValue.splice(updatedValue.indexOf(newValue), 1)
                                                    : updatedValue.push(newValue);
                                                setUpdatedValue(updatedValue)
                                                onValueChange( property, updatedValue);
                                            }
                                        }}
                                    />
                                    <label
                                        className='cursor-pointer'
                                        htmlFor={`${id}-${index}`}
                                    >{option.label}</label>
                                </div>
                            )) }
                        </div>
                        
                        
                    }
                    {
                        element != 'select' && (type === 'number') &&
                        <input
                            type="number"
                            className='block border border-current rounded w-full px-2 py-1 mb-1 cursor-pointer'
                            id={id}
                            min={min ? min : 1}
                            max={max ? max : 999}
                            value={updatedValue}
                            onChange={e => {
                                setUpdatedValue(Number(e.target.value))
                                onValueChange( property, e.target.value);
                            }}
                        />
                    }
                    {
                        element != 'select' && (!type || type === 'text' || type === "tel" || type === "email" ) &&
                        <input
                            type={type}
                            className='block border border-current rounded w-full px-2 py-1 mb-1 cursor-pointer'
                            id={id}
                            property-input={property}
                            placeholder={placeholder}
                            value={updatedValue}
                            onChange={e => {
                                setUpdatedValue(e.target.value)
                                onValueChange( property, e.target.value);
                            }}
                            required={required}
                        />
                    }
                    <p className="text-sm">{hint}</p>
                </div>
            }
        </>
    )                    
}

export default FormGroup;