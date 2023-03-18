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
    print(response)
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

    # Remove empty spaces
    clean_text = ' '.join(lines)

    response = json.loads(clean_text)

    for i in response:
        print(i['url'])


    return response


def check_url(url):
    url = 'https://www.coursera.org/learn/python-data'
    response = requests.get(url)
    if response.status_code == 200:
        print(f'The link {url} is available.')
    else:
        print(f'The link {url} is not available.')
