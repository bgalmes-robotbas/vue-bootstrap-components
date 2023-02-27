import { ref, reactive, watch } from "vue"

export const propsForm = {
    formData: {
        type: Object
    },
    validations: {
        type: Object
    }
}

export const useForm = (fieldsDefinition, props) => {
    const valErrors = reactive({})
    const formRefs = {}

    const ignorefield = (fieldDef) => {
        return 'ignore' in fieldDef && fieldDef['ignore']()
    }
    for (const [key, value] of Object.entries(fieldsDefinition)) {
        valErrors[key] = ''
        formRefs[key] = ref('default' in value ? value['default'] : null)
    }
    
    const cleanValidations = () => {
        for (const field in valErrors) {
            valErrors[field] = ''
        }
    }

    const cleanForm = () => {
        cleanValidations()
        for (const [key, value] of Object.entries(fieldsDefinition)) {
            formRefs[key].value = 'default' in value ? value['default'] : null
        }
    }

    watch(() => props.formData, (newFormData) => {
        console.log(newFormData);
        if (newFormData) {
            for (const field in formRefs) {
                formRefs[field].value = newFormData[field]
            }
        }
    })

    watch(() => props.validations, (newValidations) => {
        cleanValidations()
        for (const field in newValidations) {
            console.log(`Error in field ${field}: ${newValidations[field]}`);
            valErrors[field] = newValidations[field][0]
        }      
    })

    return {
        formRefs,
        valErrors,
        cleanForm,
        cleanValidations,

        getFormData: () => {
            const formData = {}
            for (const field in formRefs) {
                if (!ignorefield(fieldsDefinition[field]))
                formData[field] = formRefs[field].value
            }

            return formData
        }
    }
}