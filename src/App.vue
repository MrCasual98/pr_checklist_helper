
<template>
  <main class="w-screen h-screen flex items-center justify-center">
    <Card class="p-2 max-w-[600px] w-full">
      <template #title>
        <header class="flex w-full justify-between items-center">
          <h1>PR-Checklist</h1>
          <ToggleButton v-model="isDark" onLabel="Dark" offLabel="Light" onIcon="pi pi-sun"
                        offIcon="pi pi-moon" class="w-9rem" aria-label="Do you confirm" />
        </header>
      </template>
      <template #subtitle>
        {{ currentQuestion?.title }}
      </template>
      <template #content>
        <div v-if="step <= questions.length - 1" class="border-t py-5 flex flex-col gap-4">
          <h2>{{ currentQuestion.question }}</h2>
          <template v-if="currentQuestion.type === 'boolean'">
            <ToggleButton v-model="currentQuestion.answer" onLabel="Ja" offLabel="Nein" onIcon="pi pi-check"
                        offIcon="pi pi-times" class="w-9rem" aria-label="Do you confirm" />
          </template>
          <template v-else>
            <InputText v-model="currentQuestion.link" placeholder="https://organisation.atlassian.net/jira/...."/>
          </template>
        </div>
        <textarea v-else class="w-full p-2" rows="10" v-model="prRichText" readonly></textarea>
      </template>
      <template #footer>
        <div class="flex items-center w-full"
        :class="step === 0 ? 'justify-end' : 'justify-between'"
        >
          <Button text v-if="step > 0" @click="previous()">Zurück</Button>
          <Button v-if="step < questions.length && currentQuestion" :disabled="!(currentQuestion.answer === true || (currentQuestion.link?.length ?? 0) > 0)" @click="next()">Weiter</Button>
          <Button v-if="step === questions.length" @click="copyToClip">kopieren & beenden</Button>
        </div>
      </template>
    </Card>
  </main>
  <Toast />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import ToggleButton from 'primevue/togglebutton';
import InputText from 'primevue/inputtext';
import { computed, ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'

const step = ref(0)

const isDark = useLocalStorage('isDark', false)

interface Question {
  title: string;
  question: string;
  type: 'boolean' | 'link';
  answer?: boolean;
  link?: string;
}

interface LinkQuestion extends Question {
  type: 'link';
  link: string;
}

interface BooleanQuestion extends Question {
  type: 'boolean';
  answer: boolean;
}

const questions = ref<Array<LinkQuestion | BooleanQuestion>>([
  {
    title: 'Ticket Link',
    question: 'Gib den Link zum PM-Tool Ticket ein (Jira, Awork, usw.)',
    type: 'link',
    link: ''
  },
  {
    title: 'Anforderungen überprüft',
    question: 'Ich habe das Ticket nochmal überprüft und alle Anforderungen erfüllt (Design, Funktionalität, etc.)',
    type: 'boolean',
    answer: false
  },
  // {
  //   title: 'User Experience',
  //   question: 'Bekommt der Nutzer genügend Feedback? Bzw. ist aus Nutzersicht alles verständlich?',
  //   type: 'boolean',
  //   answer: false
  // },
  {
    title: 'Getestet',
    question: 'Ich habe die Änderungen lokal getestet und bin sicher, dass sie funktionieren: Edge Cases: sehr lange Eingaben, "falscher" Input, Responsivität, etc.',
    type: 'boolean',
    answer: false
  },
  {
    title: 'Type-Check & Build',
    question: 'Die Typescript-Überprüfung und der Build sind fehlerfrei durchgelaufen.',
    type: 'boolean',
    answer: false
  }
]);

const prRichText = computed(() => {
  return `Dieser PR behandelt das Ticket [${ticketId.value}](${questions.value[0].link})

## PR-Checkliste
Die folgenden Punkte wurden berücksichtigt und vor der Erstellung des PRs behandelt.
 - [${questions.value[1].answer ? 'X' : ''}] Ich habe das Ticket nochmal überprüft und alle Anforderungen erfüllt (Design, Funktionalität, etc.)
 - [${questions.value[2].answer ? 'X' : ''}] Ich habe die Änderungen lokal getestet und bin sicher, dass sie funktionieren. Bspw. Edge Cases: sehr lange Eingaben, "falscher" Input, Responsivität, etc.
 - [${questions.value[3].answer ? 'X' : ''}] Die Typescript-Überprüfung und der Build sind fehlerfrei durchgelaufen.

## Besonderheiten

Falls in diesem PR Base Components angepasst wurden oder wichtige bestehende Businesslogik angepasst wurde, werden diese hier weiter erläutert:

-

  `;
})

const currentQuestion = computed<LinkQuestion | BooleanQuestion>({
  get: () => questions.value[step.value],
  set: (value) => questions.value[step.value] = value
})

function next() {
  if(step.value === questions.value.length) return
  step.value++
}

function previous() {
  if(step.value === 0) return
  step.value--
}

const toast = useToast();

function copyToClip() {
  navigator.clipboard.writeText(prRichText.value)
  toast.add({ severity: 'info', summary: 'Info', detail: 'PR-Template in Zwischenablage kopiert!', life: 3000 });
  setTimeout(() => {
    document.location.reload();
  }, 3000);
}

/**
 * Finds the ticket ID in the link e.g. https://organisation.atlassian.net/jira/browse/TKT-1234 -> TKT-1234
 * @returns {string} The ticket ID
 *
 */
const ticketId = computed(() => {
  const link = questions.value[0].link ?? ''
  const regex = /(?:browse\/)([A-Z]+-[0-9]+)/
  const match = link.match(regex)
  return match ? match[1] : ''
});


watch(isDark, (value) => {
  if (value) {
    document.documentElement.classList.add('p-dark')
  } else {
    document.documentElement.classList.remove('p-dark')
  }
}, { immediate: true });
</script>


<style scoped>

</style>
