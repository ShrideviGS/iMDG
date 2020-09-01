/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/incture/NewProductIntroduction_UI/Kpireports/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});