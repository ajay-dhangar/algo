const SUPerscripts: Record<string, string> = {
  "\u00B2": "2",
  "\u00B3": "3",
};

export default function Complexity({ value }: { value: string }) {
  const parts: { text: string; sup?: string; italic?: boolean }[] = [];
  let i = 0;
  while (i < value.length) {
    const ch = value[i];
    if (ch === "O" || ch === "Ω" || ch === "Θ") {
      parts.push({ text: ch, italic: true });
      i++;
    } else if (SUPerscripts[ch]) {
      parts.push({ text: ch, sup: SUPerscripts[ch] });
      i++;
    } else {
      const start = i;
      while (i < value.length && !"OΩΘ\u00B2\u00B3".includes(value[i])) {
        i++;
      }
      parts.push({ text: value.slice(start, i) });
    }
  }

  return (
    <span className="font-mono font-semibold text-indigo-600 dark:text-yellow-400">
      {parts.map((p, idx) =>
        p.sup ? <sup key={idx}>{p.sup}</sup> :
        p.italic ? <i key={idx}>{p.text}</i> :
        <span key={idx}>{p.text}</span>
      )}
    </span>
  );
}
