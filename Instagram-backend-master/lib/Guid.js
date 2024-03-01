 
/**
	 * Genrate a random string
	 * @return {string}
	 * @example
	 * const guid = require('./Guid'); // Present in Libs Folder
	 * var resp = guid();
	 */
	function guid(){
	  function s4() {  
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	
 module.exports =  guid;
 

// module.exports = Generate;
