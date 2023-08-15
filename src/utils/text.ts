export function capitalize(word: string): string {
    const [w, ...ord] = word;
    return w.toLocaleUpperCase() + ord.join('');
}
