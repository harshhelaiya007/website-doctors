import React from 'react'

function Button({btnText, ...otherBtnDetails}) {
    return (
            <button {...otherBtnDetails}>{btnText}</button>
    )
}

export default Button