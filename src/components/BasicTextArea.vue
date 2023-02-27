<template>
    <textarea 
            class="form-control"
            :class="{'is-valid': isValidated && isValidValue, 'is-invalid': isValidated && !isValidValue}"
            :value="modelValue"
            @input="updateValue"
            id="input-code" 
            aria-describedby="inputHelp" />
    <div v-if="!isValidated && textHelp" id="inputHelp" class="form-text">{{ textHelp }}</div>
    <div class="valid-feedback"> {{ validFeedbackText }} </div>
    <div class="invalid-feedback">{{ invalidFeedbackText }}</div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'BasicTextArea',
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