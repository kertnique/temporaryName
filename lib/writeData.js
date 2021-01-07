"use strict";

function whichServers (position, numServers){ // get on which servers write data[position]
    const first = position%numServers;
    const cycleposition = position%(numServers*(numServers-1));
    const second = (cycleposition%numServers + cycleposition/numServers)%numServers;
    return {first,second};
}

function sendData(url, data){ // send data to some url
    let xhr = new XMLHttpRequest(); 
    xhr.open("POST", url, true);  
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 
             xhr.send(data);
        } 
    };
    return "OK";
}


const writeData = (startCapacity, serverUrls, data) => {
    for(let i = 0; i< data.size; i++){
        const dataToAdd
        let ourServers = whichServers(startCapacity + i, serverUrls.size);
        let promise1 = new Promise((resolve,err) => {
            sendData(serverUrls[ourServers.first],dataToAdd);
        });
        let promise2 = new Promise((resolve,err) => {
            sendData(serverUrls[ourServers.second],dataToAdd);
        });
        Promise.all(promise1,promise2).catch((err) => {
                console.log("error");
            }
        );
    }
};

module.exports = {writeData};
