import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../actions/user.jsx"
import { useEffect } from "react";



export default function Admin() {
    const dispatch = useDispatch()
   
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    const allUsers = useSelector(state => state.users.allUsers)

    { console.log(allUsers) }

    return (
        <div>
            <h2>How to Create Tabs in ReactJS?</h2>
            <Paper square>
                <Tabs
                    value={value}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <Tab label="Usuarios">
                        
                    </Tab>
                    <Tab label="Productos " />
                    <Tab label="Ordenes " />
                </Tabs>
                <h3>TAB NO: {value} clicked!</h3>
                
            </Paper>
        </div>
    );
};

