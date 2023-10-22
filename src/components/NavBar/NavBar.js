import React, { useState } from 'react'
import './NavBar.css'
import { useMyContext } from '../../Context/MyContext'

const NavBar = (props) => {

    const { updateMyState, wordSearch, word } = useMyContext();

    return (
        <div className={`nav-bar ${props.color}`}>
            <div className="nav-wrap">
                <div className={`nav-container ${props.color}`}>
                    <div className={`nav-img ${props.color}`}>
                        <h2 className={`logo ${props.color}`}>e-Dictionary</h2>
                    </div>
                    <div className={`nav-search ${props.color}`}>
                        <input type="text" placeholder='Search' id='word' name='word' autoComplete='off' onChange={updateMyState} value={word} autoFocus required />
                        <i className="fa-solid fa-magnifying-glass fa-xl" onClick={() => {
                            if (word) {
                                wordSearch();
                            }
                        }}></i>
                    </div>
                    <div className={`nav-toggle ${props.color}`}>
                        <label className={`switch ${props.color}`}>
                            <input type="checkbox" onClick={props.mode} />
                            <span className={`slider ${props.color}`}></span>
                        </label>
                    </div>
                </div>
                <div className={`nav-search ${props.color} hidden`}>
                    <input type="text" placeholder='Search' id='word' name='word' autoComplete='off' onChange={updateMyState} value={word} autoFocus required />
                    <i className="fa-solid fa-magnifying-glass fa-xl" onClick={wordSearch}></i>
                </div>
            </div>
        </div>
    )
}

export default NavBar;