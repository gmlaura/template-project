import * as React from 'react'
import ListUser from "./ListUser";
import "../App.css";
import {makeStyles} from '@material-ui/core/styles';
import {User} from "../App";
import {List, ListItem} from "@material-ui/core";

interface Props {
    info: User[];
    onItemClick(item: User): void;
}

export default function Masterlist(props: Props) {
    let {info} = props;

    let listStyles = {
        boxShadow: "10px 10px 21px 2px rgba(100,95,95,0.55)",
        maxHeight: "95vh",
        overflow: "auto",
        width: 300
    }

    return (
        <List component="nav" style={listStyles}>
            {info.map((elem, i) => {
                return <ListUser key={i} item={elem} onItemClick={props.onItemClick}/>
            })}
        </List>


        // <div className="listContainer">
        //     {info.map((elem, i) => {
        //         return <ListUser key={i} item={elem} onItemClick={props.onItemClick}/>
        //     })}
        // </div>
    )
}