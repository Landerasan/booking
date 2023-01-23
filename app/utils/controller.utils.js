let nameList = ["Dima", "Stanislav", "Anton", "Nikolay", "Sergey"]
let surnameList = ["Petrov", "Ivanov", "Sidorov", "Volkov", "Zaycev"]
let mailList = ["gmail.com", "yandex.ru", "mail.ru"]

const getRandomInt = (max = 10, min = 0) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const nameGenerator = () => {
    return `${nameList[getRandomInt(nameList.length - 1)]} ${surnameList[getRandomInt(surnameList.length - 1)]}`
}

const emailGenerator = (name) => {
    return `${name.replace(/\s/g, '')}${1960 + getRandomInt(40)}@${mailList[getRandomInt(mailList.length - 1)]}`
}

const isActiveGenerator= () => {
    return getRandomInt(9) % 2 == 0
}

const operationTypes = [
    "read",
    "delete",
    "add",
    "packet"
]

const bodyParser = (body) => {
    let resultObject = [{},{}]
    let possibleFields = new Array("name", "email", "isActive", "_id")
    possibleFields.forEach(key => {
        if(body.hasOwnProperty(key)){
            resultObject[0][key] = body[key]
        }
    })
    let possibleSetFields = new Array("setName", "setEmail", "setIsActive")
    possibleSetFields.forEach((key, index) => {
        if(body.hasOwnProperty(key)){
            resultObject[1][possibleFields[index]] = body[key]
        }
    })
    if(Object.keys(resultObject[1]).length == 0){
        let random = getRandomInt(2,0);
        switch (random) {
            case 0: 
                resultObject[1].name = nameGenerator()
                break
            case 1:
                resultObject[1].email = emailGenerator(nameGenerator())
                break
            case 2:
                resultObject[1].isActive = isActiveGenerator()
        }
    }
    return resultObject
}

function getRandomOperation(max = 9) {
    let randomNumber = getRandomInt(max);
    let result = operationTypes.filter((el, index) => {
        return randomNumber >= index * 3 && randomNumber <= index * 3 + 2;
    })[0]
    if (result == "packet") {
        randomNumber = getRandomInt(max, 2);
        result = { packet: [] }
        for (i = 0; i < randomNumber; i++) {
            result["packet"].push(getRandomOperation(8))
        }
    }
    return result
}

module.exports = {
    nameGenerator,
    isActiveGenerator,
    emailGenerator,
    bodyParser
}