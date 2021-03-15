import * as React from 'react'
import ListItem from "./ListItem";
import "../App.css";

export default function Masterlist(props){
    let {info} = props;
    return (
        <div className="listContainer">
            {info.map((elem, i) => {
                return <ListItem item={elem} key={i} onItemClick={props.onItemClick}/>
            })}
        </div>
    )
}