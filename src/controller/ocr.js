const vision = require('@google-cloud/vision')
const path = require('path')
const fs = require('fs')
const { errorHandler } = require('../middleware/errorHandler')
// Creates a client

const client = new vision.ImageAnnotatorClient({
  key: 'AIzaSyAKxhb3JVoYlqYRBhfB51SSt1RqfppPdmM',
})
const fileName = path.join(__dirname, '.', 'images', 'ketcap_1.jpg')
const getOCR = (image) => {
  return new Promise((resolve, reject) => {
    try {
      const imageBuffer = Buffer.from(image, 'base64')
      const request = {
        image: {
          content: imageBuffer,
        },
      }
      client
        .textDetection(imageBuffer)
        .then((res) => {
          if (res[0]?.error) {
            reject(res[0]?.error)
          }
          const mappedData = mapTextDetection(res)
          resolve(mappedData)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (err) {
      reject(err)
    }
  })
}

const mapTextDetection = async (res) => {
  const data = res[0].textAnnotations

  let mappedData = []
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    const sortedVertices = element.boundingPoly.vertices.sort((a, b) => {
      // return b.y - a.y production da y ekseni alınmalı
      return b.x - a.x
    })
    const isComma = element.description.includes(',')
    var isNum = false
    if (isComma) {
      const arr = element.description.split(',')
      isNum = Boolean(!isNaN(arr[0]))
    } else {
      isNum = Boolean(!isNaN(element.description))
    }
    mappedData.push({
      description: element.description,
      // yLength: sortedVertices[0].y - sortedVertices[3].y, //production da y ekseni alınmalı
      yLength: sortedVertices[0].x - sortedVertices[3].x,
      isNumeric: isNum,
    })
  }
  return mappedData.sort((a, b) => {
    return b.yLength - a.yLength
  })
}
module.exports = getOCR
