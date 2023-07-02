import { ReactElement, useEffect, useState } from "react"
import Image from 'next/image'

const shuffled = (arr: string[]) => arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

const generatedRandomImage = async  () => {
  const urlImage = await fetch('https://picsum.photos/200/300').then(image => image.url)

  return urlImage;
};

const MemoryGame: React.FC = (): ReactElement => {
  const [images, setImages] = useState<string[]>([]);
  const [imagesCopied, setImagesCopied] = useState<string[]>([]);

  useEffect(() => {  
    Promise.all([...Array(5)].map(() => generatedRandomImage())).then((imagesReturn) => {
      setImages(imagesReturn)
      setImagesCopied(shuffled(imagesReturn));
    });
  }, [])
  
  if(images.length === 0) 'Carregando...';

  return (
    <div className="memory-game">
      {
        images.map(image => <Image
          src={image}
          width={200}
          height={300}
          alt="Picture 1"
          key={image}
        />)
      }

      {
        imagesCopied.map(image => <Image
          src={image}
          width={200}
          height={300}
          alt="Picture 2"
          key={image}
        />)
      }
    </div>
  )
}

export default MemoryGame;