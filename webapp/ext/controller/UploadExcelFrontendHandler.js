sap.ui.define([
    "sap/m/MessageToast",
    "./FileUploadHelper",
    "./ShowMessagesHelper"
], function(MessageToast, FileUploadHelper, ShowMessagesHelper) {
    'use strict';

    return {
        UploadExcelFrontend: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");

            // Pra lembrar como pegar o ID do Action
            //ExtAPI.getModel().oMetaModel.mContexts["/ZC_CR82_T_EXCEL_UP/com.sap.gateway.srvd.zui_cr82_excel_upload.v0001.UploadExcel"]



            let ExtAPI = this._controller.getExtensionAPI();
            debugger;
            
            FileUploadHelper.callUploadDialog("Titulo do Popup", function (sFilename, sFileBase64) {
                debugger;
                let oActionODataContextBinding = this.getModel().bindContext("/ZC_CR82_T_EXCEL_UP/com.sap.gateway.srvd.zui_cr82_excel_upload.v0001.UploadExcel(...)");
                oActionODataContextBinding.setParameter("file_base64", sFileBase64 );
                oActionODataContextBinding.setParameter("file_name", sFilename );
                oActionODataContextBinding.execute().then(
                    function(result) {
                        let oActionContext = oActionODataContextBinding.getBoundContext();
                        oActionContext.oModel.mMessages[""].forEach(message => {
                            MessageToast.show(message.message);
                        });
                    }.bind(this),
                    function(oError){
                        debugger;
                    }.bind(this)
                );


            }.bind(this));            

        },
        baixarPlanilhaModelo: function() {
            //FileUploadHelper.baixarLayout();
            ShowMessagesHelper.exibeMensagens();
        }
    }
});
