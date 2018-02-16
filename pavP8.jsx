/*
Description:
This script is a template script that will
open and process a folder of images
*/

// enable double clicking from the 
// Macintosh Finder or the Windows Explorer

// Make Photoshop the frontmost application
// in case we double clicked the file
app.bringToFront();

/////////////////////////
// SETUP
/////////////////////////


cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };


// A list of file extensions to skip, keep them lower case
gFilesToSkip = Array( "db", "xmp", "thm", "txt", "doc", "md0", "tb0", "adobebridgedb", "adobebridgedbt", "bc", "bct" );

/////////////////////////
// MAIN
/////////////////////////

// Pops open a dialog for the user to
// choose the folder of documents to process
var inputFolder = Folder.selectDialog("Select a folder of documents to process");
alert(inputFolder)

// Pops open a dialog for the user to
// set the output folder
var outputFolder = Folder.selectDialog("Select a folder for the output files");

// Open Folder of Images
OpenFolder();

// show the path to an output folder
alert(outputFolder);

/////////////////////////
// FUNCTIONS
/////////////////////////

// Given the a Folder of files, open them





function OpenFolder() {
    var map_array = {
    "top_front": ["", "01", "", "3"],
    "top_back": ["1", "02", "1", "7"],
    "top_full_front": ["4", "04", "2", "2"],
    "top_full_back": ["6", "06", "6", "4"],
    "top_extra_top": ["5", "05", "5", "6"],
    "top_extra_middle": ["7", "07", "7", "8"],
    "top_extra_bottom": ["8", "08", "8", "9"],
    "top_product_front": ["2", "00", "3", "1"],
    "top_product_back": ["9", "09", "9", "10"],
    "top_product_zoom": ["3", "03", "4", "5"],
 
    "bottom_front": ["4", "04", "4", "3"],
    "bottom_back": ["6", "06", "6", "7"],
    "bottom_full_front": ["", "01", "", "2"],
    "bottom_full_back": ["1", "02", "1", "4"],
    "bottom_extra_top": ["5", "05", "5", "6"],
    "bottom_extra_middle": ["7", "07", "7", "8"],
    "bottom_extra_bottom": ["8", "08", "8", "9"],
    "bottom_product_front": ["2", "00", "2", "1"],
    "bottom_product_back": ["9", "09", "9", "10"],
    "bottom_product_zoom": ["3", "03", "3", "5"],
    "dress_front": ["4", "04", "4", "3"],
    "dress_back": ["6", "06", "6", "7"],
    "dress_full_front": ["", "01", "", "2"],
    "dress_full_back": ["1", "02", "1", "4"],
    "dress_extra_top": ["5", "05", "5", "6"],
    "dress_extra_middle": ["7", "07", "7", "8"],
    "dress_extra_bottom": ["8", "08", "8", "9"],
    "dress_product_front": ["2", "00", "2", "1"],
    "dress_product_back": ["9", "09", "9", "10"],
    "dress_product_zoom": ["3", "03", "3", "5"]
    };

    var filesOpened = 0;
    var folderList1 = inputFolder.getFiles();
    for (var i = 0; i < folderList1.length; i++) {
        if (folderList1[i] instanceof Folder) {
            var folderList2 = folderList1[i].getFiles();

            for (var j = 0; j < folderList2.length; j++) {
                if (folderList2[j] instanceof Folder) {
                   // alert(folderList2[j].name);
                    //alert( map_array[folderList2[j].name]);
                    var fileList = folderList2[j].getFiles();
                    for (var k = 0; k < fileList.length; k++) {
                        // Make sure all the files in the folder are compatible with PS
                        if (fileList[k] instanceof File && !fileList[k].hidden && !IsFileOneOfThese(fileList[k], gFilesToSkip)) {
                            open(fileList[k]);
                            filesOpened++;

                            /////////////////////////
                            // Put all your processing functions...
                            /////////////////////////


                            var doc = app.activeDocument;
                            var name = app.activeDocument.name
                            if (doc.width == doc.height) {
                                
                                rename_file(map_array[folderList2[j].name])
                                
                            } else {
                                alert("doc not equal");
                            }
                            // Cloes the file without saving
                            doc.close(SaveOptions.DONOTSAVECHANGES);

                            /////////////////////////
                            // ...in the area between these two comments.
                        }
                    }
                }
            } /////////////////////////




        }
    }

    alert(filesOpened)
    return filesOpened;
}




// given a file name and a list of extensions
// determine if this file is in the list of extensions
function IsFileOneOfThese( inFileName, inArrayOfFileExtensions ) {
    var lastDot = inFileName.toString().lastIndexOf( "." );
    if ( lastDot == -1 ) {
        return false;
    }
    var strLength = inFileName.toString().length;
    var extension = inFileName.toString().substr( lastDot + 1, strLength - lastDot );
    extension = extension.toLowerCase();
    for (var i = 0; i < inArrayOfFileExtensions.length; i++ ) {
        if ( extension == inArrayOfFileExtensions[i] ) {
            return true;
        }
    }
    return false;
}

function getName(filename, code){
        filename = filename.split(".")[0]
        filename = filename.split("_")[0]
        return filename + (code==""?"":"_" + code)
     }


