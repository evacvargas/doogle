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
const Temper = require('./src/models/Temper.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {

  server.listen(3002, () => {
    // async function getTemper() {
    //   let result = await axios.get('https://api.thedogapi.com/v1/breeds');
    //   const allTempers = result.data.map(dog => {
    //     if(dog.temperament){
    //       dog.temperament.split(",").map(temp => {
    //         Temper.create({name: temp})
    //       })
    //     }
    //   })
    // }
    // getTemper()

    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});
