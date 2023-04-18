'use strict';

const forms = {
    classing: {
        data: '',
        field: document.querySelectorAll('input[name="classing"]'),
        block: document.querySelector('.classing'),
    },
    trainingBase: {
        data: '',
        field: document.querySelectorAll('input[name="training-base"]'),
        block: document.querySelector('.training-base'),
    },
    trainingForm: {
        data: '',
        field: document.querySelectorAll('input[name="training-form"]'),
        block: document.querySelector('.training-form'),
    },
}

const formReception = document.querySelector('#formSelectReception');

formReception.addEventListener('submit', e => {
    e.preventDefault();
    for (const form in forms) {
        if (!forms[form].data) {
            forms[form].block.classList.add('has-validate')
        } else {
            forms[form].block.classList.remove('has-validate')
        }
    }
})

function classingValidator() {
    forms.classing.field.forEach(item => {
        item.addEventListener('click', e => {
            forms.classing.data = item.value
            trainingBaseValidator()
            trainingFormValidator()
        })
    })
}

classingValidator()

function trainingBaseValidator() {
    forms.trainingBase.field.forEach(item => {
        if (forms.classing.data === '11') {
            if (item.value === 'contract') {
                forms.trainingBase.data = 'contract';
                item.setAttribute('checked', 'checked')
            } else {
                item.setAttribute('disabled', 'disabled')
            }
        } else {
            forms.trainingBase.data = '';
            item.removeAttribute('checked');
            item.removeAttribute('disabled');
            item.addEventListener('click', e => {
                forms.trainingBase.data = item.value
            })
        }
    })
}

trainingBaseValidator()

function trainingFormValidator() {
    forms.trainingForm.field.forEach(item => {
        if (forms.classing.data === '9') {
            if (item.value === 'full-time') {
                forms.trainingForm.data = 'full-time';
                item.setAttribute('checked', 'checked')
            } else {
                item.setAttribute('disabled', 'disabled')
            }
        } else {
            forms.trainingForm.data = '';
            item.removeAttribute('checked');
            item.removeAttribute('disabled');
            item.addEventListener('click', e => {
                forms.trainingForm.data = item.value
            })
        }
    })
}

trainingFormValidator()