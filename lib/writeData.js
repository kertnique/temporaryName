'use strict'

function whichServers (position, numServers){ // get on which servers write data[position]
    const first = position%numServers
    const cycleposition = position%(numServers*(numServers-1))
    const second = (cycleposition%numServers + cycleposition/numServers)%numServers
    return first,second 
}

function sendData(url, data){ // send data to some url
    let xhr = new XMLHttpRequest() 
    xhr.open("POST", url, true)  
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 
             xhr.send(data)
        } 
    };
    return "OK" 
}


const writeData = (serverUrls, data) => {
    for(let i = 0; i< data.size; i++){
        let ourServers = whichServers(startCapacity + i, serverUrls.size)
        let promise1 = Promise((resolve,err) => {
            sendData(serverUrls[ourServers.first])
        });
        let promise2 = Promise((resolve,err) => {
            sendData(serverUrls[ourServers.second])
        });
        Promise.all(promise1,promise2).catch(err => {
                console.log(err)
            }
        )
    }
}

module.exports = {writeData};