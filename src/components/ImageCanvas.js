import React, { useEffect, useRef } from 'react';
import { Canvas, Image as FabricImage, Textbox, Circle, Rect } from 'fabric';

const ImageCanvas = ({ selectedImage }) => {
  const canvasRef = useRef(null);
  const canvasFabricRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasFabricRef.current = new Canvas(canvasRef.current, {
      width: 600,
      height: 400,
    });

    FabricImage.fromURL(selectedImage.src.large, (img) => {
      canvasFabricRef.current.setBackgroundImage(img, canvasFabricRef.current.renderAll.bind(canvasFabricRef.current), {
        scaleX: canvasFabricRef.current.width / img.width,
        scaleY: canvasFabricRef.current.height / img.height,
      });
    });

    return () => {
      canvasFabricRef.current.dispose();
    };
  }, [selectedImage]);

  const addText = () => {
    if (!canvasFabricRef.current) return;
    const text = new Textbox('Enter text here', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#000000',
    });
    canvasFabricRef.current.add(text);
  };

  const addShape = (shape) => {
    if (!canvasFabricRef.current) return;
    let newShape;
    if (shape === 'circle') {
      newShape = new Circle({
        left: 200,
        top: 200,
        radius: 50,
        fill: 'red',
      });
    } else if (shape === 'rectangle') {
      newShape = new Rect({
        left: 200,
        top: 200,
        width: 100,
        height: 60,
        fill: 'blue',
      });
    }
    canvasFabricRef.current.add(newShape);
  };

  const downloadImage = () => {
    if (!canvasFabricRef.current) return;
    const dataURL = canvasFabricRef.current.toDataURL({
      format: 'png',
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited-image.png';
    link.click();
  };

  return (
    <div className="canvas-container">
      <div className="toolbar">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
};

export default ImageCanvas;