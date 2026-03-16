import React, { useState } from "react";

const TourCard=()=>{

    const[tour,settours]=useState([
        {
            sno:"T001",
            name:"kashmir",
            imageUrl:"https://cdn.britannica.com/82/102682-050-9177C49B/Streams-settlements-mountains-Jammu-and-Kashmir-India.jpg"
        },
        {
             sno:"T002",
            name:"Tamil Nadu",
            imageUrl:"https://www.authenticindiatours.com/app/uploads/2022/05/10-Reasons-to-visit-Tamil-Nadu-1400x550-c-default.jpg"
        }
    ])
    return (
        <div className="conatiener mt-3">
            <div className="row">
                <div className="col-sm-3">
                    <div className="card shadow-lg">
                        <img src={tour[0].imageUrl} alt="" height={200}/>
                        <div className="card-body">
                            <p className="h3">{tour[0].name}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aspernatur nemo minus laborum, odio commodi unde nobis aperiam ad corporis neque animi voluptates accusamus ipsam, non eos accusantium fuga sapiente.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card shadow-lg">
                        <img src={tour[1].imageUrl} alt="" height={200}/>
                        <div className="card-body">
                            <p className="h3">{tour[1].name}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aspernatur nemo minus laborum, odio commodi unde nobis aperiam ad corporis neque animi voluptates accusamus ipsam, non eos accusantium fuga sapiente.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );


}
export default TourCard