import requests
import urllib.request
import sys

def getImage(prompt, apiKey: str):

    headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
    }

    payload = {
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024"

    }
    response = requests.post(url=f'https://api.openai.com/v1/images/generations', headers=headers, json=payload)
    response = response.json()
    try:
        imageURL = response["data"][0]["url"]
    except KeyError:
        print("Error")
        return
    urllib.request.urlretrieve(imageURL, "../vision.png")
    print("Success")


getImage(sys.argv[1], sys.argv[2])