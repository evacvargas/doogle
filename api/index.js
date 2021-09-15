//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db');
const axios = require('axios');
const { Temper } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  async function getTempersFromApi() {
    let result = await axios.get('https://api.thedogapi.com/v1/breeds');
    const allTempers = result.data.map(dog => {
      if (dog.temperament) {
        const dogMap = dog.temperament.split(", ")
        let temperArr = []
        dogMap.map(temp => {
          if (!temperArr.includes(temp)) {
            temperArr.push(temp)
          }
        })
        temperArr.map(tempN => {
          Temper.findOrCreate({ where: { name: tempN } })
        })
      }
    })
  }
  getTempersFromApi()

  server.listen(3002, () => {

    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});
