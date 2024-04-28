import {computed} from "vue";
import {email, helpers, minLength, required} from "@vuelidate/validators";

export const registerRules = computed(()=>{
    return {
        name: {required, minLength: minLength(3)},
        email: {required, email},
        password: {required, minLength:minLength(6)}
    }
});

export const loginRules = computed(()=>{
    return {
        email: {required, email},
        password: {required, minLength:minLength(6)}
    }
})

export const taskRules = computed(()=>{
    return {
        title: {required, minLength: minLength(4)},
        due_date: {required, minValue: helpers.withMessage('Due date after today', (value:string) => {
                console.log({value})
                return new Date(value) > new Date()
            }),
        }
    }
});