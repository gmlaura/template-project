import * as React from 'react'
import {User} from "../App";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import * as moment from 'moment';


interface Props {
    item: User;
    handleEditClicked(): void;
}

export default function DetailedView(props: Props) {
    let {item, handleEditClicked} = props;

    let cardStyles = {
        marginLeft: 10,
        maxHeight: 400,
        minWidth: 360
    }

    return (
        <Card style={cardStyles} elevation={20} className="detailViewCard" >
            <CardContent>
                <Typography variant="overline" >Name:</Typography>
                <Typography variant="h4" id="userNameDetailed">{item.name}</Typography>
                <Typography variant="overline">Address:</Typography>
                <Typography variant="body1" id="userAddressDetailed">{item.address}</Typography>
                <Typography variant="overline" >Birthday</Typography>
                <Typography variant="body1" id="userBirthdayDetailed">{moment(item.birthday).format("LL")}</Typography>
                <Typography variant="overline">Email:</Typography>
                <Typography variant="body1" id="userEmailDetailed">{item.email}</Typography>
                <Typography variant="overline">Phone:</Typography>
                <Typography variant="body1" id="userPhoneDetailed">{item.phone}</Typography>
            </CardContent>
            <CardActions style={{display: "flex", justifyContent: "center"}}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleEditClicked}
                    startIcon={<EditIcon/>}
                >
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}