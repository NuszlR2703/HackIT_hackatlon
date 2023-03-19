import re

import openai
import requests
import json

api_key = "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"


def get_courses(skill_name, old_response, experience_level):
    openai.api_key = api_key
    course_list = []
    id_list = []
    while len(course_list) == 0:
        completion = openai.Completion.create(
            model="text-davinci-003",
            prompt='all enrollable ' + experience_level + ' courses without youtube videos with link to improve '
                   + skill_name + ' skills only name and url in this format:{"name": course name, "url": course url} \
                   separated by comma',
            temperature=0.7,
            max_tokens=1938,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        response = completion.choices[0].text
        lines = [line.strip() for line in response.split('\n') if line.strip()]
        for i in lines:
            match = re.search(r'"name":\s*"([^"]+)",\s*"url":\s*"([^"]+)"', i)
            if match:
                name = match.group(1)
                url = match.group(2)
                course_dict = {
                    "name": name,
                    "url": url
                }
                course_list.append(course_dict)
        for i, obj in enumerate(course_list):
            if check_url(obj['url']):
                id_list.append(i)
    final_list = []
    for i, obj in enumerate(course_list):
        if i not in id_list:
            final_list.append(course_list[i])
    response = json.dumps(final_list)
    response = json.loads(response)
    set2 = set(old_response)
    response = [(obj['name'], obj['url']) for i, obj in enumerate(response) if obj['url'] not in set2]
    return response


def get_certificates(skill_name, old_response, experience_level):
    openai.api_key = api_key
    course_list = []
    id_list = []
    while len(course_list) == 0:
        completion = openai.Completion.create(
            model="text-davinci-003",
            prompt='all enrollable ' + experience_level + ' certificates without youtube videos with link to improve '
                   + skill_name + ' skills only name and url in this format:{"name": certificate name, "url": \
                   certificate url} separated by comma',
            temperature=0.7,
            max_tokens=1938,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        response = completion.choices[0].text
        lines = [line.strip() for line in response.split('\n') if line.strip()]
        for i in lines:
            match = re.search(r'"name":\s*"([^"]+)",\s*"url":\s*"([^"]+)"', i)
            if match:
                name = match.group(1)
                url = match.group(2)
                course_dict = {
                    "name": name,
                    "url": url
                }
                course_list.append(course_dict)
        for i, obj in enumerate(course_list):
            if check_url(obj['url']):
                id_list.append(i)
    final_list = []
    for i, obj in enumerate(course_list):
        if i not in id_list:
            final_list.append(course_list[i])
    response = json.dumps(final_list)
    response = json.loads(response)
    set2 = set(old_response)
    response = [(obj['name'], obj['url']) for i, obj in enumerate(response) if obj['url'] not in set2]
    return response


def check_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        return False
    else:
        return True
