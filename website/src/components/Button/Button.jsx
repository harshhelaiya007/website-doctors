import React from 'react'

function Button({btnText, ...otherBtnDetails}) {
    return (
        <div>
            <button {...otherBtnDetails}>{btnText}</button>
        </div>
    )
}

export default Button