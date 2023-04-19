import React, {useState} from 'react';
import {Button} from "@mui/material";
import { StyledTextField} from "../suppliers/TableStyles";

export  const CommandInput=({onSubmit})=>{
    const [command,setCommand]=useState('')
    return(<>

    <form onSubmit={onSubmit(command)}>
        <StyledTextField
            label="Command"
            variant="outlined"
            value={command}
            onChange={(e)=>{setCommand(e.target.value)}}
            />
        <Button type="submit" variant="contained">
            Submit
        </Button>
    </form>
    </>)
}
