import React from 'react'

function QueueOp(props) {
    const {gr,setGr,ch,st} = props

    const enqueue = (e) => {
        e.preventDefault()
        const value = document.getElementById("input1").value
        
        console.log( st)
        console.log( ch.id)

        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        let top =-1
        for(let i =myStruc.length-1;i>=0;i--){
            let [row,col] = myStruc[i]
            let a = ((gr[row][col]))
            if(a.txt === ""){
                top = i
                break
            }
        }

        if(top > -1){
            const newGrid = gr.slice()
            const [r,c] = myStruc[top]
            const tile = newGrid[r][c] 
            const newTile= {
                ...tile,
                txt:`${value}`

                }
            newGrid[r][c] = newTile
            setGr(newGrid)
        }


    }

    const dequeue = (e) => {
        e.preventDefault()

        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        let top =-1,tile,carry =""
        const newGrid = gr.slice()

        for(let i =0;i<myStruc.length;i++){
            let [row,col] = myStruc[i]
            let a = ((gr[row][col]))
            if(a.txt === ""){
                continue
            }
            tile = newGrid[row][col] 
            const newTile= {
                ...tile,
                txt:`${carry}`

                }
            carry = tile.txt 

            newGrid[row][col] = newTile

        }
        setGr(newGrid)




    }
 
    return (
        
        <div className = "controls" >
            <form onSubmit = {enqueue}>
                <input id="input1" type="text" placeholder="value" />
                <button>Enqueue</button>

            </form>

            <form onSubmit = {dequeue}>
                <button>Dequeue</button>

            </form>
        </div>
        
    )
}

export default QueueOp
