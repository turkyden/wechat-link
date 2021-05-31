import { ChangeEvent, useState } from 'react';
import { Input, Typography, Button } from 'antd';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';

const { Paragraph } = Typography;

const origin =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://wechat-link.vercel.app';

export default function IndexPage() {
  const [url, setUrl] = useState('https://www.baidu.com');
  const [text, setText] = useState('长按识别二维码查看原文');

  const onUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const src = `${origin}/api?url=${url}&text=${text}`;

  const onExport = async (type = 'svg') => {
    const fileName = new Date().getTime().toString();
    const canvasDOM = document.querySelector('#canvas') as HTMLElement;
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    const sleep = () =>
      new Promise((resolve, reject) => {
        window.setTimeout(() => resolve(''), 100);
      });
    if (canvasDOM) {
      type === 'svg'
        ? saveAs(src, fileName)
        : html2canvas(canvasDOM).then((canvas: HTMLCanvasElement) => {
            console.log(canvas);
            canvas.toBlob((blob: Blob | null) => {
              if (blob) {
                saveAs(blob, fileName);
              }
            });
          });
      for (let index = 0; index < 5; index++) {
        await sleep();
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(30, 90),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
        });
      }
    }
  };

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

        <img id="canvas" src={src} alt="Magic Link Card" />

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

          <div className="flex justify-center items-center space-x-4">
            <Button
              type="primary"
              className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400"
              onClick={() => onExport('svg')}
            >
              Export as SVG
            </Button>

            <Button
              type="primary"
              className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400"
              onClick={() => onExport('png')}
            >
              Export as PNG
            </Button>
          </div>
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
