import React from "react";

import "./Mycard.css"

const Mycard=(props)=>{
    console.log(props);
    return(
        <>
        <div className="card">
            <div className="card-body">
               <h3 className="heading">{props.heading}</h3>
                 <p>You are Invited</p>
            </div>
        </div> 
        </>
    )
};

export default Mycard;