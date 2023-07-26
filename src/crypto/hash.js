const crypto = require('crypto')

const func = {
    calculateHash: (argv) => {
        const node = argv
        for( i=1; i<=1e5 ;i++)
        {
            node.nounce =i
            const s = JSON.stringify(node)
            const hash = crypto.createHash('sha256').update(s).digest('hex');
            //console.log(hash)
            if(hash.substr(0,2) === "00")
            {
                 node.hash = hash 
                 //console.log(node)
                 return node 
            }
        }
    }
}

module.exports = {func}