function rename_file(array_codes){
        filename = app.activeDocument.name
        if(app.activeDocument.pathItems.length == 0){
                alert("No Path");
                return;
        }
        d_name =  getName(filename, array_codes[0])
        h_name =  getName(filename, array_codes[1])
        j_name =  getName(filename, array_codes[2])
        k_name =  getName(filename, array_codes[3])

        Models(d_name);
        if(app.activeDocument.width == app.activeDocument.height){

            KarstadtModels(k_name);
            if(app.activeDocument.width == app.activeDocument.height){
                HouseofFraser_JohnLewis(j_name, h_name);
            }
        }
        
 }



function Models(newName) {
  // Select
  newName = newName + ".jpg"
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), "Background");
    desc1.putReference(cTID('null'), ref1);
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(1);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  // Delete
  function step2(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var list1 = new ActionList();
    list1.putInteger(1);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('Dlt '), desc1, dialogMode);
  };

  // Make
  function step3(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Lyr '));
    desc1.putReference(cTID('null'), ref1);
    desc1.putInteger(cTID('LyrI'), 37);
    executeAction(cTID('Mk  '), desc1, dialogMode);
  };

  // Move
  function step4(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Prvs'));
    desc1.putReference(cTID('T   '), ref2);
    executeAction(cTID('move'), desc1, dialogMode);
  };

  // Select
  function step5(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Frwr'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("addToSelection"));
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(37);
    list1.putInteger(17);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  // Select
  function step6(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Frwr'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("addToSelection"));
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(37);
    list1.putInteger(19);
    list1.putInteger(17);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  // Merge Layers
  function step7(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    executeAction(sTID('mergeLayersNew'), desc1, dialogMode);
  };

  // Set
  function step8(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('Al  '));
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  // Align
  function step9(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID("ADSCentersH"));
    executeAction(cTID('Algn'), desc1, dialogMode);
  };

  // Export
  function step10(enabled, withDialog) {

    SaveForJPG(new File(outputFolder+"/d/" + "54510_" + newName))
  };

  // Set
  function step11(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  // Select
  function step12(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Path'), "UN");
    desc1.putReference(cTID('null'), ref1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  // Set
  function step13(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Path'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('T   '), ref2);
    desc1.putInteger(cTID('Vrsn'), 1);
    desc1.putBoolean(sTID("vectorMaskParams"), true);
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  // Crop
  function step14(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(cTID('Dlt '), true);
    executeAction(cTID('Crop'), desc1, dialogMode);
  };

  // Align
  function step15(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID("ADSCentersH"));
    executeAction(cTID('Algn'), desc1, dialogMode);
  };

  // Image Size
  function step16(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Hght'), cTID('#Pxl'), 2000);
    desc1.putBoolean(sTID("scaleStyles"), true);
    desc1.putBoolean(cTID('CnsP'), true);
    desc1.putEnumerated(cTID('Intr'), cTID('Intp'), sTID("automaticInterpolation"));
    executeAction(sTID('imageSize'), desc1, dialogMode);
  };

  // If
  

  step1();      // Select
  step2();      // Delete
  step3();      // Make
  step4();      // Move
  step5();      // Select
  step6();      // Select
  step7();      // Merge Layers
  step8();      // Set
  step9(false, false);      // Align
  step10();      // Export
  step11();      // Set
  step12();      // Select
  step13();      // Set
  step14();      // Crop
  step15(false, false);      // Align
  step16();      // Image Size
      // If
};




function KarstadtModels(newName) {
  // Export
  function step1(enabled, withDialog) {
        SaveForJPG(new File(outputFolder+"/k/" + newName + ".jpg"))

  };


  step1();      // Export      // If
};




function HouseofFraser_JohnLewis(jnewName, hnewName) {
  // Canvas Size
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Wdth'), cTID('#Pxl'), 1500);
    desc1.putEnumerated(cTID('Hrzn'), cTID('HrzL'), cTID('Cntr'));
    executeAction(sTID('canvasSize'), desc1, dialogMode);
  };

  // Export
  function step2(enabled, withDialog) {
    SaveForJPG(new File(outputFolder+"/h/" + hnewName + ".jpg"))
  };

  // Flatten Image
  function step3(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    executeAction(sTID('flattenImage'), undefined, dialogMode);
  };

  // Save
  function step4(enabled, withDialog) {
    /*if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(cTID('BytO'), cTID('Pltf'), cTID('Mcnt'));
    desc2.putBoolean(sTID("LZWCompression"), true);
    desc1.putObject(cTID('As  '), sTID("TIFFFormat"), desc2);
    desc1.putPath(cTID('In  '), new File(outputFolder+"/j/"));
    desc1.putInteger(cTID('DocI'), 4104);
    desc1.putBoolean(cTID('LwCs'), true);
    executeAction(cTID('save'), desc1, dialogMode);*/
   SaveTIFF(new File(outputFolder+"/j/" + jnewName))
  };

  step1();      // Canvas Size
  step2();      // Export
  step3();      // Flatten Image
  step4();      // Save
};




function SaveTIFF(saveFile){  
tiffSaveOptions = new TiffSaveOptions();   
tiffSaveOptions.embedColorProfile = true;   
tiffSaveOptions.alphaChannels = true;   
tiffSaveOptions.layers = true;  
tiffSaveOptions.imageCompression = TIFFEncoding.JPEG;  
tiffSaveOptions.jpegQuality=10;  
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE);   
}  


function SaveForJPG(saveFile) {  
var sfwOptions = new ExportOptionsSaveForWeb();   
   sfwOptions.format = SaveDocumentType.JPEG;   
   sfwOptions.includeProfile = false;   
   sfwOptions.interlaced = 0;   
   sfwOptions.optimized = true;   
   sfwOptions.quality = 70   
activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);  
}  
