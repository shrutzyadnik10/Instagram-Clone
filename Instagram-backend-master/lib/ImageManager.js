//LIB IMPORTS
const FileSystem = require("./FileStorage");
const path = require("path");
const guid = require("./Guid");

//CLASS IMAGEMANAGER
class ImageManager {
  //SAVE FUNCTION
  async save(file) {
    var fs = new FileSystem();
    const ext = path.extname(file);
    if (ext != ".jpg" && ext != ".jpeg" && ext != ".png") {
      throw new Error("invalid file");
    }
    const hash = guid();
    const imageName = hash + ext;
    var URL = await fs.save(file, imageName);
    // await this.saveInDb(URL,imageName, 'ORIGINAL');
    return URL;
  }
}
module.exports = ImageManager;
