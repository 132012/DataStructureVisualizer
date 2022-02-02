import React from 'react'

function StackOp(props) {
    const {gr,setGr,ch,st,setSt} = props

    const pushValue = (e) => {
        e.preventDefault()
        const value = document.getElementById("input1").value

        const myStruc = (st.find(e => e.id === ch.id)) //my stack structure
        let top =myStruc.top
        const tiles = myStruc.tile

        if(top>=tiles.length) return
        //finds the top index to put push value //better than filtering this struc from all structures and pushing new struc withupdated top value
        //for(let i =0;i<myStruc.length;i++){
           // let [row,col] = myStruc[i]
            //let a = ((gr[row][col]))
            /*if(a.txt === ""){
                top = i
                break
            }*/
        //}

        //if(top > -1){
            const newGrid = gr.slice()
            const [r,c] = tiles[top]
            const tile = newGrid[r][c] 
            const newTile= {
                ...tile,
                txt:`${value}`

                }
            newGrid[r][c] = newTile
            setGr(newGrid)
            let updateStr = st.filter(e => e.id !== ch.id).slice()
            myStruc.top = top +1
            updateStr.push(myStruc)
            setSt(updateStr)
        //}


    } 

    const popValue = (e) => {
        e.preventDefault()
        
        console.log( st)
        console.log( ch.id)

        const myStruc = st.find(e => e.id === ch.id) //array of coordinates
        let top = myStruc.top -1
        const tiles = myStruc.tile
        /*for(let i =myStruc.length -1;i>=0;i--){
            let [row,col] = myStruc[i]
            let a = ((gr[row][col]))
            if(!(a.txt === "")){
                top = i
                break
            }
        }*/

        if(top <0) return
        console.log(myStruc.top)
        const newGrid = gr.slice()
        const [r,c] = tiles[top]
        const tile = newGrid[r][c] 
        const newTile= {
            ...tile,
            txt:``

            }
        newGrid[r][c] = newTile
        setGr(newGrid)
        let updateStr = st.filter(e => e.id !== ch.id)
        myStruc.top = top
        updateStr.push(myStruc)
        setSt(updateStr)
        


    }

    return (
        <div className = "controls" >
                <form onSubmit = {pushValue}>
                    <input id="input1" type="text" placeholder="value" />
                    <button>Push</button>

                </form>

                <form onSubmit = {popValue} >
             
                    <button>Pop</button>

                </form>
                
        </div> 
    )
}

export default StackOp
