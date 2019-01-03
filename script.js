let field ;

init();
function init() {
	//alert('run');
	$('[name = "columns"]').on("change", evt=> {
		create();
	})
	$('[name = "rows"]').on("change", evt=> {
		create();
	})

	
	create();
}

function create() {
	let cols = $('[name = "columns"]').val(), 
		rows = $('[name = "rows"]').val();
	field = [];
	$("#field").empty();
	console.log(cols,rows);
	for(var d=0 ; d< rows ; d++ ){
		let tr = $("<tr/>");
		let row =[];
		for(var i=0 ; i< cols; i++){
			tr.append($("<td>").text(""));//}
			row.push(false);
		}
		$("#field").append(tr);
		field.push(row);
	}
	console.log(field);
	$("#field td").on("click", evt=>{
		let col=evt.target.parentElement.rowIndex;
		let row = evt.target.cellIndex ;
		field[col][row]= !field[col][row];
		update();
	});	
}

function update(){
	console.log(field);
	for (let r =0 ; r<field.length; r++){
		let tr = $("#field tr")[r];
		for(let c=0; c<field[r].length; c++){
			console.log($(tr).children());
			if (field[r][c]){
				//console.log($("#field tr")[0]); 
			}
		}

	}
}