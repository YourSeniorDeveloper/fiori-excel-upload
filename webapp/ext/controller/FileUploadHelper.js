sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        _callUploadDialog: function(orig, callback) {
            if(!this.oFileUploadDialog) {
                this._createFileUploadDialog(orig, function (oFile, sFilename) {
                    debugger;
                    callback(sFilename, btoa(oFile.target.result))
                });
            }
            this.oFileUploadDialog.open();
        },
        _createFileUploadDialog: function(orig, onFileUploadHandler) {
            this.oFileUploader = new sap.ui.unified.FileUploader("FileUploader",{
                name: "FileUploader",
                tooltip: "Importar arquivo",
                fileType: ["xlsx","XLSX"],
                width:"350px"
            });

            this.oFileUploadDialog = new sap.m.Dialog({
                title: orig,
                content: [ 
                    new sap.ui.layout.form.SimpleForm("FileUploadForm", {
                        editable: true,
                        content: [
                            this.oFileUploader
                        ]
                    })
                ],
                beginButton: new sap.m.Button({
                    type: sap.m.ButtonType.Emphasized,
                    text: "Importar",
                    press: function() {
                        const file = this.oFileUploader.oFileUpload.files[0];
                        this.filename = file.name;
                        if (!file) {
                            sap.m.MessageBox.show(
                                "Nenhum arquivo foi selecionado",
                                {
                                    icon: sap.m.MessageBox.Icon.ERROR,
                                    title: "Erro ao importar o arquivo"
                                }
                            );
                            return;
                        }
                        
                        const fileReader = new FileReader();
                        
                        fileReader.onload = function (oFile) {
                            this.oFileUploadDialog.close();
                            onFileUploadHandler(oFile, this.filename);
                        }.bind(this);
                        
                        fileReader.onerror = function (oError) {
                            sap.m.MessageBox.show(
                                oError.message,
                                {
                                    icon: sap.m.MessageBox.Icon.ERROR,
                                    title: "Erro ao importar o arquivo"
                                }
                            );
                        };
                        
                        fileReader.readAsArrayBuffer(file);
                    }.bind(this)
                }),
                endButton: new sap.m.Button({
                    text: sap.ui.getCore().getLibraryResourceBundle("sap.ui.generic.app").getText("ACTION_CANCEL"),
                    press: function () {
                        this.oFileUploadDialog.close();
                    }.bind(this)
                }),
                afterClose: function (oControlEvent) {
                    this.oFileUploadDialog.destroy();
                    delete this.oFileUploadDialog;
                }.bind(this)
            });
        },
        _callAction: function(action, oParameters, fnReturn) {
            this.extensionAPI.securedExecution(
                function(){
                    return new Promise(function (resolve, reject) {
                        this.extensionAPI.invokeActions(
                            action,
                            [this.getView().getBindingContext()],
                            oParameters,
                            { 
                                bInvocationGroupingChangeSet: false 
                            }
                        ).then(
                            function (data) {
                                if (fnReturn) {
                                    fnReturn(data);
                                }
                                resolve(data);
                            },
                            function (error) {
                                reject(error);
                            }
                        ).catch(function (error) {
                            reject(error);
                        });
                    }.bind(this));            
                }.bind(this), 
                { 
                    busy: {
                        set: true,
                        check: true
                    },
                    dataloss: {
                        popup: true,
                        navigation: false
                    }
                }
            ).then(
                function (data) {
                    return;
                },
                function (error) {
                    sap.m.MessageToast.show("Erro ao realizar a chamada do serviço " + action);
                    console.log(error);
                }
            );
        }
    };
});
