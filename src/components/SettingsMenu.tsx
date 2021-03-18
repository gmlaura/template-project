import * as React from 'react'
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {useContext} from "react";
import NameContext from "../NameContext";

interface Props {
    handleStyleChange(e: any): void
}

const SettingMenu : React.FC<Props> = (props) => {

    let {handleStyleChange} = props;
    const nameStyle = useContext(NameContext);

    return (
        <div id="settingMenu" style={{margin: 10}}>
            <Typography variant="overline" >Select name style:</Typography> <br/>
            <RadioGroup onChange={handleStyleChange} value={nameStyle}>
                <FormControlLabel value="first-last" control={<Radio color="primary"/>} label="First Last" />
                <FormControlLabel value="last-first" control={<Radio color="primary"/>} label="Last, First" />
            </RadioGroup>
        </div>
    )
}

export default SettingMenu;