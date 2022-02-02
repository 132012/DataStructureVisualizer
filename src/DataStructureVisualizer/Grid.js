import React, {useState, useEffect} from 'react'
import Tile from './Tile'
import ArrayOp from './StrucFuncs/ArrayOp'
import StackOp from './StrucFuncs/StackOp'
import QueueOp from './StrucFuncs/QueueOp'
import HashMapOp from './StrucFuncs/HashMapOp'
import TreeOp from './StrucFuncs/TreeOp'
import GraphOp from './StrucFuncs/GraphOp'
import Xarrow from "react-xarrows";


function Grid(props) {
    const [grid,setGrid] = useState([])
    const [curStruc,setCurStruc] = useState([]) //all current structures in the grid
    const [chosen,setChosen] = useState({}) //id/type of Structure clicked
    const [counter,setCounter] = useState(1) //generate new  structure id
    const [lines,setLines] = useState([])
    const [strClick,setStrClick] = useState("") //ty
    
    const {op,setOp} = props 
    const type = {
        ARRAY: "Array",
        STACK: "Stack",
        QUEUE: "Queue",
        MAP: "HashMap",
        TREE:"Tree",
        GRAPH:"Graph"
    }

    useEffect(() => {
        const newGrid = initializeGrid()
        setGrid(newGrid)
    },[])
    
    useEffect(() => {
        let theLines=[]
         //svg building edges for all trees
        let trees = curStruc.filter(e => e.type==="tree") //all tree structures
        trees.map(e =>{
            let coor = e.tile,r,c,rr,cc,rr1,cc1,j,k
            for(let i =0;i<coor.length;i++){
                if(typeof(coor[i])==="undefined")
                     continue
                [r,c] = coor[i]
                j = 2*i +1
                let parentKey = r+","+c          //parent

                if(!(typeof(coor[j]) === "undefined")){
                    [rr,cc] = coor[j]
                    let leftChild =  rr+","+cc    //child
                    theLines.push([parentKey,leftChild])
                }
                k = 2*i +2

                if(!(typeof(coor[k]) === "undefined")){
                    [rr1,cc1] = coor[k]
                    let rightChild =  rr1+","+cc1    //child
                    theLines.push([parentKey,rightChild])
                    

                }
            }            

        })

        //graph edges
        let graphs = curStruc.filter(e => e.type==="graph") //all graph structures
        graphs.map(e =>{
            let edge = e.edges 
            
            edge.forEach((from) => {
                from.forEach((to) => {
                    theLines.push([to[0],to[1],to[2],to[3]])
                })
            });

        })
        setLines(theLines)
    },[curStruc])

    

    let option 

    if(chosen.type==="Array"){
        option = <ArrayOp 
            gr = {grid}
            setGr = {setGrid}
            ch = {chosen}
            st = {curStruc}
            type ={type}
            setSt = {setCurStruc}
            count = {counter} />
    }
    else if(chosen.type==="Stack"){
        option = <StackOp 
            gr = {grid}
            setGr = {setGrid}
            ch = {chosen}
            st = {curStruc}
            type ={type}
            setSt = {setCurStruc}
            count = {counter} />
    }
    else if(chosen.type==="Queue"){
        option = <QueueOp 
            gr = {grid}
            setGr = {setGrid}
            ch = {chosen}
            st = {curStruc}
            type ={type}
            setSt = {setCurStruc}
            count = {counter} />
    }
    else if(chosen.type==="HashMap"){
        option = <HashMapOp 
            gr = {grid}
            setGr = {setGrid}
            ch = {chosen}
            st = {curStruc}
            type ={type}
            setSt = {setCurStruc}
            count = {counter} />
    }
    else if(chosen.type==="Tree"){
        option = <TreeOp 
            gr = {grid}
            setGr = {setGrid}
            ch = {chosen}
            st = {curStruc}
            type ={type}
            setSt = {setCurStruc}
            count = {counter} />
    }
    else if(chosen.type==="Graph"){
        option = <GraphOp 
            gr = {grid}
            setGr = {setGrid}
            ch = {chosen}
            st = {curStruc}
            setOp = {setOp}
            type ={type}
            setSt = {setCurStruc}
            count = {counter}
            op={op}
            setCh = {setChosen} />
    }

    
    return (
        <div className ="myGrid">
            {lines.map((e,i)=> 
                <Xarrow
                key ={i}
                
                headSize = {4}
                path={'straight'}
                start={e[0]} 
                end={e[1]} 
                showHead = {e[3]}
                labels= {<div style={{ fontSize: "2.5vw"}}>{e[2]}</div> }
                a/>
            )} 
            
            {grid.map((row,rId) =>(
                 <div className = "myRow" key={rId}>

                     {row.map((tile,tId) =>(
                        <Tile
                         key ={rId+","+tId} 
                         col = {tile.col}
                         row = {tile.row}
                         sType = {tile.strType}
                         sId = {tile.strId}
                         st = {curStruc}
                         setSt = {setCurStruc}
                         ch = {chosen}
                         setCh = {setChosen}
                         gr = {grid}
                         setGr = {setGrid}
                         isP ={tile.isPicked}
                         op = {op}
                         setOp ={setOp}
                         type ={type}
                         count = {counter}
                         setCount = {setCounter}
                         txt = {tile.txt}
                         aKey ={rId+","+tId}
                          
                         />
                        
                     ))}
                 </div>
            ))}
           
            {option}
            </div>
            
            
        
    )
}

export default Grid

const initializeGrid = () => {
    const grid = []
    for(let row = 0; row <17;row++){
        const aRow = []
        for(let col = 0; col<39;col++){
            aRow.push(createTile(col,row))
        }
        grid.push(aRow)
    }
    return grid
}

const createTile = (col,row) => {
    return{
        col,
        row,
        txt:"",
        strType: ``,
        strId: 0,
        isPicked: false,
        myKey:""
    }
}



