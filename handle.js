
var keywords = ["int","char","float","long"]; 


function lineObject(lineNumber){
	this.lineValue = [];
}

function Editor_lines(){
	this.linesObjectArray = [];	
	
	
	this.handleChar = function(char){
		console.log(char);	
	}
			
}


var document_editor = new Editor_lines();
function handle_input(e){
    var character = e;  
    document_editor.handleChar(character);
}
