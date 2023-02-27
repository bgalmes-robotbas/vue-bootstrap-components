<template>
    <vSelect
        ref="selectInput"
        :options="options" 
        :reduce="reduceFun"
        :value="modelValue"
        @option:selected="updateValue"
        class="form-control"
        :class="{'is-valid': isValidated && isValidValue, 'is-invalid': isValidated && !isValidValue}"
        aria-describedby="inputHelp"
    />
    <div v-if="!isValidated && textHelp" id="inputHelp" class="form-text">{{ textHelp }}</div>
    <div class="valid-feedback"> {{ validFeedbackText }} </div>
    <div class="invalid-feedback">{{ invalidFeedbackText }}</div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import vSelect from 'vue-select'

export default {
    name: 'SelectInput',
    components: {
        vSelect
    },
    props: {
        modelValue: {
            required: true
        },
        options: {
            required: true,
            type: Array
        },
        reduceFun: {
            type: Function,
            default: (option) => option,
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
        const selectInput = ref()

        const isValidValue = computed(() => {
            return !props.invalidFeedbackText || props.invalidFeedbackText === ''
        })

        const isValidated = computed(() => {
            return props.invalidFeedbackText !== '' || props.validFeedbackText !== ''

        })

        const updateValue = (option) => {
            context.emit('update:modelValue', option.code);
        }

        watch(() => props.modelValue, (newValue) => {
            let newOption = props.options.find(op => op.code == newValue)
            if (newOption) {
                selectInput.value.select(newOption)
                selectInput.value.closeSearchOptions()
            } else {
                selectInput.value.clearSelection()
            }
        });
        
        return {
            isValidValue,
            isValidated,

            selectInput,
            
            updateValue
        }
    }
}
</script>
