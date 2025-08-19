sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        UploadExcelFrontend: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
