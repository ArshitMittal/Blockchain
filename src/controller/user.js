const fs = require ('fs')
const path = require('path')
const {func} = require('../crypto/hash')

const dataFile = path.join('db','data.json')

// console.log(dataFile)
const controlBlock = {
    createUser : async (req,res) => {
        const blocks = await loadData();
        //console.log(blocks)
        const l = blocks.length;
        const prevHash = blocks[l-1].hash;
        const input = req.body.data;
        const newNode = {
            Num: l,
            data: input,
          prevHash: prevHash
        };
        
        try {
          const nodeWithHash = await func.calculateHash(newNode);
          if (!nodeWithHash || !nodeWithHash.hash) {
            throw new Error('Nounce cannot be created');
          }
          blocks.push(nodeWithHash);
          saveNotes(blocks);
          res.send(nodeWithHash);
          console.log(blocks)
        } catch (error) {
          res.status(500).send(error.message);
        }
        
    },


    blockInfo : async (req, res) => {
        try {            
        const blockNo = parseInt(req.query.number)
        console.log(typeof(blockNo))
        const blocks = await loadData()
        const block = await blocks.find((block) => block.Num === blockNo)
        if(!block)
        throw new Error('Block number not found')
        res.status(200).send(block)
        } catch (error) {
            res.status(400).send(error.message)
        }

    },


    chainInfo : async (req, res) => {
        try{
            const blocks = await loadData()
            const l = blocks.length;   
            res.status(200).send({"Total Lenght" : l , "lastBlock Hash " : blocks[l-1].hash})
        }catch(error)
        {
            res.status(500).send({error})
        }
        
    }
}



const saveNotes = (blocks) => {
      const dataJson = JSON.stringify(blocks)
     // console.log(blocks)
     // console.log(dataJson)
      fs.writeFileSync(dataFile,dataJson)
}




const loadData = () => {
    const dataBuffer = fs.readFileSync(dataFile)
    const dataJson = dataBuffer.toString()
   const data = JSON.parse(dataJson)
   //console.log(data)
   return data 
}


module.exports = controlBlock