/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"newproductintroductionui/newproductintroductionui/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});