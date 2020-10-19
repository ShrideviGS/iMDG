/*global QUnit*/

sap.ui.define([
	"inbox/inbox/controller/inbox.controller"
], function (Controller) {
	"use strict";

	QUnit.module("inbox Controller");

	QUnit.test("I should test the inbox controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});