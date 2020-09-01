sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/BindingMode",
	"com/incture/NewProductIntroduction_UI/Kpireports/Utility/InitPage"
], function (BaseController, JSONModel, Device, BindingMode, InitPageUtil) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.Reports", {

		oVizFrame: null,

		onInit: function () {
			// var oThisController = this;
			// var oMdlCommon = oThisController.getParentModel("mCommon");
			// oThisController.getView().setModel(oMdlCommon);

			// var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrameHours");
			// oVizFrame.setVizProperties({
			// 	valueAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	},
			// 	categoryAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	},
			// 	plotArea: {
			// 		dataPointStyle: {
			// 			"rules": [{
			// 				"dataContext": {
			// 					"Week": "Basic Data"
			// 				},
			// 				"properties": {
			// 					"color": "#ed8da7"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "MRP"
			// 				},
			// 				"properties": {
			// 					"color": "#73bef0"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "FI/CO"
			// 				},
			// 				"properties": {
			// 					"color": "#f7dd86"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "QM"
			// 				},
			// 				"properties": {
			// 					"color": "#7ad3d3"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "Warehouse"
			// 				},
			// 				"properties": {
			// 					"color": "#b694ff"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "Sales Org"
			// 				},
			// 				"properties": {
			// 					"color": "#f2ba73"
			// 				}
			// 			}]
			// 		}
			// 	},
			// 	title: {
			// 		visible: false
			// 	}
			// });
			// var oPopOver = this.getView().byId("idPopOver");
			// oPopOver.connect(oVizFrame.getVizUid());

			// var oVizFrameSecond = this.oVizFrame = this.getView().byId("idVizFramesecond");
			// oVizFrameSecond.setVizProperties({
			// 	valueAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	},
			// 	categoryAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	},
			// 	plotArea: {
			// 		dataPointStyle: {
			// 			"rules": [{
			// 				"dataContext": {
			// 					"Week": "Basic Data"
			// 				},
			// 				"properties": {
			// 					"color": "#b890a9"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "MRP"
			// 				},
			// 				"properties": {
			// 					"color": "#72bedf"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "FI/CO"
			// 				},
			// 				"properties": {
			// 					"color": "#cd9987"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "QM"
			// 				},
			// 				"properties": {
			// 					"color": "#7ad3d3"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "Warehouse"
			// 				},
			// 				"properties": {
			// 					"color": "#b1fdd8"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "Sales Org"
			// 				},
			// 				"properties": {
			// 					"color": "#877aff"
			// 				}
			// 			}]
			// 		}
			// 	},
			// 	title: {
			// 		visible: false
			// 	}
			// });
			// var oPopOverSecond = this.getView().byId("idPopOverSecond");
			// oPopOverSecond.connect(oVizFrameSecond.getVizUid());

			// var oVizFrameThird = this.oVizFrame = this.getView().byId("idVizFrameThird");
			// oVizFrameThird.setVizProperties({
			// 	valueAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	},
			// 	categoryAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	},
			// 	plotArea: {
			// 		dataPointStyle: {
			// 			"rules": [{
			// 				"dataContext": {
			// 					"Week": "Basic Data"
			// 				},
			// 				"properties": {
			// 					"color": "#8990a9"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "MRP"
			// 				},
			// 				"properties": {
			// 					"color": "#80def1"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "FI/CO"
			// 				},
			// 				"properties": {
			// 					"color": "#f8ddb5"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "QM"
			// 				},
			// 				"properties": {
			// 					"color": "#cfd3d3"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "Warehouse"
			// 				},
			// 				"properties": {
			// 					"color": "#b46cff"
			// 				}
			// 			}, {
			// 				"dataContext": {
			// 					"Week": "Sales Org"
			// 				},
			// 				"properties": {
			// 					"color": "#ec856e"
			// 				}
			// 			}]
			// 		}
			// 	},
			// 	title: {
			// 		visible: false
			// 	}
			// });
			// var oPopOverThird = this.getView().byId("idPopOverThird");
			// oPopOverThird.connect(oVizFrameThird.getVizUid());

			// var oVizFrameArea = this.oVizFrame = this.getView().byId("idVizFrameArea");
			// oVizFrameArea.setVizProperties({
			// 	valueAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	},
			// 	categoryAxis: {
			// 		title: {
			// 			visible: false
			// 		}
			// 	}
			// });
			// var oPopOverArea = this.getView().byId("idPopOverArea");
			// oPopOverArea.connect(oVizFrameArea.getVizUid());

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Reports
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Reports
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Reports
		 */
		//	onExit: function() {
		//
		//	}

	});

});