import * as React from 'react'
import {useEffect, useState} from "react";
import * as faker from "faker"
import Masterlist from "./components/Masterlist";
import DetailedView from "./components/DetailedView";
import "./App.css";

// let styles = require("./App.css");

export const App = () => {

    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState(null);

   useEffect(() => {
       new Promise((resolve, reject) => {
           setTimeout(()=> {
               let dataArray = [];

               for(let i=0; i<25; i++){
                   let item = {
                       name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                       address: faker.fake("{{address.streetAddress}}"),
                       birthday: faker.fake("{{date.past}}"),
                       email: faker.fake("{{internet.email}}"),
                       phone: faker.fake("{{phone.phoneNumber}}")
                   }
                   dataArray.push(item);
               }
               resolve(dataArray)
           }, 1000)
       })
           .then(data => {
                setInfo(data);
           })
           .catch(err => {
               console.log(err)
           })
   }, [])


    const handleItemSelect = (item) => {
       setSelected(item);
        console.log(item)
    }

  return (
    <div className="mainContainer">
        {
            info.length != 0 ? (
                <Masterlist info={info} onItemClick={handleItemSelect}/>
                ) : null
        }
        {
            selected ? (
                <DetailedView item={selected}/>
            ) : null
        }
    </div>
  )
}
