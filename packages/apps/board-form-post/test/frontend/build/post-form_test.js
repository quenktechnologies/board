"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
describe('post-form', function () {
    beforeEach(function () {
        window.location.href = '/';
    });
    describe('primary button', function () {
        xit('should show post form ', function () {
            var btn = document.querySelector('a.-primary');
            assert_1.assert(btn).not.undefined();
            btn.click();
            var form = document.querySelector('[name=post-form]');
            assert_1.assert(form).not.undefined();
        });
    });
    describe('form editing', function () {
        it('should work', function () {
            var btn = document.querySelector('a.-primary');
            assert_1.assert(btn).not.undefined();
            btn.click();
            var form = document.querySelector('[name=post-form]');
            assert_1.assert(form).not.undefined();
            var companyInput = form.querySelector('[name=company]');
            companyInput.value = 'Quenk';
        });
    });
});
//# sourceMappingURL=post-form_test.js.map