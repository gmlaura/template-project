import * as React from 'react'
import {User} from "../App";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import * as moment from 'moment';
import {TextField} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

interface Props{
    item: User;
    handleEditSubmission(e:any):void; // what should the type of e be?
    handleCancelEdit():void;
}

export default function EditUser(props: Props){
    let {item, handleEditSubmission, handleCancelEdit} = props;

    let cardStyles = {
        marginLeft: 10,
        maxHeight: 450,
        minWidth: 360,
    }

    return(
        <Card style={cardStyles} elevation={20} >
            <form onSubmit={handleEditSubmission}>
            <CardContent>
                <Typography variant="overline" >Name:</Typography> <br/>
                <TextField name="name" defaultValue={item.name} style={{width: "90%"}}/> <br/>
                <Typography variant="overline">Address:</Typography> <br/>
                <TextField name="address" defaultValue={item.address} style={{width: "90%"}}/> <br/>
                <Typography variant="overline" >Birthday</Typography> <br/>
                <TextField
                    name="birthday"
                    type="date"
                    defaultValue={moment(item.birthday).format("YYYY-MM-DD")}
                    style={{width: "90%"}}/> <br/>
                <Typography variant="overline">Email:</Typography> <br/>
                <TextField name="email" defaultValue={item.email} style={{width: "90%"}}/> <br/>
                <Typography variant="overline">Phone:</Typography> <br/>
                <TextField name="phone" defaultValue={item.phone} style={{width: "90%"}}/>
            </CardContent>
                <CardActions style={{display: "flex", justifyContent: "center"}}>
                <Button type="submit" variant="contained" color="primary" size="small" startIcon={<SaveIcon/>}>
                    Save
                </Button>
            </CardActions>
            </form>
            <CardActions style={{display: "flex", justifyContent: "center"}}>
                <Button variant="contained" size="small" startIcon={<DeleteIcon />} onClick={handleCancelEdit}>
                    Cancel
                </Button>
            </CardActions>
        </Card>

    )    
}