<template>
    <div class="modal">
        <div class="modal-content">
            <button class="close-btn" @click="$emit('closeModal', false)"><i class="fa-solid fa-x"></i></button>
            <header>
                <slot name="header"></slot>
            </header>
            <section>
                <slot></slot>
            </section>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['closeModal'])
</script>

<style scoped lang="scss">
.modal{
    position: fixed;
    top: 0px;
    left: 0px;

    width: 100vw;
    height: 100vh;
    z-index: 100;

    background-color: rgba($color: #000000, $alpha: .250);

    display: flex;
    justify-content: center;
    align-items: center;

    overflow-y: auto;

    .modal-content{
        margin: auto;
        max-width: 1000px;
        position: relative;
        padding: 1.5rem;
        background-color: whitesmoke;
        border-radius: 3px;

        .close-btn{
            position: absolute;
            padding: .25rem .5rem .25rem .5rem;
            border-radius: 2px;
            border: none;
            outline: none;
            cursor: pointer;

            top: 5px;
            right: 4px;
            background-color: transparent;
            transition: all .35s ease;

            &:hover{
                background-color: #e6e6e6;
            }
        }
    }
}
</style>