<template>
    <Datepicker 
        :uid="name"
        inputClassName="form-control"
        :class="{'is-valid': isValidated && isValidValue, 'is-invalid': isValidated && !isValidValue}"
        v-model="value" 
        @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        aria-describedby="starttimeHelp" 
        :enable-time-picker="enableTimePicker"
        />
    <div v-if="!isValidated && textHelp" id="inputHelp" class="form-text">{{ textHelp }}</div>
    <div class="valid-feedback"> {{ validFeedbackText }} </div>
    <div class="invalid-feedback">{{ invalidFeedbackText }}</div>
</template>

<script>
import { computed, toRef } from 'vue'

import Datepicker from '@vuepic/vue-datepicker'

export default {
    name: 'DateTimeInput',
    components: {
        Datepicker
    },
    props: {
        modelValue: {
            required: true
        },
        name: {
            type: String,
            default: ""
        },
        textHelp: {
            type: String,
            default: null
        },
        validFeedbackText: {
            type: String,
            default: ''
        },
        invalidFeedbackText: {
            type: String,
            default: ''
        },
        enableTimePicker: {
            default: true
        }
    },
    
    setup(props) {

        const isValidValue = computed(() => {
            return !props.invalidFeedbackText || props.invalidFeedbackText === ''
        })

        const isValidated = computed(() => {
            return props.invalidFeedbackText !== '' || props.validFeedbackText !== ''

        })

        return {
            isValidValue,
            isValidated,
            value: toRef(props, 'modelValue')
        }
    }
}
</script>

<style>

</style>