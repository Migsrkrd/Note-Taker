
module.exports = () => {
    var id=[];
for(var i=0;i<4;i++){
   id[i] = Math.floor((Math.random()) * 10)
}

const idString = id.join('')

return idString;
}



