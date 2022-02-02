import React from 'react'

function MyNavbar(props) {
    const {op,setOp} = props

    const click = (e) => {
        let str = e.target.innerText
        setOp(str)
    }

    return (
        <div className="MyNavbar">
            <div className = "title">Data Structure Visualizer</div>
            <div className = "options">
                <div><button onClick = {e => {click(e)}}>Array</button></div>
                <div><button onClick = {e => {click(e)}}>Stack</button></div>
                <div><button onClick = {e => {click(e)}}>Queue</button></div>
                <div><button onClick = {e => {click(e)}}>HashMap</button></div>
                <div><button onClick = {e => {click(e)}}>Tree</button></div>
                <div><button onClick = {e => {click(e)}}>Graph</button></div>
            </div>
        </div>
    )
}

export default MyNavbar
