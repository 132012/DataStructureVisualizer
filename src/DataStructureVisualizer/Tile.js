import React from 'react'

function Tile(props) {
    const {col,row,sType,sId,st,setSt,ch,setCh,gr,setGr,isP,op,setOp,type,count,setCount,txt,aKey} = props


    const stackGrid = ( size) => {
        if((row -size) >= -1){

        //const newGrid = gr.slice();
        const newGrid = gr.slice().map(row => row.slice())
        let tile,newTile,arow,coor =[]
        
        for(let i =0;i<size;i++){
            arow =row-i
            tile = newGrid[arow][col]
            if(tile.strId !== 0) 
                return
            newTile= {
              ...tile,
              isPicked: !isP,
              strType: type.STACK,
              strId:count
            };

            newGrid[arow][col] = newTile
            coor.push([arow,col])
        }
        console.log("WHAAAAAAT")
        console.log(st)
        setGr(newGrid)
        let newCount = count +1;
        setCount(newCount)

        const newSt = st.slice() //copy list of data structues
        let top =0
        newSt.push({id: count,type:"stack", tile: coor,top: top})
        setSt(newSt)
        setOp("")

        }
      }
      
    const arrayGrid = (size) =>{
        //setOp("")
        if((col +size) <= 39){

            //const newGrid = gr.slice()
            const newGrid = gr.slice().map(row => row.slice())

            let tile, newTile,acol,coor =[]
            

            for(let i =0;i<size;i++){
                tile = newGrid[row][col+i]
                if(tile.strId !== 0) 
                    return
                newTile= {
                ...tile,
                isPicked: !isP,
                strType: type.ARRAY,
                strId:count
                };

                newGrid[row][col+i] = newTile
                acol =col+i
                coor.push([row,acol])
            }
            setGr(newGrid)
            let newCount = count +1;
            setCount(newCount)

            const newSt = st.slice() //copy list of data structues
            newSt.push({id: count,type:"array", tile: coor})
            setSt(newSt)
            console.log(st)
            setOp("")

        }

    }

    const queueGrid = (size) => {
        if((col -size) >= -1){

            //const newGrid = gr.slice();
            const newGrid = gr.slice().map(row => row.slice())

            let tile, newTile,acol,coor =[]
            for(let i =0;i<size;i++){
                acol = col-i
                tile = newGrid[row][acol];
                if(tile.strId !== 0) 
                    return
                newTile= {
                ...tile,
                isPicked: !isP,
                strType: type.QUEUE,
                strId:count

                };

                newGrid[row][acol] = newTile;
                coor.push([row,acol])
            }
            setGr(newGrid)
            let newCount = count +1;
            setCount(newCount)

            const newSt = st.slice() //copy list of data structues
            newSt.push({id: count,type:"queue", tile: coor})
            setSt(newSt)
            setOp("")

        }
    }
    const mapGrid = (size) => {
        if((col +2) <= 39  && (row +size) <= 17){
            //const newGrid = gr.slice();
            const newGrid = gr.slice().map(row => row.slice())

            let tile, newTile,coor =[],arr,r,c
            for(let i = 0; i<size;i++){
                arr =[]
                for(let j = 0;j<3; j++){
                    r=row+i
                    c=col+j
                    tile = newGrid[r][c]
                    if(tile.strId !== 0) 
                        return
                    newTile= {
                    ...tile,
                    isPicked: !isP,
                    strType: type.MAP, 
                    strId:count

                    }
                newGrid[r][c] = newTile; //update tile in copy grid
                
                arr.push([r,c]) //pushes for single key/value

                
                }
                coor.push(arr)
            }
            setGr(newGrid)
            let newCount = count +1;
            setCount(newCount)

            const newSt = st.slice() //copy list of data structues
            newSt.push({id: count,type:"map", tile: coor})
            setSt(newSt)
            setOp("")

        }
    }

    const treeGrid = (root) =>{
        //setOp("")
        
            console.log(root)
            //const newGrid = gr.slice()
            const newGrid = gr.slice().map(row => row.slice())

            let tile, newTile,coor =[]

            // create  root tile
            tile = newGrid[row][col]
            newTile= {
            ...tile,
            isPicked: !isP,
            txt:`${root}`,
            strType: type.TREE,
            strId:count,
            myKey: aKey
            };

            newGrid[row][col] = newTile
            coor.push([row,col])

            setGr(newGrid)
            let newCount = count +1;
            setCount(newCount)
            const newSt = st.slice() //copy list of data structues
            newSt.push({id: count, type:"tree",tile: coor})
            setSt(newSt)
            setOp("")
            
    }

    const graphGrid = () =>{
        //setOp("")
        
            //const newGrid = gr.slice()
            const newGrid = gr.slice().map(row => row.slice())

            let tile, newTile,coor =[]

            // create  vertex tile
            tile = newGrid[row][col]
            newTile= {
            ...tile,
            isPicked: !isP,
            txt:`0`,
            strType: type.GRAPH,
            strId:count,
            myKey: aKey
            };

            newGrid[row][col] = newTile
            coor.push([row,col])

            setGr(newGrid)
            let newCount = count +1;
            setCount(newCount)
            const newSt = st.slice() //copy list of data structues
            let edg = []
            edg.push([])
            newSt.push({id: count, type:"graph",tile: coor, edges:edg})//edges = [[],[],[]]
            setSt(newSt)
            setOp("")

            
    }

    const vertexGrid = () =>{
        //setOp("")
        
            //const newGrid = gr.slice()
            const newGrid = gr.slice().map(row => row.slice())

            let tile, newTile
            const coor = (st.find(e => e.id === ch.id)) //find correct graph from all structures
            let myStruc = coor.tile //array of coordinates of graph [[,],[,],[,]]

            // create  root tile
            tile = newGrid[row][col]
            newTile= {
            ...tile,
            txt:`${myStruc.length}`,
            strType: type.GRAPH,
            strId:ch.id,
            myKey: aKey
            };

            newGrid[row][col] = newTile
            myStruc.push([row,col])

            let edges = coor.edges
            edges.push([])

            setGr(newGrid)
            const newSt = st.filter((e => e.id !== ch.id)).slice() //copy list of data structures without my graph
            const myNewSt = {...coor,tile:myStruc,edges:edges}
            newSt.push(myNewSt)
            setSt(newSt)
            //setOp("")

            
    }




    
    const click =() =>{
        if(sId ===0){ // tile clicked is not being used
            if(op !== ""){ 
                if(op==="Vertex")
                    vertexGrid()
                else if(op === "Graph")
                    graphGrid()
                else{
                    let size= parseInt(prompt("Size/root:"),10)

                    if(op === "Array")
                        arrayGrid(size)
                    else if(op === "Stack")
                        stackGrid(size)
                    else if(op === "Queue")
                        queueGrid(size)
                    else if(op === "HashMap")
                        mapGrid(size)
                    else if(op === "Tree")
                        treeGrid(size)
                    
            }
            }
        }
        else{
            setCh({id:sId , type:sType})
            setOp("")
            console.log(ch)

        }
    }

    const extra = sId === ch.id ? ' highlight' : ''
    const main = sType === ``? ``:
                sType ===type.ARRAY ? `array helper` :
                sType ===type.STACK ? `stack helper` :
                sType ===type.QUEUE ? `queue helper` :
                sType ===type.MAP ? `map helper` :
                sType ===type.TREE ? `tree helper` :`graph helper` 
    return (
        <div id={`${aKey}`} className = {` myTile ${main} ${extra} `} 
            onClick = {() => click()} >
                {txt}
        </div>
    )
}

export default Tile




