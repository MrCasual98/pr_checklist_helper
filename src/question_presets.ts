export interface Question {
    title: string;
    question: string;
    questionText: string;
    answer?: boolean;
}

export interface QuestionPreset {
    name: string;
    icon: string;
    questions: Array<Question>;
}

export const QUESTION_PRESETS: Array<QuestionPreset> = [
    {
        name: 'Frontend',
        icon: 'pi pi-desktop',
        questions: [
            {
                title: 'Anforderungen überprüft',
                question: 'Ich habe das Ticket nochmal überprüft und alle Anforderungen erfüllt (Design, Funktionalität, etc.)',
                questionText: 'Ich habe das Ticket nochmal überprüft und alle Anforderungen erfüllt (Design, Funktionalität, etc.)',
                answer: false
            },
            {
                title: 'Getestet',
                question: 'Ich habe die Änderungen lokal getestet und bin sicher, dass sie funktionieren: Edge Cases: sehr lange Eingaben, "falscher" Input, Responsivität, etc.',
                questionText: 'Ich habe die Änderungen lokal getestet und bin sicher, dass sie funktionieren. Bspw. Edge Cases: sehr lange Eingaben, "falscher" Input, Responsivität, etc.',
                answer: false
            },
            {
                title: 'Type-Check & Build',
                question: 'Die Typescript-Überprüfung und der Build sind fehlerfrei durchgelaufen.',
                questionText: 'Die Typescript-Überprüfung und der Build sind fehlerfrei durchgelaufen.',
                answer: false
            }
        ]
    },
    {
        name: 'Backend',
        icon: 'pi pi-server',
        questions: [
            {
                title: 'Anforderungen überprüft',
                question: 'Ich habe das Ticket nochmal überprüft und alle Anforderungen erfüllt ',
                questionText: 'Ich habe das Ticket nochmal überprüft und alle Anforderungen erfüllt',
                answer: false
            },
            {
                title: 'Tests geschrieben',
                question: 'Ich habe falls nötig Tests geschrieben und bin sicher, dass sie alle Anforderungen abdecken',
                questionText: 'Ich habe falls nötig Tests geschrieben und bin sicher, dass sie alle Anforderungen abdecken',
                answer: false
            },
            {
                title: 'Getestet',
                question: 'Ich habe die Änderungen lokal getestet und bin sicher, dass sie funktionieren: Edge Cases, "falscher" Input, etc.',
                questionText: 'Ich habe die Änderungen lokal getestet und bin sicher, dass sie funktionieren: Edge Cases, "falscher" Input, etc.',
                answer: false
            }
        ]
    }
];