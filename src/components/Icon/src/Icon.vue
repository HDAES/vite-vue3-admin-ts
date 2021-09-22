<template>
    <div class="el-icon">
        <i  :class="className"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'el-icon',
    props: {
        className: {
            type: String,
            default: 'icon',
        }
    }
})
</script>