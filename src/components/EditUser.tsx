import * as React from 'react'
import {User} from "../App";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import * as moment from 'moment';
import {TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

interface Props{
    item: User;
}

export default function EditUser(props){
    let {item} = props;

    let cardStyles = {
        marginLeft: 10,
        maxHeight: 400,
        minWidth: 360
    }

    return(
        <Card style={cardStyles} elevation={20} >
            <CardContent>
                <Typography variant="overline" >Name:</Typography> <br/>
                <TextField /> <br/>
                <Typography variant="overline">Address:</Typography> <br/>
                <TextField /> <br/>
                <Typography variant="overline">Birthday</Typography> <br/>
                <TextField /> <br/>
                <Typography variant="overline">Email:</Typography> <br/>
                <TextField /> <br/>
                <Typography variant="overline">Phone:</Typography> <br/>
                <TextField />
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="small" startIcon={<EditIcon/>}>
                    Save
                </Button>
            </CardActions>
        </Card>

    )    
}