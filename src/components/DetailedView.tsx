import * as React from 'react'

export default function DetailedView(props){
    let {item} = props;

    return(
        <div className="detailContainer">
            <div className="detailItem"><b>Name:</b> {item.name}</div>
            <div className="detailItem"><b>Address:</b> {item.address}</div>
            <div className="detailItem"><b>Birthday:</b> {item.birthday}</div>
            <div className="detailItem"><b>Email:</b> {item.email}</div>
            <div className="detailItem"><b>Phone:</b> {item.phone}</div>
        </div>
    )
}