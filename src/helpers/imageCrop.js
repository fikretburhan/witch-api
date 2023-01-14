const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
var sizeOf = require('buffer-image-size')

const imageCrop = async (imageBuffer) => {
  var dimensions = sizeOf(imageBuffer)
  const { height, width } = dimensions
  let cropedImage = []
  const data = await sharp(imageBuffer)
    .withMetadata()
    //.resize(1280, 720)
    .extract({
      height: Math.floor(height * 0.8),
      width: Math.floor(width * 0.3),
      left: Math.floor(width * 0.35),
      top: Math.floor(height * 0.1),
    })
    .toBuffer()
  return data
}

module.exports = { imageCrop }
