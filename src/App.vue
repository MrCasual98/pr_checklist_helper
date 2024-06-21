<template>
    <main class="w-screen h-screen flex items-center justify-center">
        <Card v-motion-slide-top class="p-2 max-w-[600px] w-full">
            <template #title>
                <header class="flex w-full justify-between items-center">
                    <h1>PR-Checklist</h1>
                    <ToggleButton
                        v-model="isDark" aria-label="Do you confirm" class="w-9rem" off-icon="pi pi-sun"
                        off-label="Light" on-icon="pi pi-moon" on-label="Dark" />
                </header>
            </template>
            <template #content>
                <ChecklistView />
            </template>
        </Card>
    </main>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import ToggleButton from 'primevue/togglebutton';
import { watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import ChecklistView from '@/views/ChecklistView.vue';

const isDark = useLocalStorage('isDark', true);

watch(isDark, (value) => {
    if (value) {
        document.documentElement.classList.add('p-dark');
    } else {
        document.documentElement.classList.remove('p-dark');
    }
}, { immediate: true });
</script>
