import glob, re
import os

html_files = glob.glob('*.html')
pattern = re.compile(r'(<div class="[^"]*?d-flex gap-3 fs-5 mt-3[^"]*?">\s*)<a href="#" class="text-secondary[^"]*"><i class="bi bi-facebook"></i></a>(\s*)<a href="#" class="text-secondary[^"]*"><i class="bi bi-twitter-x"></i></a>(\s*)<a href="#" class="text-secondary[^"]*"><i class="bi bi-instagram"></i></a>(\s*)<a href="#" class="text-secondary[^"]*"><i class="bi bi-linkedin"></i></a>', re.DOTALL)

for f in html_files:
    if f == 'index.html': continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if pattern.search(content):
        def replacer(match):
            div_tag = match.group(1)
            if 'footer-socials' not in div_tag:
                div_tag = div_tag.replace('d-flex gap-3 fs-5 mt-3', 'd-flex gap-3 fs-5 mt-3 footer-socials')
            return div_tag + '<a href="#" class="text-secondary social-icon"><i class="bi bi-facebook"></i></a>' + match.group(2) + '<a href="#" class="text-secondary social-icon"><i class="bi bi-twitter-x"></i></a>' + match.group(3) + '<a href="#" class="text-secondary social-icon"><i class="bi bi-instagram"></i></a>' + match.group(4) + '<a href="#" class="text-secondary social-icon"><i class="bi bi-linkedin"></i></a>'
        
        new_content = pattern.sub(replacer, content)
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Updated {f}')
