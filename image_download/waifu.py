import requests
from PIL import Image
import io
import base64
import sys

def getImage(model: str, prompt: str, negative_prompt: str, seed: int, sampler: str, steps: int, denoise_strength: float):
    url = 'http://127.0.0.1:7860'

    option_payload = {"sd_model_checkpoint": model}
    
    try:
        requests.post(url=f'{url}/sdapi/v1/txt2img', json=option_payload)
    except:
        print("Error")
        return
    
    payload = {
        "prompt": prompt,
        "negative_prompt": negative_prompt + ', chibi, child, loli, small person, futa',
        "seed": seed,
        "sampler_name": sampler,
        "steps": steps,
        "denoising_strength": denoise_strength
    }
    
    try:
        response = requests.post(url=f'{url}/sdapi/v1/txt2img', json=payload)
    except Exception:
        print("Error")
        return
    response = response.json()

    for i in response['images']:
        image = Image.open(io.BytesIO(base64.b64decode(i.split(",",1)[0])))
        
    image.save('waifu.png')
    print("Success")
    return
    # print(seed)

model = sys.argv[1]
prompt = sys.argv[2]
negative_prompt = sys.argv[3]
seed = int(sys.argv[4])
sampler = sys.argv[5]
steps = int(sys.argv[6])
denoise_strength = float(sys.argv[7])

getImage(model, prompt, negative_prompt, seed, sampler, steps, denoise_strength)
