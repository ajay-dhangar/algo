from pathlib import Path
path = Path('src/components/ComingSoon.tsx')
text = path.read_text(encoding='utf8')
line_num = 158
lines = text.splitlines()
line = lines[line_num-1]
print(line_num, line)
print('chars:', [(i+1, ch) for i,ch in enumerate(line)])
