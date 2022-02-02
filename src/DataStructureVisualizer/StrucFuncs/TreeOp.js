import React from 'react'


function TreeOp(props) {

    const {gr,setGr,ch,st,type,setSt,count} = props
    const addValue = async (e) => {
        e.preventDefault()
        let value = document.getElementById("input1").value
        if(value =="") return 
        value = parseInt(value,10)

        const fullStruc = (st.find(e => e.id === ch.id))
        let myStruc = fullStruc.tile //array of coordinates
        let [r,c] = myStruc[0]
        const newGrid = gr.slice()
        
        let i
        //find correct position in tree array to place child tile
        for(i =0; i<15;){
            
                if(gr[r][c].txt > value){
                    i = 2*i+1 

                    if(typeof(myStruc[i])==="undefined") //no left child yet 
                        break
                    r = myStruc[i][0] //left child
                    c = myStruc[i][1] //left child
                }
                else{
                    i = 2*i+2
                    if(typeof(myStruc[i])==="undefined") //no right child yet
                        break
                    
                    r = myStruc[i][0] //right child
                    c = myStruc[i][1] //right child
                }
            
            }
        if(i>14) return  //reached tree depth limit
        let newR,newC, offset = [0,4,4,2,2,2,2,1,1,1,1,1,1,1,1] //for tree shape/ visual structure
        let g = gr[r][c] //parent
        if(g.txt > value){
            newR = r +1
            newC = c - offset[i]
        }
        else{
            newR = r +1
            newC = c + offset[i]
        }
        const aTile = newGrid[newR][newC]//child
        if(typeof(aTile) == "undefined" || !(aTile.strType === "")) return //tile already used by another structure
        const newTile= {
            ...aTile,
            txt:`${value}`,
            strType: type.TREE,
            strId:fullStruc.id,
            myKey: g.myKey +""+newC //for unique keys
            }
        newGrid[newR][newC] = newTile
        setGr(newGrid)
        const newSt = st.filter(e => !(e.id ===fullStruc.id)).slice()//list of data structures without tree
        myStruc[i]=[newR,newC]
        newSt.push({id:ch.id,type:"tree",tile:myStruc})
        setSt(newSt)
        console.log(st)

        
        }
        

    

    return (
        <div className = "controls" >
                <form onSubmit = {addValue}>
                    <input id="input1" type="number" placeholder="value" />
                    <button>Add</button>

                </form>
            </div>
    )
}

export default TreeOp

