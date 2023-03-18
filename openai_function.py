import openai
import requests
import json

api_key = "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"


def get_courses(skill_name, old_response, experience_level):
    response = []
    openai.api_key = api_key
    cnt = 0
    while len(response) == 0:
        completion = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"enrollable {experience_level} courses with link to improve {skill_name} skills only name and\
             url in JSON format",
            temperature=0.7,
            max_tokens=1938,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        response = completion.choices[0].text
        lines = [line.strip() for line in response.split('\n') if line.strip()]
        clean_text = ' '.join(lines)
        if len(clean_text) != 0:
            response = json.loads(clean_text)
            for i, obj in enumerate(response):
                if not check_url(obj['url']):
                    del response[i]
            print(old_response)
            set2 = set(old_response)
            response = [obj['url'] for i, obj in enumerate(response) if obj['url'] not in set2]
        print(cnt + 1)
    return response


def get_certificates(skill_name, old_response, experience_level):
    response = []
    openai.api_key = api_key
    while len(response) == 0:
        completion = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"enrollable {experience_level} certificates with link to improve {skill_name} skills only name \
            and url in JSON format",
            temperature=0.7,
            max_tokens=1938,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        response = completion.choices[0].text
        lines = [line.strip() for line in response.split('\n') if line.strip()]
        clean_text = ' '.join(lines)
        if len(clean_text) != 0:
            response = json.loads(clean_text)
            for i, obj in enumerate(response):
                if not check_url(obj['url']):
                    del response[i]
            print(old_response)
            set2 = set(old_response)
            response = [obj['url'] for i, obj in enumerate(response) if obj['url'] not in set2]
    return response


def check_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        return True
    else:
        return False
