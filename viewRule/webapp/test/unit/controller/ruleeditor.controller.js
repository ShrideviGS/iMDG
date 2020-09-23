/*global QUnit*/

sap.ui.define([
	"viewRule/viewRule/controller/ruleeditor.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ruleeditor Controller");

	QUnit.test("I should test the ruleeditor controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});