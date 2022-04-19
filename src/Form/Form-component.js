import React, { useState } from 'react'
import './Form.css'

var CryptoJS = require("crypto-js");

var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
var keyForKeywords = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");


function Form() {
  const [document, setdocument] = useState("")
  const [keywords, setkeywords] = useState(["" , ""])


  const sendData = () => {
    
    let cipherDocument = CryptoJS.AES.encrypt(document, key , {mode: CryptoJS.mode.ECB , iv:iv}).toString();
    
    let cipherKeywords = keywords.map((k) => {
      return CryptoJS.AES.encrypt(k, keyForKeywords ,  {mode: CryptoJS.mode.ECB , iv:iv}).toString()
    })

    console.log({
      document: cipherDocument,
      keywords: cipherKeywords
    })
    fetch("http://localhost:4000/document" , {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: cipherDocument,
        keywords: cipherKeywords
      })
    }).then((data)=> console.log("data has been sent")).catch((e) => console.error(e))

  }
  return (
    <>
    <div className='document-form item'>
        <div className='left-side-document-form item'>

          <label className='item'>Document</label>
          <textarea onChange={(e) => setdocument(e.target.value)} ></textarea>
        </div>
      
        <div className='right-side-document-form item'>
          <label className='item'>Keywords</label>
          {/* <input placeholder='Number of Keywords' min={1}className="item" type="number" onChange={(e)=> {
            setnumberOfKeywords(e.target.value)
          }}/> */}

          {/* {
            (()=> { 
              let x = [];
              let newKeywords = [];
              for (let index = 0; index < numberOfKeywords; index++) {
                x.push(<input className='item' onChange={(e)=> {
                  let tmp = [...newKeywords]
                  tmp[index] = e.target.value
                  setkeywords(tmp)
                }} ></input>) 
                keywords.push("")
              }
              
              return x  
            })()
          } */}

          <input className='keyword item' onChange={(e)=> {
            let tmp = [...keywords]
            tmp[0] = e.target.value
            setkeywords(tmp)
          }} ></input>

          <input className='keyword item' onChange={(e)=> {
            let tmp = [...keywords]
            tmp[1] = e.target.value
            setkeywords(tmp)
          }} ></input>

        </div>

    </div>
    <button onClick={() => sendData()}>Send to Database</button>
    </>
  )
}

export default Form