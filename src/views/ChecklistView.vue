<template>
    <header class="flex border-b border-">
        <template v-if="step === 0">
            Link & Technologie
        </template>
        <template v-else>
            {{ currentQuestion?.title }}
        </template>
    </header>
    <div class="border-t py-5 flex flex-col items-start gap-4">
        <ChecklistStart v-if="step === 0" v-model:tickets="tickets" />
        <ChecklistItem
            v-else-if="step <= questionsSet.questions.length" :key="currentQuestion.question"
            v-model:question="currentQuestion"
        />
        <textarea
            v-else v-model="prRichText" v-motion-slide-left class="w-full p-4 rounded-md" readonly
            rows="10"></textarea>
    </div>
    <footer
        :class="'justify-between'"
        class="flex items-center w-full border-t pt-2"
    >
        <div v-if="step === 0" class="flex gap-2 items-center">
            <Button
                v-for="preset in QUESTION_PRESETS" :key="preset.name" :icon="preset.icon"
                :outlined="preset.name === questionsSet.name"
                :text="preset.name !== questionsSet.name" rounded
                @click="changeQuestionPreset(preset.name)" />
        </div>
        <Button v-if="step > 0" text @click="previous()">Zurück</Button>
        <Button
            v-if="step <= questionsSet.questions.length"
            :disabled="step > 0 ? (currentQuestion?.answer === false) : !areTicketsValid" @click="next()">Weiter
        </Button>
        <Button v-if="step > questionsSet.questions.length" @click="copyTemplate">kopieren & beenden</Button>
    </footer>
    <Toast />
</template>


<script lang="ts" setup>
import ChecklistStart from '@/components/ChecklistTickets.vue';
import { type Question, QUESTION_PRESETS, type QuestionPreset } from '@/question_presets';
import { computed, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import copyToClipboard from '@/utils/copy_to_clipboard';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import ChecklistItem from '@/components/ChecklistItem.vue';
import Toast from 'primevue/toast';


const step = ref(0);

const tickets = ref<{ link: string }[]>([{ link: '' }]);

const areTicketsValid = computed(() => tickets.value.length > 0 && tickets.value.every(ticket => ticket.link.length > 0));

const defaultPreset = useLocalStorage('set', 'Frontend');
const questionsSet = ref<QuestionPreset>(QUESTION_PRESETS.find(preset => preset.name === defaultPreset.value) ?? QUESTION_PRESETS[0]);

function changeQuestionPreset(name: string) {
    step.value = 0;
    defaultPreset.value = name;
    questionsSet.value = { ...(QUESTION_PRESETS.find(preset => preset.name === name) ?? QUESTION_PRESETS[0]) };
}

const prRichText = computed(() => {
    let text = `Dieser PR behandelt folgende Ticket(s):`;

    tickets.value.forEach((ticket) => {
        text += `\n- [${getTicketIdFromLink(ticket.link) || 'Link'}](${ticket.link})`;
    });
    text += `\n## PR-Checkliste
Die folgenden Punkte wurden berücksichtigt und vor der Erstellung des PRs behandelt.
  `;

    questionsSet.value.questions.forEach((question) => {
        text += `- [${question.answer ? 'X' : ''}] ${question.questionText} \n`;
    });

    return text + `## Besonderheiten

Falls in diesem PR Base Components angepasst wurden oder wichtige bestehende Businesslogik angepasst wurde, werden diese hier weiter erläutert:

-
  `;
});

const currentQuestion = computed<Question>({
    get: () => questionsSet.value.questions[step.value - 1],
    set: (value) => questionsSet.value.questions[step.value - 1] = value
});

function next() {
    if (step.value === questionsSet.value.questions.length + 1) return;
    step.value++;
}

function previous() {
    if (step.value === 0) return;
    step.value--;
}

const toast = useToast();

function copyTemplate() {
    copyToClipboard(prRichText.value, () => {
        toast.add({ severity: 'info', summary: 'Info', detail: 'PR-Template in Zwischenablage kopiert!', life: 3000 });
        setTimeout(() => {
            document.location.reload();
        }, 3000);
    });
}

/**
 * Finds the ticket ID in the link e.g. https://organisation.atlassian.net/jira/browse/TKT-1234 -> TKT-1234
 * @returns The ticket ID or undefined if not found
 *
 */
function getTicketIdFromLink(link: string) {
    const regex = /browse\/([A-Z]+-[0-9]+)/;
    const match = link.match(regex);
    return match ? match[1] : undefined;
}

</script>