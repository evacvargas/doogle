const axios = require('axios');
const { Breed, Temper } = require('../db.js');
const { Op } = require('sequelize')

module.exports = {

  getAllDogs: async function (params) {
    if (params.name) {
      let dogName = await findByName(params.name)
      return dogName;
    }

    let result = await allData();

    return result;
  },

  getBreed: async function (params) {

    let result = await getDataFromApi();

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

  getTemper: async function () {
    return await Temper.findAll()
  },

  createDog: async function (params) {
    if (!params.name || !params.height || !params.weight) {
      return { message: 'Wrong field' }
    }
    try {
      const postDogBreed = await Breed.create({
        name: params.name,
        height: params.height,
        weight: params.weight,
        life_span: params.life_span
      })

      const temperamentsDog = await postDogBreed.addTemper(params.temperament); //arreglo de obj de temperamentos

      return temperamentsDog;
    } catch (error) {
      return error.message;
    }
  }
}


async function getDataFromApi() {
  let result = await axios.get('https://api.thedogapi.com/v1/breeds')

  return result;
}

async function getDataFromDb() {
  let dogsFromDb = await Breed.findAll({ include: Temper });
  const dogs = dogsFromDb.map(dog => {
    const temps = dog.dataValues.tempers.map(temp => { return temp.name })
    return {
      create_in_db: dog.dataValues.create_in_db,
      createdAt: dog.dataValues.createdAt,
      height: dog.dataValues.height,
      id: dog.dataValues.id,
      life_span: dog.dataValues.life_span,
      name: dog.dataValues.name,
      temperament: temps.toString(),
      updatedAt: dog.dataValues.updatedAt,
      weight: dog.dataValues.weight,
    }
  })
  return dogs;
}

async function allData() {
  const a = await getDataFromApi()
  const b = await getDataFromDb()
  const totalInfo = a.data.concat(b)
  return totalInfo;
}

async function findByName(name) {

  const dogsNamesFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds`)

  const matchNames = dogsNamesFromApi.data.filter(dog => {
    if (dog.name.toLowerCase().includes(name.toLowerCase())) {
      return dog
    }
  })
  const dogsNamesFromDb = await Breed.findAll({ where: { name: { [Op.substring]: `${name}` } }, include: Temper })

  const dogs = dogsNamesFromDb.map(dog => {
    const temps = dog.dataValues.tempers.map(temp => { return temp.name }) //crear un array de string a partir del obj de la db
    return {
      create_in_db: dog.dataValues.create_in_db,
      createdAt: dog.dataValues.createdAt,
      height: dog.dataValues.height,
      id: dog.dataValues.id,
      life_span: dog.dataValues.life_span,
      name: dog.dataValues.name,
      temperament: temps.toString(),
      updatedAt: dog.dataValues.updatedAt,
      weight: dog.dataValues.weight,
    }
  })

  const dogsNames = matchNames.concat(dogs)
  return dogsNames;

}


