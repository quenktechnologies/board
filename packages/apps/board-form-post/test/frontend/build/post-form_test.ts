import { assert } from '@quenk/test/lib/assert';

describe('post-form', () => {

    beforeEach(() => {

        window.location.href = '/';

    })

    describe('primary button', () => {

        xit('should show post form ', () => {

            let btn = <HTMLButtonElement> document.querySelector('a.-primary');
            assert(btn).not.undefined();
            btn.click();

            let form = document.querySelector('[name=post-form]');
            assert(form).not.undefined();

        })

    })

    describe('form editing', () => {

        it('should work', () => {

            let btn = <HTMLButtonElement> document.querySelector('a.-primary');
            assert(btn).not.undefined();
            btn.click();

            let form = <HTMLFormElement> document.querySelector('[name=post-form]');
            assert(form).not.undefined();

            let companyInput = <HTMLInputElement> form.querySelector('[name=company]');
            companyInput.value = 'Quenk';

      })
    })

})
