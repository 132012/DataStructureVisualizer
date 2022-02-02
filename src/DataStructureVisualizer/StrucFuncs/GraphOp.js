import React,{useState} from 'react'
const PriorityQueue = require('priorityqueuejs');


function GraphOp(props) {
    const {gr,setGr,ch,st,type,setSt,setOp,op} = props
    const [message,setMessage] = useState(" ")

    const addVertex = (e) => {
        e.preventDefault()
        if(op ==="Vertex"){
            setOp("")
            document.getElementById("vertexbutton").style.backgroundColor = `white`

        }
        else{
            console.log("we in here")
            setOp("Vertex")
            document.getElementById("vertexbutton").style.backgroundColor = `grey`


        }
        
    }

    const addEdge = (e) => {
        e.preventDefault()
        let from = document.getElementById("input1").value
        let to = document.getElementById("input2").value
        let weight = document.getElementById("input3").value
        let dir = false
        let fromInt= parseInt(from,10)
        let toInt= parseInt(to,10)

        if(from === to) return  // still need to do when self loop
        console.log(weight+"   "+typeof(weight))
        const myStruc = (st.find(e => e.id === ch.id)) //my graph structure
        const edges  = myStruc.edges
        const coor = myStruc.tile  
        from = coor[from]
        to = coor[to]
        if(!from || !to )
            return //if faulty info is given
        from = from.join()

        to = to.join()
        //edges.push([from,to,weight,dir])
        console.log(edges)
        console.log(fromInt+"  "+toInt)
        edges[fromInt][toInt] = [from,to,weight,dir,fromInt,toInt]
        if(dir ===false)
            edges[toInt][fromInt] = [to,from,weight,dir,toInt,fromInt]

        const newSt = st.filter((e => e.id !== ch.id)).slice() //copy list of data structures without my graph
        const myNewSt = {...myStruc,edges:edges}
        newSt.push(myNewSt)
        setSt(newSt)


    } 
    
    const dijkstra = async(e) => {
        e.preventDefault()

        
        let start = document.getElementById("str").value
        start= parseInt(start,10)
        let end = document.getElementById("end").value
        end= parseInt(end,10)
        if(start === end) return
        console.log(end)
        let distances = {}

        let prev  ={}
        var queue = new PriorityQueue((a, b)=> {
            return b.cost - a.cost;
          });
        
        const myStrucAll =  (st.find(e => e.id === ch.id))
        const coor = myStrucAll.tile  
        let from = coor[start]
        let to = coor[end]
        if(!from || !to )
            return //if faulty info is given
            
        const edges = myStrucAll.edges.slice()

        distances[start] = 0
        //if(!edges[start]) return //if initial node has no neighbors
        queue.enq({tile:start,cost:0})


        const myStruc = myStrucAll.tile
        const visited = []
        for(let i =0;i<edges.length;i++){
            if(i !== start) 
                distances[i] = Infinity
            prev[i] = null
        }
        let til1,til2,neighbor
        while(!queue.isEmpty()){
            let min = queue.deq()
            visited.push(min.tile)
            let currTile = min.tile
            til1 = document.getElementById(myStruc[currTile].join())
            til1.classList.add("look")
            for(let i =0;i<edges[currTile].length;i++){
                console.log(currTile+"    "+i+"     "+typeof(edges[currTile][i]))

                if(typeof(edges[currTile][i]) === "undefined" || i === currTile ){
                    continue}
                neighbor = edges[currTile][i]
                let alt = distances[currTile] + parseInt(neighbor[2],10)
                let n = neighbor[5]
                til2 = document.getElementById(myStruc[n].join())
                til2.classList.add("look-1")
                await new Promise(r => setTimeout(r, 300))
                til2.classList.remove("look-1")
                if(alt < distances[n] && !visited.includes(n)){
                    distances[n] = alt
                    prev[n] = currTile
                    if(edges[n]){ //if tile has neighbors
                        if( n!== end)
                           
                            queue.enq({tile:n, cost:distances[n]})
                            console.log(queue)
                    }
                }
            }
            
            til1.classList.remove("look")


        }
        let path = [end]
        console.log(end)
       do{
        if(prev[end] === null){
            setMessage("No Path Found")
            return
            }
            end = prev[end]
            path.push(end)
            await new Promise(r => setTimeout(r, 300))

            console.log("start: "+ start)
            console.log("end: "+ end)
            console.log(prev) //fix
        }while(end !== start)

        const rev = path.slice()
        const newMessage = rev.reverse().join(" > ")
        setMessage(newMessage)

        let til3
        for(let j =0;j<3;j++){
            for(let i =path.length-1;i>= 0;i--){
                til3 = document.getElementById(myStruc[path[i]].join())
                til3.classList.add("look-2")
                await new Promise(r => setTimeout(r, 500))
                til3.classList.remove("look-2")
            }
            await new Promise(r => setTimeout(r, 1100))

        }

        //console.log(distances)
        console.log(prev)
        //light up answers 3 times
    }

    const randomGraph = async (e)=> {
        await setOp("Vertex")


        let clicks,row,col
        
        //generate vertices
        for(let i =0;i<6;i++){
            row = Math.floor(Math.random() * 17)
            col = Math.floor(Math.random() * 39)
            if(gr[row][col].strId !== 0){
                i--
                continue
            }
            clicks = document.getElementById(row+","+col)
            clicks.click()

        }
        setOp("")

        //generate edges

        let from, to,weight
        let myStruc = (st.find(e => e.id === ch.id))
        let numVertices = myStruc.tile
        let myEdges = myStruc.edges.slice()
        let len = numVertices.length
        for(let i = 0 ; i <7; i++){
            from = Math.floor(Math.random() * len)
            to = Math.floor(Math.random() * len)
            weight = Math.floor(Math.random() * 10)
            if(from === to){
                --i
                continue
            }
            randomEdges(from,to,weight,false,myEdges,numVertices)
        }
        const newSt = st.filter((e => e.id !== ch.id)).slice() //copy list of data structures without my graph
        const myNewSt = {...myStruc,edges:myEdges}
        newSt.push(myNewSt)
        setSt(newSt)
        console.log()


    }

    const randomEdges = (from1, to1, weight1,dir1,edges1,coor) => {
        let from = from1
        let to = to1
        let weight = weight1
        let dir = dir1
        let fromInt= parseInt(from,10)
        let toInt= parseInt(to,10)

        console.log(weight+"   "+typeof(weight))
        from = coor[from]
        from = from.join()
        to = coor[to]
        to = to.join()
        
        edges1[fromInt][toInt] = [from,to,weight,dir,fromInt,toInt]
        if(dir ===false)
            edges1[toInt][fromInt] = [to,from,weight,dir,toInt,fromInt]


    } 

    return (
        <div className = "controls" >
                <form onSubmit = {addVertex}>
                    <button id ="vertexbutton">Add Vertex</button>

                </form>

                <form onSubmit = {addEdge}>
                    <input id="input1" type="number" placeholder="from" />
                    <input id="input2" type="number" placeholder="to" />
                    <input id="input3" type="number" placeholder="weight" />
  
                    <button>Add Edge</button>

                </form>
                <form onSubmit = {dijkstra}>
                    <input id="str" type="number" placeholder="from" />
                    <input id="end" type="number" placeholder="to"/>
                    <button >Dijkstra</button>
                    <p>{message}</p>
                </form>
                <div>
                    <button onClick = {randomGraph}>Generate Graph</button>
                
                </div>
            </div>
    )
}

export default GraphOp
