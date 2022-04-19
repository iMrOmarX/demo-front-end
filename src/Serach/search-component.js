import React, { useState } from 'react'


var CryptoJS = require("crypto-js");

var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
var keyForKeywords = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");



function Search() {
    const [serachedData, setserachedData] = useState("")
    
    const [results, setresults] = useState([])
    const serachForData = () => {


        let encryptedKeyword = CryptoJS.AES.encrypt(serachedData, keyForKeywords ,  {mode: CryptoJS.mode.ECB , iv:iv}).toString();
        
        var url = new URL("http://localhost:4000/search");

        // If your expected result is "http://foo.bar/?x=1&y=2&x=42"
        url.searchParams.append('keyword', encryptedKeyword);

        console.log(url)
        
        fetch(url  , {
            method: "GET",
            mode: "cors",
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((data)=> {
            console.log("data has been recieved")
            data.json().then((d) => {
                console.log(d)

                let decryptedData = d.data.map((x)=> {
                    return CryptoJS.AES.decrypt(x , key , {mode: CryptoJS.mode.ECB , iv:iv}).toString(CryptoJS.enc.Utf8);   
                })
                setresults(decryptedData)

            })
        }).catch((e) => console.error(e))
      
    }
  return (
    <div className='center' >
        <input onChange={(e)=> setserachedData(e.target.value)}></input>
        <button onClick={(e) => {
            serachForData();
        }}>Search</button>

        <div >

        {
            results.map((x) => {
                return <div key={x} style={{
                    marginTop:40
                }}>{x}</div>
            }) 
        }
        </div>
    </div>
  )
}

export default Search