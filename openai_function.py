import os
import openai
import requests

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
    return response


def check_url(url):
    url = 'https://www.coursera.org/learn/python-data'
    response = requests.get(url)
    if response.status_code == 200:
        print(f'The link {url} is available.')
    else:
        print(f'The link {url} is not available.')
