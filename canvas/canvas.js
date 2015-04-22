// initialize fabric canvas and assign to global windows object for debug
var canvas = window._canvas = new fabric.Canvas('myCanvas');
canvas.setBackgroundColor('rgb(248,248,248)', canvas.renderAll.bind(canvas));

document.onkeydown = function(e) {
    if(e.keyCode == 68) {
        if(canvas.getActiveGroup()){
            canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
            canvas.discardActiveGroup().renderAll();
        } 
        else {
            canvas.remove(canvas.getActiveObject());
        }
    }
    
    if(e.keyCode == 27) {
        $("#selection-mode").click();
    }
}

$("#pencil").click(function() {
  canvas.isDrawingMode = true;
});

$("#clear").click(function() {
    if(confirm("Are you sure you want to clear the canvas?") == true) {
        canvas.clear();
    }
});

$("#selection-mode").click(function() {
    canvas.isDrawingMode = false;
});

$("#circle-modal-confirm").click(function() {
    var radius = $("#circle-radius").val();
    
    if(isNaN(radius) || radius < 0) {
        alert("Invalid Input! Enter only positive integer.");
    }
    
    else {
        $('#canvas-circle-modal').modal('hide');
        var circle = new fabric.Circle({
            radius: parseInt(radius), 
            fill: 'none', 
            strokeWidth: 1, 
            stroke: 'rgb(0,0,0)'
        }); 
        canvas.centerObject(circle);
        canvas.add(circle);
    }
});

$("#delete-item").click(function() {
    alert("In order to delete items from the canvas, select one or multiple items and press the \"D\" key on the keyboard.");
});

$("#rectangle-modal-confirm").click(function() {
    var length = $("#rectangle-length").val();
    var width = $("#rectangle-width").val(); 
    
    if(isNaN(length) || length < 0 || isNaN(width) || width < 0) {
        alert("Invalid Input! Enter positive integers only.");
    }
    
    else {
        $('#canvas-rectangle-modal').modal('hide');
        var rect = new fabric.Rect({
            width: parseInt(width), 
            height: parseInt(length), 
            fill: 'none', 
            strokeWidth: 1, 
            stroke: 'rgb(0,0,0)'
        });
        canvas.centerObject(rect);
        canvas.add(rect);
    }
});

$("#triangle-modal-confirm").click(function() {
    var width = $("#triangle-width").val();
    var height = $("#triangle-height").val(); 
    
    if(isNaN(width) || width < 0 || isNaN(height) || height < 0) {
        alert("Invalid Input! Enter positive integers only.");
    }
    
    else {
        $('#canvas-triangle-modal').modal('hide');
        var triangle = new fabric.Triangle({
            width: parseInt(width), 
            height: parseInt(height),  
            fill: 'none',
            strokeWidth: 1, 
            stroke: 'rgb(0,0,0)'
        });
        canvas.centerObject(triangle);
        canvas.add(triangle);
    }
});

$("#path-modal-confirm").click(function() {
    var command = new String();
    command = $("#path-command").val();
    
    if(command) {
        $('#canvas-path-modal').modal('hide');
        var path = new fabric.Path("'" + command + "'");
        path.set({ 
            fill: 'none',
            strokeWidth: 1,
            stroke: 'rgb(0,0,0)'
        });
        canvas.centerObject(path);
        canvas.add(path);
    }
    
    else {
        $('#canvas-path-modal').modal('hide');        
    }
});

$("#iText-font-dropdown").on('click', 'li a', function(){
    $(this).parent().parent().siblings(".btn:first-child").html($(this).text()+' <span class="caret"></span>');
    $(this).parent().parent().siblings(".btn:first-child").val($(this).text());
    
    $('#iText-font-dropdown').val($(this).text());
});

$("#iText-style-dropdown").on('click', 'li a', function(){
    $(this).parent().parent().siblings(".btn:first-child").html($(this).text()+' <span class="caret"></span>');
    $(this).parent().parent().siblings(".btn:first-child").val($(this).text());
    
    $('#iText-style-dropdown').val($(this).text());
});

$("#iText-align-dropdown").on('click', 'li a', function(){
    $(this).parent().parent().siblings(".btn:first-child").html($(this).text()+' <span class="caret"></span>');
    $(this).parent().parent().siblings(".btn:first-child").val($(this).text());
    
    $('#iText-align-dropdown').val($(this).text());
});

$("#iText-modal-confirm").click(function() {
    var size = $("#iText-size").val();
    var font = $('#iText-font-dropdown').val();
    var style = $('#iText-style-dropdown').val();
    var align = $('#iText-align-dropdown').val();
    var opacity = $("#iText-opacity").val();
    var text = $("#iText-text").val();
    
    if(isNaN(size) || size < 0 || isNaN(opacity) || opacity < 0 || opacity > 1) {
        alert("Invalid Input! Make sure that the size and opacity values are correct.");
    }
    
    else {
        
        if(typeof font === undefined || font === null || font === "") {
            font = "Trebuchet MS";   
        }
        
        if(typeof style === undefined || style === null || style === "" || style === "regular") {
            style = "";
        }
        
        if(typeof align === undefined || align === null || align === "") {
            align = "left";
        }

        $('#canvas-iText-modal').modal('hide');
        var iText = new fabric.IText("\"" + text + "\"", {
            editable: 'true',
            fontSize: parseInt(size),
            fontFamily: font,
            fontStyle: style,
            textAlign: align,
            opacity: opacity,
        });
        canvas.centerObject(iText);
        canvas.add(iText);
    }
});

$("#line-modal-confirm").click(function() {
    var coordinates = $("#line-coordinates").val();
    var res = coordinates.split(",");
    var index = 4;
    
    if(typeof res[3] === 'undefined' || res[3] === null || res[3] === "") {
        alert("Invalid Input! Make sure the input is in the form of \(x1,y1,x2,y2\)");  
    }
    
    if(isNaN(res[0]) || res[0] < 0 || isNaN(res[1]) || res[1] < 0 || isNaN(res[2]) || res[2] < 0 || isNaN(res[3]) || res[3] < 0) {
        alert("Invalid Input! Enter only positive coordinates.");
    }
    
    else { 
        $('#canvas-line-modal').modal('hide');
        var line = new fabric.Line([res[0],res[1],res[2],res[3]], {
        fill: 'none',
        strokeWidth: 1,
        stroke: 'rgb(0,0,0)',
        originX: 'center',
        originY: 'center'
    });
        canvas.centerObject(line);
        canvas.add(line);
    }
});

$("#save-svg-file").click(function() {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(canvas.toSVG()));
    pom.setAttribute('download', "filename.svg");
    pom.style.display = 'none';
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);
});

$("#save-png-file").click(function() {
    if(!window.localStorage){alert("This function is not supported by your browser."); return;}
    // to PNG
    window.open(canvas.toDataURL('png'));
});

$("#export-svg-file-jscut").click(function() {
	if(typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		localStorage.setItem("svgFile", canvas.toSVG());
		window.open("../jscut_standalone/jscut.html");
	} else {
		// Sorry! No Web Storage support..
		alert("Sorry! No Web Storage support. Unable to export SVG file.");
	}
});