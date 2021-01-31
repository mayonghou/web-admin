<template>
    <div>
        <div class="root">
            <div>
                <h3 class="h3ert">填写版本信息</h3>
            </div>
            <div class="form">
                <Form :model="formItem" :label-width="120">
                    <FormItem label="版本名称">
                        <Input v-model="formItem.input" placeholder="Enter something..." />
                    </FormItem>
                    <FormItem label="版本功能描述">
                        <Input
                            v-model="formItem.textarea"
                            type="textarea"
                            :autosize="{minRows: 10,maxRows:30}"
                            placeholder="功能描述..."
                        />
                    </FormItem>
                    <FormItem>
                        <div style="text-align:center">
                            <Button type="primary">保存</Button>
                            <Button style="margin-left: 8px">取消</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formItem: {
                input: '',
                textarea: ''
            }
        };
    }
};
</script>

<style scoped>
.root {
    padding: 20px;
}
.h3ert {
    padding: 20px;
}
.form {
    padding-right: 80px;
}
</style>
