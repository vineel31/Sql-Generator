import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function useForceUpdate() {
    const [yalue, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export default function DynamicForm(Props) {
    const [entryStateArray, setEntryStateArray] = React.useState(Props.inputStateList)
    const forceUpdate = useForceUpdate();
    const setInInputListOnChange = (value, idx) => {
        let currState = entryStateArray
        currState[idx].value = value
        setEntryStateArray(currState)
        forceUpdate()
        Props.setInputStateList(currState)
    }

    return (
        <div>
            {Props.Form.map((formObject, i) => (
                
                /*<>*/<TextField
                    key={i}
                    autofocus
                    margin="dense"
                    disabled={Props.isViewOnlyMode}
                    value={entryStateArray[i].value}
                    onChange={(e) => { setInInputListOnChange(e.target.value, i); } }
                    id={formObject.id}
                    label={formObject.label}
                    type={formObject.type}
                    fullwidth />/*<FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl></>*/
                    
            ))}
        </div>
    )
}
