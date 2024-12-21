import os 
import time

def generate_index_file(name, label, time_input):
    index_file = f'''---
title: {name}
date: {time_input}
external_link: ''
tags: {label}
---
<!--more-->
'''
    return index_file

archive_root = 'D:\\photo\\archive'
target_root = 'content\\gallery_pic'
rewrite = True
time_type_file = True
if rewrite:
    os.system('rmdir /s/q %s' % target_root)
    os.makedirs(target_root)
subdirs = os.listdir(archive_root)
for subdir in subdirs:
    subdir_path = os.path.join(archive_root, subdir)
    if os.path.isdir(subdir_path):
        
        pics = os.listdir(subdir_path)
        for pic in pics:
            pic_name = pic.split('.')[0]
            pic_target_path = os.path.join(target_root, pic_name)
            if not os.path.exists(pic_target_path):
                os.makedirs(pic_target_path)
            else:
                os.system('rmdir /s/q %s' % pic_target_path)
                os.makedirs(pic_target_path)
            # copy pic to target path
            pic_path = os.path.join(subdir_path, pic)
            pic_target_file_path = os.path.join(pic_target_path, 'featured.png')
            os.system('copy %s %s' % (pic_path, pic_target_file_path))
            if not time_type_file:
                yyyy_mm_dd = time.strftime('%Y-%m-%d', time.localtime(time.time()))
                time_input = yyyy_mm_dd
            else:
                # get time from file
                time_input = time.strftime('%Y-%m-%d', time.localtime(os.path.getmtime(pic_path)))
            with open(os.path.join(pic_target_path, 'index.md'), 'w', encoding='utf-8') as f:
                f.write(generate_index_file(pic_name, subdir, time_input = time_input))
            
            