sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'br.com.rapexcelupload.fioriexcelupload',
            componentId: 'ZC_CR82_T_EXCEL_UPList',
            contextPath: '/ZC_CR82_T_EXCEL_UP'
        },
        CustomPageDefinitions
    );
});