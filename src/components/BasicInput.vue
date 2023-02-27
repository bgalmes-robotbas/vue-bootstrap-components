<template>
    <input  :type="inputType" 
            class="form-control"
            :class="{'is-valid': isValidated && isValidValue, 'is-invalid': isValidated && !isValidValue}"
            :value="modelValue"
            @input="updateValue"
            :autocomplete="autocomplete"
            id="input-code" 
            aria-describedby="inputHelp">
    <div v-if="!isValidated && textHelp" id="inputHelp" class="form-text">{{ textHelp }}</div>
    <div class="valid-feedback"> {{ validFeedbackText }} </div>
    <div class="invalid-feedback">{{ invalidFeedbackText }}</div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'BasicInput',
    props: {
        modelValue: {
            required: true
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
        inputType: {
            type: String,
            default: 'text'
        },
        autocomplete: {
            type: String,
            default: 'on'
        }
    },
    
    setup(props, context) {

        const isValidValue = computed(() => {
            return !props.invalidFeedbackText || props.invalidFeedbackText === ''
        })

        const isValidated = computed(() => {
            return props.invalidFeedbackText !== '' || props.validFeedbackText !== ''

        })

        const updateValue = (event) => {
            context.emit('update:modelValue', event.target.value);
        }

        return {
            isValidValue,
            isValidated,

            updateValue
        }
    }
}
</script>

<style>

</style>