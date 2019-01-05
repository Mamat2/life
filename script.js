let field , intervalId=-1 ;

init();
function init() {
	//alert('run');
	$('[name = "columns"]').on("change", evt=> {
		create();
	});
	$('[name = "rows"]').on("change", evt=> {
		create();
	});
	$('#step').click(evt=>{ 
		newState();
		update();
	});
	$ ('#run').click(evt=>{
		if (intervalId == -1){
			intervalId=setInterval(()=>{newState(); update()}, 1000);
		} else {
			clearInterval(intervalId);
			intervalId=-1;
		}
		
	});
	$ ('#clear').click(evt=>{
		
		for(let r=0; r<field.length ; r++){
			for (let c=0 ; c<field[r].length;c++){
				field[r][c] = false;
			}
		}
		update();
	});
	
	create();
}

function create() {
	let cols = $('[name = "columns"]').val(), 
		rows = $('[name = "rows"]').val();
	field = [];
	$("#field").empty();
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
	$("#field td").on("click", evt=>{
		console.log(evt.target);
		let col=evt.target.parentElement.rowIndex;
		let row = evt.target.cellIndex ;
		console.log(col, row);
		field[col][row]= !field[col][row];
		update();
	});	
}

function update(){
	for (let r =0 ; r<field.length; r++){
		let tr = $("#field tr")[r];
		for(let c=0; c<field[r].length; c++){
			if (field[r][c]){
				$($(tr).children()[c]).addClass("selected"); 
			} else {
				$($(tr).children()[c]).removeClass("selected"); 
			}
		}
	}
}



function newState (){
	const tmp=[];
	for (let r=0 ; r<field.length ; r++){
		tmp.push([]);
		for (let c=0; c<field[r].length;c++){
			let l= countNeigbors(r,c);
			if (field[r][c]){
				if ( l ==2 || l == 3){
					tmp[r].push(true);
				} else {
					tmp[r].push(false);
				}
			} else {
				if (l == 3){
					tmp[r].push(true);
				} else{
					tmp[r].push(false);
				}
			}
		}
	}
	field = tmp.slice(0);
	
	function countNeigbors(r, c){
		let l = 0 ;
		for (let j=r-1; j<=r+1; j++){
			let j1=j;
			if (j==-1){
				j1=field.length -1;
			} else if (j == field.length){
				j1=0;
			}

			for (let i= c-1; i<=c+1 ; i++){
				let i1= i;
				if (i==-1){
					i1=field[r].length -1;
				} else if (i == field[r].length){
					i1=0;
				}

				if(j1==r && i1==c){
					continue;
				}
				if (field[j1][i1]){
					l+=1;
				}
			}
		}
		return l;
	}
}

