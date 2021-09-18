<template>
   <router-view v-slot="{ Component }" style="padding: 16px">
        <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>