<template>
    <div v-motion-slide-visible-left class="flex flex-col gap-2 w-full">
        <h2>{{ question.question }}</h2>
        <ToggleButton
            v-model="question.answer" aria-label="Do you confirm" class="w-full" off-icon="pi pi-times"
            off-label="Nein" on-icon="pi pi-check" on-label="Ja" />
    </div>
</template>

<script lang="ts" setup>
import ToggleButton from 'primevue/togglebutton';
import { type Question } from '@/question_presets';

const question = defineModel<Question>('question', {
    required: true
});
</script>