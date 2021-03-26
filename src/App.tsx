import * as React from 'react'
import {useEffect, useState, createContext} from "react";
import * as faker from "faker"
import Masterlist from "./components/Masterlist";
import DetailedView from "./components/DetailedView";
import EditUser from "./components/EditUser";
import {v4 as uuidv4} from "uuid";
import CircularProgress from '@material-ui/core/CircularProgress';
import SettingMenu from "./components/SettingsMenu";
import NameContext from "./NameContext";
import FilterInput from "./components/FilterInput";

export interface User{
    name : string;
    address : string;
    birthday : string; // string or Date - date works fine with the data coming from faker but the date picker needs and outputs a different format!
    email : string;
    phone : string;
    id : string;
}

export const App = () => {

    const [info, setInfo] = useState<User[]>([]);
    const [filtered, setFiltered] = useState<User[]>([]);
    const [selected, setSelected] = useState<User>(null);
    const [editing, setEditing] =useState<boolean>(false);
    const [dataFetchComplete, setDataFetchComplete] = useState<boolean>(false);
    const [dataFetchFailed, setDataFetchFailed] = useState<boolean>(false);
    const [nameStyle, setNameStyle] = useState<string>("first-last")

   useEffect(() => {
       new Promise((resolve, reject) => {
           getUserData(resolve, reject)
       })
           .then((data : User[])=> {
               setInfo(data);
               setFiltered(data);
               setDataFetchComplete(true);
           })
           .catch(err => {
               console.log(err)
               setDataFetchComplete(true);
               setDataFetchFailed(true)
           })
   }, [])

    function getUserData(resolve, reject) {
        setTimeout(() => {
            let dataArray = [];

            for (let i = 0; i < 5; i++) {
                let item = {
                    name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    address: faker.fake("{{address.streetAddress}}"),
                    birthday: faker.fake("{{date.past}}"),
                    email: faker.fake("{{internet.email}}"),
                    phone: faker.fake("{{phone.phoneNumber}}"),
                    id: uuidv4()
                }
                dataArray.push(item);
            }
            resolve(dataArray)
            // reject()
        }, 1000)
    }

    const handleMoreUsers = () => {
        new Promise((resolve, reject) => {
            getUserData(resolve, reject);
        })
            .then((data : User[])=> {
                let newInfo = [...info, ...data]
                setInfo(newInfo);
                setFiltered(newInfo);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleItemSelect = (item:User) => {
       setSelected(item);
       if(editing) setEditing(false);
    }

    const handleEditClicked = () => {
       setEditing(true);
    }

    const handleEditSubmission = (e) => {
       e.preventDefault();

       let {name, address, birthday, email, phone} = e.target;

       let editedUser = {
           name: name.value.trim(),
           address: address.value,
           birthday: birthday.value,
           email: email.value,
           phone: phone.value,
           id: selected.id
       }

       let newInfo = info.map(x => {
           if(selected.id === x.id){
               return editedUser;
           }
           return x;
       })

        let newFiltered = filtered.map(x => {
            if(selected.id === x.id){
                return editedUser;
            }
            return x;
        })
        setSelected(editedUser);
        setInfo(newInfo);
        setFiltered(newFiltered);
        setEditing(false);
    }

    const handleCancelEdit = () => {
       setEditing(false);
    }

    const handleNameStyleChange = (e) => {
        setNameStyle(e.target.value);
    }

    function genericFilter<T>(object: T, properties: Array<keyof T>, query: string):boolean{
        if(query === "") return true

        const checks = properties.map(prop => {
            const value = object[prop];
            if(typeof value === "string" || typeof value === "number"){
                return value.toString().toLowerCase().includes(query);
            }
            return false;
        })

        return checks.includes(true);
    }

    function genericNameFilter<T>(object: T, property: keyof T, query: string):boolean{
        if(query === "") return true

        const value = object[property];
        if(typeof value === "string" || typeof value === "number"){
            return value.toString().toLowerCase().includes(query);
        }
        return false;
    }

    const handleFilter = (e) => {
        let query = e.target.value.toLowerCase();

        if (query === "") setFiltered(info);
        else {
            let properties : Array<keyof User> = ["name",
                "address",
                "birthday",
                "email",
                "phone",
                "id"];

            let filteredInfo = info.filter(user => {
                return genericFilter<User>(user, properties, query)
            })

            setFiltered(filteredInfo);
        }
    }

    const handleNameFilter = (e)=> {
        let query = e.target.value.toLowerCase();

        if (query === "") setFiltered(info);
        else{
            let filteredInfo = info.filter(user => {
                return genericNameFilter<User>(user, "name", query);
            })

            setFiltered(filteredInfo);
        }
    }


  return (
    <div id="mainContainer" style={{display: "flex", flexDirection:"column"}}>
        <NameContext.Provider value={nameStyle}>
        <SettingMenu handleStyleChange={handleNameStyleChange} />
        <FilterInput onFilter={handleFilter} onNameFilter={handleNameFilter}/>
        <div id="infoContainers" style={{display: "flex"}}>
            <div id="masterListContainer" >
            {
                info.length != 0 ? (
                    <Masterlist info={filtered} onItemClick={handleItemSelect} onAddUsers={handleMoreUsers}/>
                ) : (dataFetchComplete ? (
                    dataFetchFailed ?
                        (<div>Failed to load users</div>) : (<div>No contacts</div>)
                    ) : (<CircularProgress id="loadingIndicator" />))
            }
            </div>
            <div id="detailedViewContainer">
            {
                selected ? (
                    editing ? (
                        <EditUser item={selected} handleEditSubmission={handleEditSubmission} handleCancelEdit={handleCancelEdit} />
                        ) : (
                            <DetailedView item={selected} handleEditClicked={handleEditClicked}/>
                            )
                ) : null
            }
            </div>
        </div>
        </NameContext.Provider>
    </div>
  )
}

/***
 * four cases as to whether the app can display data:
 * 1. data fetch was completed correctly and the contacts can be displayed
 * 2. data fetch is still in progress > display progress
 * 3. data fetch was correctly completed but there are no contacts to display
 * 4. data fetch failed
 */

