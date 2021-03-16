import * as React from 'react'
import {User} from "../App";

interface Props{
    item : User;
    onItemClick(item: User): void
}

const ListItem : React.FC<Props> = (props) => {
    let {item, onItemClick} = props;

    return (
        <div onClick={() => {onItemClick(item)}} className="listItem">
            {item.name}
        </div>
    )
}

export default ListItem