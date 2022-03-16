import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

import './Ratings.css';

export default function Ratings(props: ratingsProps){

    const [maximumValueArr,setMaximumValueArr] = useState<number[]>([]);
    const [selectedValue,setSelectedValue] = useState(props.selectedValue);


    useEffect(() => {
        setMaximumValueArr(Array(props.maximumValue).fill(0));
    }, [props.maximumValue])

    function handleMouseOver(rate: number){
        setSelectedValue(rate);
    }
    
    function handleClick(rate: number){
        
        setSelectedValue(rate);
        props.onChange(rate);
    }

 

    return (
        <div>
            {maximumValueArr.map((_, index) => <FontAwesomeIcon
                onMouseOver={()=> handleMouseOver(index+1)}
                onClick={() => handleClick(index+1)}                
                icon="star" key={index} 
                className={`fa-lg pointer ${selectedValue >= index +1 ? 'checked': null}`}
            />)}
        </div>
    )
}

interface ratingsProps{
    maximumValue: number;
    selectedValue: number;
    onChange(rate: number): void;
}