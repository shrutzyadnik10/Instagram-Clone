//LIB IMPORTS
const moveFile = require("move-file");
const path = require("path");

//CLASS FILESYSTEM
class FileSystem {
  //SAVE FUNCTION
  async save(oldpath, imageName) {
    var destFilePath = "storage/files/" + imageName;
    await moveFile(oldpath, destFilePath);
    return "http://localhost:2903/media/" + imageName;
  }
}

module.exports = FileSystem;
