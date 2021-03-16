import * as React from 'react'
import {User} from "../App";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

interface Props{
    item : User;
    onItemClick(item: User): void;
}


// list item is of type React Functional Component
// this helps with React built-in component attributes like key and ref not breaking typing
const ListUser : React.FC<Props> = (props) => {
    let {item, onItemClick} = props;

    return (
        <ListItem button onClick={() => {onItemClick(item)}}>
            <ListItemIcon>
                <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
        </ListItem>
        // <MenuItem className={classes.root} onClick={() => {onItemClick(item)}}>
        //     {item.name}
        // </MenuItem>
    )
}

export default ListUser