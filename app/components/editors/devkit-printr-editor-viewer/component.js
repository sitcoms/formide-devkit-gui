var fs 		= require('fs-extra');
var path 	= require('path');

app.controller("viewerController", function( $scope, $rootScope, $timeout, $http, $q, $events ){
    // console.log('file', $rootScope.file);
    //
    // $scope.viewerConfig =
	// {
    //     "init": [
    //         {
    //             name: "setIdleRotationTimeout",
    //             args: [false]
    //         },
    //         {
    //             name: "enableSmoothAnimation",
    //             args: [true]
    //         },
    //         {
    //             name: "setLightColor",
    //             args: [255, 254, 250]
    //         },
    //         {
    //             name: "setBackgroundColor",
    //             args: [255, 255, 255]
    //         },
    //         {
    //         	name: "showPrintBed",
    //         	args: [true, 'xyz'],
    //             timeout: 500
    //         }
    //     ]
    // };
    //
    // var json = [
    //     {
    //         name: "addModel",
    //         args: [$scope.file.path],
    //         callbackFunctions: [
    //             {
    //                 name: "setModelColor",
    //                 args: ['{newId}', 100, 100, 100]
    //             },
    //             {
    //                 name: "zoomToFit",
    //                 args: []
    //             }
    //         ]
    //     }
    // ];
    //
    // // if(modelCounter > 0) {
    // //     json[0].callbackFunctions.push({
    // //         name: "removeAllModels",
    // //         args: []
    // //     });
    // // }
    //
    // $timeout(function() {
    // 	appendCalls(json);
    // 	console.log('called', json);
    // }, 5000);


    $scope.appFunction = function () {
    	var self = this;

        this.init = function() {
            formideSDK.setBackgroundColor({ r: 255, g: 255, b: 255 });

			// if($routeParams.childRoute !== undefined) {
				formideSDK.addModel({
					url: $scope.file.path
				}, function(response, err) {
                    console.log('response added model', response);
					var settings = JSON.parse(localStorage.getItem('formide.viewer:settings'));
					formideSDK.setModelColor({ modelId: response.modelId, r: settings.defaultModelColor.r, g: settings.defaultModelColor.g, b: settings.defaultModelColor.b });
		    	});
			// }
    	}
    };


    $scope.appSettings = {
		models: {
            xyzprinter: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/simplePrinter.dae",
            deltaprinter: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/deltaPrinter.dae",
            attachmentPoint: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/attachmentPoint.dae",
            scalePivot: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/scalePivot.obj",
            translatePivot: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/translatePivot.obj",
            rotatePivot: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/rotatePivot.obj",
            ruler: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/ruler.obj",
            rotationRuler: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/models/rulerRotation.obj"
        },
        materials: {
            scalePivot: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/materials/scalePivot.mtl",
            translatePivot: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/materials/translatePivot.mtl",
            rotatePivot: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/materials/rotatePivot.mtl",
            ruler: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/materials/ruler.mtl",
            virtualGrid: "./app/components/editors/devkit-printr-editor-viewer/dependencies/data/materials/virtualGrid.tga"
        }
    };
});
