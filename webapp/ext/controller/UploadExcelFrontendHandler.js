sap.ui.define([
    "sap/m/MessageToast",
    "./FileUploadHelper"
], function(MessageToast, FileUploadHelper) {
    'use strict';

    return {
        UploadExcelFrontend: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");
            debugger;
            var oBindingContext = this._routing.getView().getBindingContext("ui")
            var oActionODataContextBinding = this.getModel().bindContext("/UploadExcel(...)", oBindingContext)
            //var oActionODataContextBinding = this.getModel().bindContext("UploadExcel(...)", oBindingContext)
            //var oActionODataContextBinding = this.getModel().bindContext("com.sap.gateway.srvd.zui_cr82_excel_upload.v0001.UploadExcel(...)")
            //var oActionODataContextBinding = this.getModel().bindContext("/UploadExcel(...)")
            oActionODataContextBinding.execute().then(
                function() {
                    var oActionContext = oActionODataContextBinding.getBoundContext();
                    console.table(oActionContext.getObject().value);
                }.bind(this)
            );


            FileUploadHelper._callUploadDialog("Titulo do Popup", function (sFilename, sFileBase64) {
                debugger;
                FileUploadHelper._callAction(
                    this._controller.extensionAPI,
                    "/UploadExcel",
                    {
                        "file_name": sFilename,
                        "file_base64": sFileBase64
                    },
                    function (data) {
                        this.templateBaseExtension.getExtensionAPI().refreshTable();
                    }.bind(this)
                );
            }.bind(this));            

        }
    }
});
