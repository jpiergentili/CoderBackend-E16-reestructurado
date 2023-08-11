import config from "../config/config.js";

export default class PersistenceFactory {
    static getPersistence = async() => {
        switch(config.app.persistence) {
            case "ARRAY":
                let { default: UserDaoArray } = await import ('./userDaoArray.js') //corregir el dao
                return new UserDaoArray()
            case "FILE":
                let { default: UserDaoFile } = await import ('./userDaoFile.js') //corregir el dao
                return new UserDaoFile()
            case "MONGO":
                let { default: UserDaoBD } = await import ('./userDaoBD.js') //corregir el dao
                return new UserDaoBD()
        }
    }
}

/* TODO!! */
 //corregir el dao
  //corregir el dao
   //corregir el dao
    //corregir el dao
     //corregir el dao
      //corregir el dao