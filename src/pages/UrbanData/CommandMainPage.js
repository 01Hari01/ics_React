import React, {useState} from "react";
import {Box, createTheme, ThemeProvider, Typography} from "@mui/material";
import {CommandInput} from "./CommandInput";
import {CommandResult} from "./CommandResult";
import axios from "axios";
import CustomAppBar from "../Styles/CustomAppbar";
export default function CommandMainPage(){
    const [result,setResult]=useState(null);
    const [error,setError]=useState(null);
    const theme=createTheme();
    const handleSubmit=async (command)=>{
        try{
            const res=await axios.get(`http://localhost:3000/${command}`)
            setResult(res.data)
            setError(null)
        }
        catch (err){
            setResult(null)
            setError(err.message)
            console.log("insider error",err)
        }
    }
    return(<>
        <ThemeProvider theme={theme}>
            <CustomAppBar/>
            <Box sx={{padding:3}}>
                <Typography variant="body" gutterBottom>
                    Sensor Node Dashboard
                </Typography>
            <CommandInput onSubmit={handleSubmit}/>
            {error ?(
                <Typography color="error" sx={{marginTop:2}}>
                    {error}
                </Typography>
            ):(
                <CommandResult result={result}/>
            )}
        </Box>
        </ThemeProvider>



    </>)
}