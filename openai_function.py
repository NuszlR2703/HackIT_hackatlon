import os
import openai
import requests
import json

api_key = "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"


def get_courses(skill_name):
    openai.api_key = api_key
    completion = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"enrollable courses with link to improve {skill_name} skills only name and url in JSON format",
        temperature=0.7,
        max_tokens=1938,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    response = completion.choices[0].text
    lines = [line.strip() for line in response.split('\n') if line.strip()]
    clean_text = ' '.join(lines)
    response = json.loads(clean_text)

    for i, obj in enumerate(response):
        if not check_url(obj['url']):
            del response[i]
    return response


def get_certificates(skill_name):
    openai.api_key = api_key
    completion = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"enrollable certificates with link to improve {skill_name} skills only name and url in JSON format",
        temperature=0.7,
        max_tokens=1938,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    response = completion.choices[0].text
    lines = [line.strip() for line in response.split('\n') if line.strip()]
    clean_text = ' '.join(lines)
    response = json.loads(clean_text)

    for i, obj in enumerate(response):
        if not check_url(obj['url']):
            del response[i]
    return response


def check_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        return True
    else:
        return False
