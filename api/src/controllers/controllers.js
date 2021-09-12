const axios = require('axios');
const { Breed, Temper } = require('../db.js');
const { Op } = require('sequelize')

module.exports = {

  getAllDogs: async function (params) {

    let result = await allData();
    if (params.name) {
      let dogName = await findByName(params.name)
      return dogName;
    }
    return result;
  },

  getBreed: async function (params) {

    let result = await getDataFromApi(); //probar si se coloca dentro del if

    if (params.dogId.length < 5) {
      const dogBreed = result.data.filter(element => {
        if (element.id === parseInt(params.dogId)) {
          return element;
        }
      })
      result.data = dogBreed

      return result.data;
    } else {
      const dogBreedDb = Breed.findByPk(params.dogId)
      return await dogBreedDb
    }
  },

  getTemper: async function () { //falta que se haga la llamada UNA SOLA VEZ a la api 

    //   let result = await allData();

    //   result.map(dog => {
    //     if (dog.temperament) {
    //       dog.temperament.split(",").map(temp => {
    //         try {
    //           Temper.create({ name: temp }) //(find or create)
    //         } catch (error) {
    //         }
    //       })
    //     }
    //   })

    return await Temper.findAll()
  },

  createDog: async function (params) { //ver como se envia desde el front, para enviar por body con un json. EVITAR NOMBRES CONTROVERSIALES
    try {
      const postDogBreed = await Breed.create({
        name: params.name,
        height: params.height,
        weight: params.weight,
        life_span: params.life_span
      })

      const postDogTemp = await Temper.create({
        name: params.temperament
      })

      await postDogBreed.addTempers(postDogTemp);

      return postDogBreed;
    } catch (error) {
      return error.message;
    }
  }
}


//CREAR UTILS DESPUES
async function getDataFromApi() {
  let result = await axios.get('https://api.thedogapi.com/v1/breeds')

  return result;
}

async function getDataFromDb() {
  let db = await Breed.findAll({ include: Temper });
  return db;
}

async function allData() {
  const a = await getDataFromApi()
  const b = await getDataFromDb()
  const totalInfo = a.data.concat(b)
  return totalInfo;
}

async function findByName(name) {

  const dogsNamesFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?name=${name}`)

  const dogsNamesFromDb = await Breed.findAll({ where: { name: { [Op.substring]: `${name}` } } }) //el operador substring trae todo lo que matchee con lo que me pasan por query params

  const dogsNames = dogsNamesFromApi.data.concat(dogsNamesFromDb)
  return dogsNames;

}

//TOLOWERCASE A TODO (CASE SENSITIVE)
