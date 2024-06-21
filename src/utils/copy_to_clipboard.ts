export default function copyToClipboard(text: string, onCopy?: () => void) {
    navigator.clipboard.writeText(text).then(() => {
        if (onCopy) onCopy();
    });
}