import React, { useState } from 'react';
export default function Layout() {
    return (
        <div onClick={(event) => { (event.target.className == 'links' || event.target.className == "MuiInputBase-input makeStyles-inputInput-114" || event.target.className == "suggestion-list") ? setSugg(true) : setSugg(false) }}>

        </div>
    );
}
