

document.addEventListener("keydown",event =>{
	if(event.code == "Enter"){
		search();
	}
});




function search(){
	
	let word = document.getElementsByName("word")[0].value;
	
	if(verifyInput(word)){
		console.log("searching...");
		let connection = new Connection();
		removeOldElement();
		connection.search(word);
		showLoader();
		
		
	}
}




function verifyInput(input){
	if(typeof input != "string" || input == "" || input == " "){
		alert("Please enter a word!");
		return false;
	}else{
		return true;
	}
}



function makeH3Element(definition){
	let h3 = document.createElement("h3");
	h3.setAttribute("class","font-regular");
	h3.textContent = "- " + definition;
	
	return h3;
}


function addElements(defs){
	
	let newDiv = document.createElement("div");
	newDiv.setAttribute("id","definitions");
	
	let h3;
	
	for(let def of defs){
		h3 = makeH3Element(def);
		newDiv.append(h3);
	}
	
	document.body.append(newDiv);
	
}



function removeOldElement(){
	if(document.getElementById("definitions"))
		document.getElementById("definitions").remove();
}




function hideLoader(){
	document.getElementById("loading").style.display = "none";
}


function showLoader(){
	removeOldElement();
	document.getElementById("loading").style.display = "block";
}





