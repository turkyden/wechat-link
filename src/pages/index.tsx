import { ChangeEvent, useState } from 'react';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;

const origin = 'https://wechat-link.vercel.app';

export default function IndexPage() {
  const [url, setUrl] = useState('https://www.baidu.com');
  const [text, setText] = useState('长按识别二维码查看原文');

  const onUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const src = `${origin}/api?url=${url}&text=${text}`;

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="container text-center m-auto" style={{ width: 800 }}>
        <h2 className="text-5xl font-bold">Wechat Link</h2>
        <div className="pt-4 py-10">
          <a href="https://github.com/Turkyden/wechat-link" target="_blank">
            <img
              className="w-24"
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/Turkyden/wechat-link?style=social"
            />
          </a>
        </div>

        <img src={src} alt="Magic Link Card" />

        <div className="text-center py-10 space-y-10">
          <Paragraph copyable={{ text: src }}>{src}</Paragraph>

          <Input.Group compact size="large">
            <Input style={{ width: '30%' }} value={`${origin}/api`} disabled />
            <Input
              style={{ width: '35%' }}
              value={url}
              onChange={onUrlChange}
              addonBefore={<span>?url=</span>}
            />
            <Input
              style={{ width: '35%' }}
              value={text}
              onChange={onTextChange}
              addonBefore={<span>&text=</span>}
            />
          </Input.Group>
        </div>
      </div>

      <p className="absolute bottom-0 left-0 w-full text-gray-500 text-sm text-center sm:text-center py-10">
        MIT &amp; Created with 💜 By
        <a
          href="https://github.com/Turkyden"
          className="text-pink-400 hover:text-pink-500 ml-1 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Turkyden
        </a>
      </p>
    </div>
  );
}
