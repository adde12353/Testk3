import React from 'react'
import { useState } from 'react'

export default function CreateTask() {
    const [titel, setTitel] = useState('')
    const [sendDone, setSendDone] = useState(false)
    
    function handleSubmit(e) {
        setSendDone()
        e.preventDefault();
        const input = {
        name: titel,
        }
        fetch("http://localhost:3000/projects", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(input)
        }).then(
            setSendDone("Du skickade datan utan problem")
            ).catch(err => {
            console.log(err)
            if(err) {
                setSendDone("Det gick inte att spara, försök igen")
            }
        })

    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='createForm'>
            <h3>Skapa ett projekt</h3>
            <input 
            type="text"
            required
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
            placeholder='Projekt namn'/>
            
            <button>Spara</button>
            <p>{sendDone}
            </p>
        </form>
        
    </div>
  )

  }