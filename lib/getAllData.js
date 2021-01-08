"use strict";

function getServerIds(position, numServers){
    const first = position%numServers;
    const cycle = position%(numServers*(numServers-1));
    const second = (cycle%numServers+cycle/numServers)%numServers;
    return {first,second};
}

async function getFromServer (position, url){
    let responce = await fetch(url);
    if(responce.ok){
        let data = parseJSON(responce.json);
        return data.filter((id) => id === position);
    }
    else{
        console.log("error");
        return "";
    }
}

const getAllData = async function(serverUrls) {
    let data = {};
    let counter = 0;
    let isData = 1;
    while(isData === 1){
        let serverIds = getServerIds(counter,serverUrls.size);
        let getFirst = getFromServer(counter,serverUrls[serverIds.first]);
        let getSecond = getFromServer(counter,serverUrls[serverIds.second]);
        Promise.all([getFirst,getSecond]).then((values) => {
            let check = values[0];
            if(check === values[1]&& check!= ""){
                data+={check};
            }
            else{
                console.log("Error: different data in servers.");
            }
        })
        .catch((error) => {
            console.log(error.message);
            isData = 0;
        })
        counter++;
    }
    return data;
}

module.exports = {getAllData};
