import * as React from "react";
import {createContext} from "react";

const NameContext = createContext<string>("first-last");
export default NameContext;