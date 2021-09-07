// const axios = require('axios');
// const { Breed, Temper } = require('../db.js');



// module.exports = {
//     getDataFromApi: async function () {
//         let result = await axios.get('https://api.thedogapi.com/v1/breeds');
//         return result;
//     },
    
//     getDataFromDb: async function () {
//         let db = await Breed.findAll({ include: Temper });
//         return db;
//     },

//     allData: async function (getDataFromApi, getDataFromDb) {
//         const a = await getDataFromApi()
//         const b = await getDataFromDb()
//         const totalInfo = a.data.concat(Object.keys(b))
//         console.log(totalInfo)
//         return totalInfo;
//     }
// }