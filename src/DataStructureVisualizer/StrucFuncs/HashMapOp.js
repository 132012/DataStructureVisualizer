import React from 'react'

function HashMapOp(props) {

    const {gr,setGr,ch,st} = props

    const put = (e) => {
        e.preventDefault()
        const key = document.getElementById("input1").value
        const value = document.getElementById("input2").value


        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        let loc =-1, i,empty
        for(i =myStruc.length-1;i>=0;i--){
            let [row,col] = myStruc[i][0] //key coordinate
            let a = ((gr[row][col]))
            if(a.txt ===""){
                empty =i
            }
            if(a.txt === key){
                loc = i
                break
            }
        }

        if(loc > -1 || empty >-1){

            const pos = loc > -1 ? loc :empty
            const newGrid = gr.slice()
            const keyVal = myStruc[pos] //found specific key/value array coordinates [k,>,v] 
            const item = [key,">",value]
            for(let j = 0;j<3; j++){
                const tile = newGrid[keyVal[j][0]][keyVal[j][1]] 
                const newTile= {
                ...tile,
                txt:`${item[j]}`

                }
                newGrid[keyVal[j][0]][keyVal[j][1]] = newTile
            }
            setGr(newGrid)
        }
        else{
            console.log("no more room")
        }


    }

    const remove = (e) => {
        e.preventDefault()
        const key = document.getElementById("input3").value


        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        let loc =-1,empty
        for(let i =0;i<myStruc.length;i++){
            let [row,col] = myStruc[i][0] //key coordinate
            let a = ((gr[row][col]))
            if(a.txt === key){
                loc = i
                break
            }
        }
        
        if(loc > -1 ){
            const newGrid = gr.slice()
            const keyVal = myStruc[loc] //found specific key/value array coordinates [k,>,v] 
            const item = [key,"",""]
            for(let j = 0;j<3; j++){
                const tile = newGrid[keyVal[j][0]][keyVal[j][1]] 
                const newTile= {
                ...tile,
                txt:`${item[j]}`

                }
                newGrid[keyVal[j][0]][keyVal[j][1]] = newTile
            }
            setGr(newGrid)
        }
        else{
            console.log("no more room")
        }


    }

    return (
        <div className = "controls" >
            <form onSubmit = {put}>
                <input id="input1" type="text" placeholder="key" />
                <input id="input2" type="text" placeholder="value" />
                <button>Put</button>

            </form>

            <form onSubmit = {remove}>
                <input id="input3" type="text" placeholder="key" />
                <button>Remove</button>

            </form>
            
        </div>
    )
}

export default HashMapOp
