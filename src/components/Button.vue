<template>                    

    <button :disabled="props.disabled" :class="`btn ${props.color}-btn`">
        {{ label }}
        <slot></slot>
        <slot name="icon"></slot>
    </button>

</template>

<script setup lang="ts">
interface Button{
    color?: string, 
    label?: string,
    disabled?: boolean,
}

const props = withDefaults( defineProps<Button>(), {
    color:  "grey",
    label: "",
    disabled: false,
});

</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.btn{
    padding: .35rem 1.5rem .35rem 1.5rem;
    color: white;
    border: none;
    border-radius: 2px;
    outline: none;
    font-family: $inria-regular;
    margin-top: 1.5rem;
    margin-right: 1.5rem;
    cursor: pointer;
    transition: all ease .25s;

    &:disabled{
        background-color: #bdbdbd !important;
        color: white !important;
        cursor: default;
    }
}

.grey-btn{
    background-color: grey;

    &:hover{
        background-color: rgb(62, 62, 62);
    }
}
.orange-btn{
    background-color: #FF9344;
    color: white;

    &:hover{
        background-color: #d97c3a;
    }
}
.green-btn{
    background-color: #39bc4a;
    color: white;

    &:hover{
        background-color: #1d6326;
    }
}
.blue-btn{
    background-color: #087F8C;
    color: white;

    &:hover{
        background-color: #045862;
    }
}
.darkblue-btn{
    background-color: #345995;
    color: white;

    &:hover{
        background-color: rgb(3, 70, 78);
    }
}
</style>