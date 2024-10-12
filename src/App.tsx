import { useEffect, useState } from 'react';
import './index.css';
function App() {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10);
  const [n, setN] = useState(0);

  const keys = ['Space', 'Enter', 'NumpadEnter'];
  const generateNumber = (m: number, x: number) => {
    const t: number = Math.random() * (270 - 30) + 30;
    const interval = setInterval(() => {
      const num = Math.floor(Math.random() * (x + 1 - m) + m);
      setN(num);
    }, 30);
    setTimeout(() => {
      clearInterval(interval);
    }, t);
  };

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      console.log(e);
      if (keys.includes(e.code)) {
        generateNumber(min, max);
      } else {
        switch (e.code) {
          case 'ArrowUp':
            setMin((prev) => prev + 1);
            break;
          case 'ArrowDown':
            setMin((prev) => prev - 1);
            break;
          case 'ArrowRight':
            setMax((prev) => prev + 1);
            break;
          case 'ArrowLeft':
            setMax((prev) => prev - 1);
            break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  });
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen text-white bg-[#141414]'>
        <div className='text-9xl mt-60'>{n}</div>
        <div className='flex flex-col items-center mt-60 text-xl space-y-1'>
          <p>Range (min-max)</p>
          <input
            size={5}
            type='number'
            value={min}
            className='rounded-full mt-2 text-black text-center'
            onChange={(e) => setMin(parseInt(e.target.value))}
          />
          <input
            size={5}
            type='number'
            value={max}
            className='rounded-full mt-1 text-black text-center'
            onChange={(e) => setMax(parseInt(e.target.value))}
          />
        </div>
        <div>
          <button
            onClick={() => generateNumber(min, max)}
            className='mt-5 text-3xl text-gray-100 rounded-full bg-gray-600 p-2'
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
