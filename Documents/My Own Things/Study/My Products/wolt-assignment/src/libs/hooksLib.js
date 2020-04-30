import { useState } from 'react';

export const useFormFields = (initialState) => {
    const [fields, setFields] = useState(initialState);

    return [
        fields,
        function (event) {
            setFields({
                ...fields,
                [event.target.id]: event.target.value
            })
        }
    ]
}