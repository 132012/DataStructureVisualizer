import React from 'react'

function ArrayOp(props) {
    const {gr,setGr,ch,st} = props

    const addValue = (e) => {
        e.preventDefault()
        let index = document.getElementById("input1").value
        index = parseInt(index,10)
        const value = document.getElementById("input2").value
        


        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        if(index<0 || index > myStruc.length) return

        const newGrid = gr.slice()
        const myIndex = myStruc[index]
        const i0 = myIndex[0]
        const i1 = myIndex[1]
        const tile = newGrid[i0][i1] 
        const newTile= {
            ...tile,
            txt:`${value}`

            }
        newGrid[i0][i1] = newTile
        setGr(newGrid)
        
    } 

    const removeValue = (e) => {
        e.preventDefault()
        let index = document.getElementById("input3").value
        index = parseInt(index,10)
        if(!index) return
        
        


        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        const newGrid = gr.slice()
        const myIndex = myStruc[index]
        const i0 = myIndex[0]
        const i1 = myIndex[1]
        const tile = newGrid[i0][i1] 
        const newTile= {
            ...tile,
            txt:``

            }
        newGrid[i0][i1] = newTile
        setGr(newGrid)

    } 
    const fillArray = (e) =>{
        e.preventDefault()
        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        const newGrid = gr.slice()

        for(let i = 0; i <myStruc.length;i++){

            const myIndex = myStruc[i]
    
            const i0 = myIndex[0]
            const i1 = myIndex[1]
            const tile = newGrid[i0][i1] 
            const newTile= {
                ...tile,
                txt: Math.floor(Math.random() *100)


                }
            newGrid[i0][i1] = newTile
        
        }
        setGr(newGrid)

    }

    const bubbleSort = async (e) => {
        e.preventDefault()
        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        let  keepGoing,t1,t2


        do{
            keepGoing = false
            for(let i = 0; i <myStruc.length-1;i++){
                let til1 = document.getElementById(myStruc[i].join())
                let til2 = document.getElementById(myStruc[i+1].join())
                t1 = parseInt(til1.innerText,10)
                t2 = parseInt(til2.innerText,10)
                til1.classList.add("look")
                til2.classList.add("look")
                if(t1 > t2  || isNaN(t1) && !isNaN(t2) ){
                    til1.innerText = isNaN(t2) ? "" : t2
                    til2.innerText = isNaN(t1) ? "" : t1
                    keepGoing = true
                }
                await new Promise(r => setTimeout(r, 70));
                til1.classList.remove("look")
                til2.classList.remove("look")
    
            }
        }while(keepGoing)
        updateGrid(myStruc)

    } 

    const insertionSort = async (e) => {
        e.preventDefault()
        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        let  hole,t1,t2,til1,til2,hold2

 
        for(let i = 1; i <myStruc.length;i++){

            til1 = document.getElementById(myStruc[i-1].join())
            til2 = document.getElementById(myStruc[i].join())
            hold2 = til2
            t1 = parseInt(til1.innerText,10)
            t2 = parseInt(til2.innerText,10)
            til2.classList.add("look")
            hole = i-1
            while(hole>=0 && t1 > t2 || isNaN(t1) && !isNaN(t2) ){
                til1.innerText = isNaN(t2) ? "" : t2
                til2.innerText = isNaN(t1) ? "" : t1

                til2 = til1
                t2 = parseInt(til2.innerText,10)
                til1.classList.add("look-1")
                await new Promise(r => setTimeout(r, 70));
                til1.classList.remove("look-1")
                hole =hole-1
                if(hole ===-1) break
                til1 = document.getElementById(myStruc[hole].join())

                t1 = parseInt(til1.innerText,10)

                


            }
            hold2.classList.remove("look")

        }
        updateGrid(myStruc)
    } 
    const quickSort =   (e) => {
        e.preventDefault()
        const myStruc = (st.find(e => e.id === ch.id).tile) //array of coordinates
        qSort(myStruc, 0,myStruc.length -1)
        updateGrid(myStruc)

    }
    async function  qSort( tiles,left, right) {
        let index;
        if (left < right) {

            index =  await partition( tiles,left, right); 
         
            qSort( tiles,left, index - 1);
            
           
            qSort(tiles,index+1, right);
           
        }
    }

    const  partition = async (items, left, right)=> {
        let pivotEl = document.getElementById(items[right].join())  
        let pivotVal = parseInt(pivotEl.innerText,10)
        pivotEl.classList.add("look")

        let i = (left - 1)
        let compEl2,compVal2  
        for (let j = left; j <= right- 1; j++)
        {
            // If current element is smaller than the pivot
            let compEl = document.getElementById(items[j].join())  

            let compVal = parseInt(compEl.innerText,10)

            if (compVal < pivotVal) //if compVal is smaller than pivot
            {
                compEl.classList.add("look-1")

                i++;    
                //swap smaller and larger tiles
                compEl2 = document.getElementById(items[i].join())
                compEl2.classList.add("look-1")

                compVal2 = parseInt(compEl2.innerText,10)
                compEl2.innerHTML = isNaN(compVal) ? "" : compVal 
                compEl.innerHTML = isNaN(compVal2) ? "" : compVal2

                await new Promise(r => setTimeout(r, 70))
                compEl.classList.remove("look-1")
                compEl2.classList.remove("look-1")

            }
      }
        //putting pivot in correct index
        let compEl3 = document.getElementById(items[i+1].join())
        let compVal3 = parseInt(compEl3.innerText,10)
        pivotEl.innerText = isNaN(compVal3) ? "" : compVal3
        compEl3.innerText = isNaN(pivotVal) ? "" : pivotVal  
        pivotEl.classList.remove("look")

        return (i + 1)
    }

    const updateGrid = (myStruc) => {
        const newGrid = gr.slice()
        for(let index =0; index < myStruc.length ; index++ ){
            const myIndex = myStruc[index]
            const i0 = myIndex[0]
            const i1 = myIndex[1]
            const tile = newGrid[i0][i1] 
            const newTile= {
                ...tile,
                txt: document.getElementById(myStruc[index]).innerText

                }
            newGrid[i0][i1] = newTile
        }
        setGr(newGrid) 
    }
    
    // first call to quick sort

    
    
    return (
            <div className = "controls" >
                <form onSubmit = {addValue}>
                    <input id="input1" type="number" placeholder="index" />
                    <input id="input2" type="text" placeholder="value" />
                    <button>Add</button>

                </form>

                <form onSubmit = {removeValue}>
                    <input id="input3"  type="number" placeholder="index" />
                    <button>Delete</button>

                </form>
                
                <div>
                    <button onClick={bubbleSort}> bubble sort</button>
                    <button onClick={insertionSort}> Insertion </button>
                    <button onClick={quickSort}> Quick sort</button>
                </div>
                <div>
                    <button onClick={fillArray}> Fill Array</button>
                  </div>
            </div>    )
}

export default ArrayOp


