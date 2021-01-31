<template>
    <div>
        <Modal
            v-model="modal1"
            title="Common Modal dialog box title"
            @on-ok="ok"
            @on-cancel="cancel"
        >
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modal1: false
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style>
</style>