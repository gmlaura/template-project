import * as React from 'react'

export default function ListItem(props){
    let {item} = props;

    return (
        <div onClick={() => {props.onItemClick(item)}} className="listItem">
            {item.name}
        </div>
    )
}