sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/BindingMode"
], function (BaseController, JSONModel, Device, BindingMode) {
	"use strict";

	return BaseController.extend("com.incture.NewProductIntroduction_UI.Kpireports.controller.Changehistory", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		onInit: function () {
			var oThisController = this;
			oThisController.closeBusyDialog();
			oThisController.fngetHistoryData();
			this._oRouter = this.getRouter();
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "/bpmworkflowruntime/v1/xsrf-token", false);
			xhr.setRequestHeader("X-CSRF-Token", "Fetch");
			xhr.onreadystatechange = function () {
				oThisController.oHeader = {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"x-csrf-token": xhr.getResponseHeader("X-CSRF-Token")
				};
			};
			xhr.send(null);
			this._oRouter.attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "Changehistory") {
					oThisController.closeBusyDialog();
				}
			}, this);

		},
		
		fngetHistoryData: function () {
			var oThisController = this;
			var oMdlCommon = this.getParentModel("mCommon");
			var data = $.extend(true, [], oMdlCommon.getProperty("/ProductCollection"));
			var newData = {};
			var j = 201;
			for (var i = 91001275; i < 91002274; i++) {
				j = j + 1;
				newData = {
					"ProjectId": "" + j,
					"ProductId": "" + i,
					"fieldName": "UOM",
					"newValue": "KG",
					"oldValue": "",
					"updatedBy": "Rohit",
					"updatedOn": "Sep 0" + i % 10 + " 2020 " + i % 10 + ":01:37"
				};
				data.push(newData);
				i++;
				newData = {
					"ProjectId": "" + j,
					"ProductId": "" + i,
					"fieldName": "UOM",
					"newValue": "EA",
					"oldValue": "KG",
					"updatedBy": "Rohit",
					"updatedOn": "Sep 0" + i % 10 + " 2020 " + i % 10 + ":04:30"
				};
				data.push(newData);
				i++;
				newData = {
					"ProjectId": "" + j,
					"ProductId": "" + i,
					"fieldName": "Qty",
					"newValue": i % 10,
					"oldValue": "",
					"updatedBy": "Manish",
					"updatedOn": "Sep 0" + i % 10 + " 2020 " + i % 10 + ":09:46"
				};
				data.push(newData);
			}

			oMdlCommon.setProperty("/ProductCollection", data);
			oMdlCommon.setProperty("/aHistoryBckup", data);
			// oModel.setData(data);
			// return oModel;
			var oTable = this.getView().byId("table");
			var aRows = oTable.getRows();
			if (aRows && aRows.length > 0) {
				var pRow = {};
				for (i = 0; i < aRows.length; i++) {
					if (i > 0) {
						var pCell = pRow.getCells()[0],
							cCell = aRows[i].getCells()[0];
						if (cCell.getText() === pCell.getText()) {
							$("#" + cCell.getId()).css("visibility", "hidden");
							$("#" + pRow.getId() + "-col0").css("border-bottom-style", "hidden");
						}
					}
					pRow = aRows[i];
				}
			}
		},

		onExport: function (oEvent) {
			var oThisController = this;
			var oMdlCommon = oThisController.getParentModel("mCommon");
			var data = $.extend(true, [], oMdlCommon.getProperty("/ProductCollection"));
			// var data = this.oModel.getData();
			oThisController.JSONToCSVConvertor(data, "Change Log", true);
		},

		JSONToCSVConvertor: function (JSONData, ReportTitle, ShowLabel) {
			//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
			var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
			// arrData = arrData.ProductCollection;
			var CSV = '';
			//Set Report title in first row or line

			// CSV += ReportTitle + '\r\n\n';

			//This condition will generate the Label/Header
			if (ShowLabel) {
				var row = "";

				//This loop will extract the label from 1st index of on array
				for (var index in arrData[0]) {

					//Now convert each value to string and comma-seprated
					row += index + ',';
				}

				row = row.slice(0, -1);

				//append Label row with line break
				CSV += row + '\r\n';
			}

			//1st loop is to extract each row
			for (var i = 0; i < arrData.length; i++) {
				var row = "";

				//2nd loop will extract each column and convert it in string comma-seprated
				for (var index in arrData[i]) {
					row += '"' + arrData[i][index] + '",';
				}

				row.slice(0, row.length - 1);

				//add a line break after each row
				CSV += row + '\r\n';
			}

			if (CSV == '') {
				console.lo("Invalid data");
				return;
			}

			//Generate a file name
			var fileName = "";
			//this will remove the blank-spaces from the title and replace it with an underscore
			fileName += ReportTitle.replace(/ /g, "_");

			//Initialize file format you want csv or xls
			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

			// Now the little tricky part.
			// you can use either>> window.open(uri);
			// but this will not work in some browsers
			// or you will not get the correct file extension    

			//this trick will generate a temp <a /> tag
			var link = document.createElement("a");
			link.href = uri;

			//set the visibility hidden so it will not effect on your web-layout
			link.style = "visibility:hidden";
			link.download = fileName + ".csv";

			//this part will append the anchor tag and remove it after automatic click
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},

		onPressChangeLog: function (oEvent) {
			if (!this.changeDialog) {
				this.changeDialog = sap.ui.xmlfragment("com.incture.NewProductIntroduction_UI.Kpireports.fragments.changeLog", this);
				this.getView().addDependent(this.changeDialog);
				this.changeDialog.open();
			} else {
				this.changeDialog.open();
			}
			// sap.ui.getCore().byId("table1").setVisible("true");
			// sap.ui.getCore().byId("table2").setVisible("false");
			// sap.ui.getCore().byId("table3").setVisible("false");
		},
		onCloseChange: function (oEvent) {
			sap.ui.getCore().byId("table1").setVisible(true);
			sap.ui.getCore().byId("table2").setVisible(false);
			sap.ui.getCore().byId("table3").setVisible(false);
			sap.ui.getCore().byId("backbutton").setVisible(false);
			this.changeDialog.close();
		},
		showChangeLogColumn: function (oEvent) {
			var index = oEvent.getSource().getParent().getIndex();
			sap.ui.getCore().byId("table1").setVisible(false);
			if (index === 0) {
				sap.ui.getCore().byId("table2").setVisible(true);
			} else {
				sap.ui.getCore().byId("table3").setVisible(true);
			}
			sap.ui.getCore().byId("backbutton").setVisible(true);
		},
		onCloseColumnChange: function (oEvent) {
			sap.ui.getCore().byId("table1").setVisible(true);
			sap.ui.getCore().byId("table2").setVisible(false);
			sap.ui.getCore().byId("table3").setVisible(false);
			sap.ui.getCore().byId("backbutton").setVisible(false);
		},

		onHistoreySearch: function (oEvent) {
			var oThisController = this;
			var oMdlCommon = this.getParentModel("mCommon");
			var oFilterParam = oMdlCommon.getProperty("/oFilterHistoryParam");
			// oThisController.openBusyDialog();
			// var sQuery = oEvent.getParameter("newValue");
			var oTable = this.byId("table");
			var oBinding = oTable.getBinding("rows");

			var aPropertyFilterSettings = [];
			if (oFilterParam.sProjectNo) {
				let oRowProjNo = {
					propertyName: "ProjectId",
					filterOperator: "Contains",
					propertyValue: oFilterParam.sProjectNo
				}
				aPropertyFilterSettings.push(oRowProjNo);
			}
			if (oFilterParam.sMaterialNo) {
				let oRowMatNo = {
					propertyName: "ProductId",
					filterOperator: "Contains",
					propertyValue: oFilterParam.sMaterialNo
				}
				aPropertyFilterSettings.push(oRowMatNo);
			}
			if (oFilterParam.sUpdatedBy) {
				let oRowUpdateby = {
					propertyName: "updatedBy",
					filterOperator: "Contains",
					propertyValue: oFilterParam.sUpdatedBy
				}
				aPropertyFilterSettings.push(oRowUpdateby)
			}
			this.fnApplyCustomerFilter(aPropertyFilterSettings, oBinding, false);
			// oThisController.closeBusyDialog();
		},

		onClear: function () {
			var oThisController = this;
			var oMdlCommon = this.getParentModel("mCommon");
			var aHistoryBckup = oMdlCommon.getProperty("/aHistoryBckup");
			oMdlCommon.setProperty("/ProductCollection", aHistoryBckup);
			var oTable = this.byId("table");
			var oBinding = oTable.getBinding("rows");
			var aPropertyFilterSettings = [];
			this.fnApplyCustomerFilter(aPropertyFilterSettings, oBinding, false);
			oMdlCommon.setProperty("/oFilterHistoryParam/sProjectNo", "");
			oMdlCommon.setProperty("/oFilterHistoryParam/sMaterialNo", "");
			oMdlCommon.setProperty("/oFilterHistoryParam/sUpdatedBy", "");
			oMdlCommon.refresh();
		}

		// onSearch: function () {
		// 	var oThisController = this;
		// 	oThisController.openBusyDialog();
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	var sUserID = oMdlCommon.getProperty("/UserId");
		// 	var oSearchParams = $.extend(true, {}, oMdlCommon.getProperty("/oSearchParam"))
		// 	var sUrl = "";

		// 	try {
		// 		sUrl = "/npiservices/npi/report/audit?materialId=" + oSearchParams.sMaterial;
		// 		var oPayload = {
		// 			"attribute": "",
		// 			"newValue": "",
		// 			"oldValue": "",
		// 			"updatedBy": sUserID,
		// 			"updatedOn": new Date().toISOString()
		// 		};

		// 	} catch (e) {
		// 		oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
		// 		oThisController.closeBusyDialog();
		// 	}

		// 	oThisController.fnProcessDataRequest(sUrl, "POST", oThisController.oHeader, false, function (oXHR, status) {
		// 		try {
		// 			if (status === "success") {
		// 				if (oXHR.status === 200 && oXHR.statusText === "OK") {
		// 					var aChangeHistory = $.extend(true, [], oXHR.responseJSON);
		// 					// oMdlCommon.setProperty("/aSearchMaterial", oXHR.responseJSON);
		// 					for (let i = 0; i < aChangeHistory.length; i++) {
		// 						aChangeHistory[i].updatedOn = new Date(aChangeHistory[i].updatedOn);

		// 					}
		// 					oMdlCommon.setProperty("/aSearchMaterial", aChangeHistory);
		// 					oThisController.closeBusyDialog();
		// 				}
		// 			} else {
		// 				oThisController.showMessage(oThisController.getMessage("REQUEST_OPERATION_FAILED"), "E");
		// 				oThisController.closeBusyDialog();
		// 			}
		// 		} catch (e) {
		// 			oThisController.showMessage(oThisController.getMessage("EXCEPTION"), "E");
		// 			oThisController.closeBusyDialog();
		// 		}
		// 	}, oPayload);
		// 	oMdlCommon.refresh();
		// 	// var aMatchValue = oMdlCommon.getProperty("/aChangeHistory");
		// 	// oMdlCommon.setProperty("/aSearchMaterial", aMatchValue);
		// 	oMdlCommon.refresh();
		// 	oThisController.closeBusyDialog();
		// },

		// onClearFilter: function () {
		// 	var oThisController = this;
		// 	oThisController.openBusyDialog();
		// 	var oMdlCommon = this.getParentModel("mCommon");
		// 	oMdlCommon.setProperty("/oSearchParam/sPlant", "");
		// 	oMdlCommon.setProperty("/oSearchParam/sMaterial", "");
		// 	oMdlCommon.setProperty("/oSearchParam/sSalesorg", "");
		// 	oMdlCommon.setProperty("/oSearchParam/sWareHourse", "");
		// 	oMdlCommon.setProperty("/aSearchMaterial", []);
		// 	oMdlCommon.refresh();
		// 	oThisController.closeBusyDialog();
		// }

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.incture.NewProductIntroduction_UI.Kpireports.view.Changehistory
		 */
		//	onExit: function() {
		//
		//	}

	});

});