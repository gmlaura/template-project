import * as React from 'react'
import {Switch, TextField, Typography} from "@material-ui/core";
import {useState} from "react";

interface Props{
    onFilter: (e) => void;
    onNameFilter: (e) => void
}

export default function FilterInput(props: Props){
    const {onFilter, onNameFilter} = props;

    const [nameFiltered, setNameFiltered] = useState<boolean>(false)

    return (
        <>
            <TextField
                style={{width: 300, margin: "0px 0px 10px"}}
                id="outlined-basic"
                label="Filter"
                variant="outlined"
                onChange={nameFiltered ? onNameFilter : onFilter}
            />
            <div>
                <Typography variant="body1">Filter only by name</Typography>
                <Switch
                    onChange={() => setNameFiltered(!nameFiltered)}
                    name="nameChecked"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
        </>
        )
}