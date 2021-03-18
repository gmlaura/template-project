import * as React from 'react'
import {User} from "../App";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import {useContext} from "react";
import NameContext from "../NameContext";

interface Props{
    item : User;
    onItemClick(item: User): void;
}


// list item is of type React Functional Component
// this helps with React built-in component attributes like key and ref not breaking typing
const ListUser : React.FC<Props> = (props) => {
    let {item, onItemClick} = props;

    const nameStyle = useContext(NameContext);

    let nameSwapped = item.name.split(" ").reverse().join(", ")

    return (
        <ListItem button onClick={() => {onItemClick(item)}} className="userContact">
            <ListItemIcon>
                <AccountCircleRoundedIcon />
            </ListItemIcon>
            {item.name? (
                nameStyle == "first-last" ? (<ListItemText primary={item.name} />) : (
                    <ListItemText primary={nameSwapped} />
                )

            ) : (
                <ListItemText primary="Unknown" style={{color: "lightgrey"}}/>
            )}
        </ListItem>
    )
}

export default ListUser