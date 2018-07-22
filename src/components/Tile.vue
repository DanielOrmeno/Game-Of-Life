<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        alive: { type: Boolean },
    },
    methods: {
        update($event: any) {
            this.$emit('update:alive', $event);
        },
    },
});
</script>

<template>
    <div :class="{'alive' : alive }" class="tile" @click="update(!alive)"></div>
</template>


<style lang="less" scoped>
.tile {
    width: 1em;
    height: 1em;
    background-color: white;
    border: solid 1px gray;
    cursor: pointer;

    &.alive {
        background-color: gray;
        border-color: lightgray;
    }
}
</style>
