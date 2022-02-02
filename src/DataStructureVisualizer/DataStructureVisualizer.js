import React, {useState, useEffect} from 'react'
import MyNavbar from './MyNavbar'
import Grid from './Grid'

function DataStructureVisualizer() {

    const [option,setOption] = useState("")

    return (
        <div>
            <MyNavbar op ={option} setOp ={setOption}/>
            <Grid op ={option} setOp ={setOption}/>
        </div>
    )
}

export default DataStructureVisualizer


