import * as React from 'react'
import ListUser from "./ListUser";
import {User} from "../App";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

interface Props {
    info: User[];
    onItemClick(item: User): void;
    onAddUsers():void;
}

export default function Masterlist(props: Props) {
    let {info, onAddUsers} = props;

    let listStyles = {
        boxShadow: "10px 10px 21px 2px rgba(100,95,95,0.55)",
        maxHeight: "75vh",
        overflow: "auto",
        width: 300,
        borderRadius: 3
    }

    return (
        <List component="nav" style={listStyles} className="masterList">
            {info.map((elem, i) => {
                return <ListUser key={i} item={elem} onItemClick={props.onItemClick}/>
            })}
            {info.length != 0 ? (
                <ListItem button onClick={onAddUsers}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="More Users" />
                </ListItem>
            ) : (null)}
        </List>
    )
}