import React from 'react'

function Card(props) {
    console.log(props.image)


    return (
        <img src={props.image}></img>
    )




}

export default Card;
