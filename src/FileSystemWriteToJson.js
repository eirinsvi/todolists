function createFile(title) {
      var type = window.TEMPORARY;
      var size = 5*1024*1024;
      window.requestFileSystem(type, size, successCallback, errorCallback)
   
      function successCallback(fs) {
         fs.root.getFile(title + '.txt', {create: true, exclusive: true}, function(fileEntry) {
            console.log('File creation successfull!')
         }, errorCallback);
      }
   
      function errorCallback(error) {
         console.log("ERROR: " + error.code)
      }
}

export default createFile


