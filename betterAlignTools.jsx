/*
				(C) Cuchulahn O'Byrne 2023 http://www.cuchulahn.com/

	This software is free forever. 
	If you paid for it, I'm sorry. 
	If your illegally resell it, you will be sealed in epoxy resin.
	This script is intended for educational purposes and support is not guarenteed.

I wrote this script around a year ago, so I'm a little rusty!

Some homework:
	https://www.youtube.com/watch?v=8pzWPQAScuc

*/

//This is were the main body of code is. At the end of this document, this function is called, which is how we let AE know we want it.
function betterAlignTools(thisObj) {

	//app.project.activeItem is how AE refers to whatever you have selected when you run the script.
	//It's more efficient to store in a variable for referencing instead of constantly calling it, so we do that below.

	if(app.project!=null){
		var comp = app.project.activeItem;
		var compHeight = app.project.activeItem.height;
		var compWidth = app.project.activeItem.width;
	}

	//Size of the buttons, I swear. We store this in case we want to change the size later on.
	var buttSize = 45;

	//The buildUI function is called to instantiate our buttons and such. BuildUI returns the UI object, so we commmit it to the pal variable.
	var pal = buildUI(this);
	//Then, we check if pal contains our UI, and if so, we display it.
	if(pal != null) {
		pal.show();
	}

	function buildUI(thisObj) {
		//Woah, look at that! 
		//It's not that messy though, once we break it down.
		//P is our new object. Then we assign P to thisObj, but first we ask if its a Panel, since it's what we need.
		//If it is a Panel, we assign it a new window. Palette is the type of window, "Better Align Tools" is its name, the panel size
		//(which we leave undefined since we'll adjust it at runtime), and a table that contains the attributes of the window.
		var p = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Better Align Tools", undefined, {resizeable:true});
		/* write this documentation some other time lmao */
		var res = 
					"group { \
						orientation:'column', alignment:['fill','top'], alignChildren:['left','top'], spacing:2, margins:[0,0,0,0], \
						btns: Group { \
							orientation:'column', alignment:['fill','top'], \
							upBtn: Button { text:'↑', alignment:['fill','top'] }, \
							leftBtn: Button { text:'←', alignment:['fill','top'] }, \
							centerBtn: Button { text:'+', alignment:['fill','top'] }, \
							rightBtn: Button { text:'→', alignment:['fill','top'] }, \
							btmBtn: Button { text:'↓', alignment:['fill','top'] }, \
						}, \
						creditStr: StaticText { text:'© Cuchulahn O Byrne', alignment:['center','center'] }, \
					}";
		
		//Create a group that holds all the buttons
		p.grp = p.add(res);
		//Super important! Here we assign our button's click function to one we can write ourselves.
		p.grp.btns.upBtn.onClick = upAlignFun;
		p.grp.btns.btmBtn.onClick = btmAlignFun;
		p.grp.btns.leftBtn.onClick = leftAlignFun;
		p.grp.btns.rightBtn.onClick = rightAlignFun;

		/*
		These are graphics functions, but they aren't working for some reason :<
		var winGfx = p.graphics;
		var darkColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [.2, 1, 0], .5);
		p.grp.graphics.bgColor = darkColorBrush;

		p.grp.btns.graphics.foregroundColor = darkColorBrush;

		*/

		p.grp.btns.centerBtn.onClick = function(){cenXAlignFun();cenYAlignFun();};
		p.onResizing = p.onResize = function() {this.layout.resize();}
		
				
		return p;
	}

	//All of these functions are the same, just listening to different buttons. 
	//If I rewrote this again, I would create a function that handles all these with 
	//an argument for the transform and call that instead of recreating the function each time
	function upAlignFun() {
		//Get active item
		var d = app.project.activeItem;
		//Get selected layer in activeItem
		var l = d.selectedLayers[0];
		//Save the position of the axis we are NOT effecting
		var oldf = l.property("Position").value[0];
		//l.property("Position").value[0].setValue([0, 0]);
		//Set new position, using the old X position and new Y position
		l.transform.position.setValue([oldf, 0]);
	}
	function btmAlignFun() {
		var d = app.project.activeItem;
		var l = d.selectedLayers[0];
		var oldf = l.property("Position").value[0];
		//l.property("Position").value[0].setValue([0, 0]);
		l.transform.position.setValue([oldf, compHeight]);
	}
	function leftAlignFun() {
		var d = app.project.activeItem;
		var l = d.selectedLayers[0];
		var oldf = l.property("Position").value[1];
		//l.property("Position").value[0].setValue([0, 0]);
		l.transform.position.setValue([0, oldf]);
	}
	function rightAlignFun() {
		var d = app.project.activeItem;
		var l = d.selectedLayers[0];
		var oldf = l.property("Position").value[1];
		l.transform.position.setValue([compWidth, oldf]);
	}
	function cenXAlignFun() {
		var d = app.project.activeItem;
		var l = d.selectedLayers[0];
		var oldf = l.property("Position").value[1];
		l.transform.position.setValue([compWidth/2, oldf]);
	}
	function cenYAlignFun() {
		var d = app.project.activeItem;
		var l = d.selectedLayers[0];
		var oldf = l.property("Position").value[0];
		l.transform.position.setValue([oldf, compHeight/2]);
	}
}

betterAlignTools(this);