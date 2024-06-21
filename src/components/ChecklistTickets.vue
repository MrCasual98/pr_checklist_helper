<template>
    <h2>Gib den Link zum PM-Tool Ticket ein (Jira, Awork, usw.)</h2>
    <div v-for="(ticket, index) in tickets" :key="index" class="flex flex-col w-full">
        <div class="flex gap-2 w-full">
            <InputText
                v-model="ticket.link" class="w-full"
                autofocus
                placeholder="https://organisation.atlassian.net/jira/...." />
            <Button
                v-if="tickets.length > 1" class="flex-shrink-0" icon="pi pi-minus" rounded size="10"
                text @click="removeTicket(index)" />
        </div>
    </div>
    <Button class="flex-shrink-0" icon="pi pi-plus" rounded text @click="tickets.push({link: ''})"></Button>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const tickets = defineModel<{ link: string }[]>('tickets', {
    required: true
});

function removeTicket(index: number) {
    if (tickets.value.length === 1) {
        return;
    }
    tickets.value.splice(index, 1);
}
</script>