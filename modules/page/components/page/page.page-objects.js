'use strict';

const loginPageObjects = dp.require('modules/page/components/login-form/login-form.page-objects');

module.exports = function (pageElement) {
    return {
        get isVisible () {
            return dp.isVisible(pageElement);
        },
        get text () {
            return pageElement.getText();
        },
        get login () {
            return loginPageObjects(pageElement.element(by.css('dp-login')));
        }
    };
};
