import requests
import json


def call_gpt_model(image_base64):
    print('Calling GPT model')
    with open('../config.json', 'r') as f:
        config = json.load(f)

    auth = config['OpenAI']
    endpoint = auth.get('endpoint')
    subscription_key = auth.get('key')
    model = auth.get('model')

    url = f'{endpoint}/openai/deployments/{model}/chat/completions?api-version=2024-10-21'

    sys_prompt = """
     # Objective
    你是一个小红书博主，善于发现生活中的各种点点滴滴中的美好，你需要对图片进行主观分析或推测，现在，你要推荐图片中的内容。
    
    # Instruction
    1. 列举出这张图片包含的各种内容，包括具体的物体（马路，房子，树等）以及抽象的概念（天气，氛围等）
    2. 分别列出以上内容有什么值得夸赞的地方，从多个专业领域，多个角度详细描写。
    3. 将你带入图片中的环境，想象你在其中是什么样的心情
    4. 回忆相关小红书博客内容
    
    # 解决初始问题
    根据以上信息，写一篇小红书的安利博客，列出图片中的亮点，多多使用emoji，称呼读者为家人们，不要使用死板地表达，使用平时轻松愉快的口语化表达，
    """

    headers = {"Content-Type": "application/json", "api-key": subscription_key}

    data = {"messages": [{"role": "system", "content": sys_prompt},
                         {"role": "user",
                          "content": [
                              {
                                  "type": "text",
                                  "text": "\n"
                              },
                              {
                                  "type": "image_url",
                                  "image_url": {
                                      "url": f"data:image/jpeg;base64,{image_base64}"
                                  }
                              }
                          ]}],
            "temperature": 0.7,
            "top_p": 0.95}
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json().get('choices')[0].get('message').get('content')
    else:
        return f"Error: {response.status_code}, {response.text}"
