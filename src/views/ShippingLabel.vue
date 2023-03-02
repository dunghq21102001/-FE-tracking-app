<template>
    <header-common></header-common>
    <div class="w-full min-h-[100vh] pt-4 bg-[#ecf0f5]">
        <div class="
                mx-auto
                w-[90%]
                lg:w-[80%]
                bg-white
                border-t-[4px] border-blue-400 border-solid
                ">
            <Form>
                <Field name="from_company" v-model="formSubmit.from_company_name"></Field>
            </Form>


        </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form, Field, ErrorMessage
    },
    data() {
        return {
            formSubmit: {
                from_company_name: "",
                to_company_name: "",
                from_address: "",
                to_address: "",
                from_city: "",
                to_city: "",
                bol_code: "",
            },
        }
    }
}
</script>