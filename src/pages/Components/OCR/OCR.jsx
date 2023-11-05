import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

const OCR = () => {
    const [image, setImage] = useState();
    const [outputText, setOutputText] = useState('');
    const [isRecognize, setIsRecognize] = useState(false);

    useEffect(() => {
        return () => {
            (image && URL.revokeObjectURL(image.preview));
        }
    }, [image]);

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        file.preview = URL.createObjectURL(file);
        console.log(file);
        clear();
        setImage(file);
    }

    const clear = () => {
        let c = document.getElementById('canvas');
        if (!c) return;
        let ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);
    }

    const draw = (words) => {
        let img = document.querySelector('img');
        let h = img.naturalHeight;
        let w = img.naturalWidth;
        let c = document.getElementById('canvas');
        c.height = h;
        c.width = w;
        let ctx = c.getContext('2d');
        ctx.clearRect(0, 0, w, h)
        ctx.beginPath();
        let bboxs = words.map((value) => value.bbox);
        bboxs.forEach((box) => {
            ctx.strokeStyle = 'red';
            ctx.rect(box.x0 - 2, box.y0 - 2, box.x1 - box.x0 + 2, box.y1 - box.y0 + 2);
            ctx.stroke();
        })
    }

    const recognizeCharacters = async () => {
        if (!image) return;
        const worker = await createWorker({
            workerPath: "worker.min.js",
            corePath: "tesseract-core-simd.wasm.js",
            workerBlobURL: false,
            logger: m => console.log(m.status + ":" + Math.round(m.progress * 100) + "%")
        })

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        let { data } = await worker.recognize(image);
        console.log(data);

        draw(data.words);

        setOutputText(data.text);
    }


    return (
        <>
            <div className="flex justify-center items-center w-full h-full bg-green-400">
                <div className="relative flex justify-center items-center gap-8  mt-16">
                    {/* Input */}
                    <div className="relative flex flex-col justify-center items-start h-[600px]">
                        <input className="hidden" type="file" id="input" accept="image/*" onChange={handlePreviewImage} />
                        <div className="h-[64px] w-[194px] bg-orange-300 absolute top-[14px] left-0 rounded-t-[30px] rounded-tr-[30%] rounded-br-xl" />
                        <label
                            className="w-[200px] p-4 ml-2 text-base z-10 text-white font-semibold rounded-full bg-green-400 text-center 
                        cursor-pointer hover:bg-blue-400 hover:shadow-md  active:bg-blue-500 duration-150 "
                            htmlFor="input"
                        >
                            Chọn một bức ảnh
                        </label>
                        <div className="flex flex-col justify-center items-center bg-orange-300 w-[500px] h-[500px] rounded-2xl rounded-tl-none">
                            {image && (
                                <>
                                    <p className="text-base">{image.name}</p>
                                    <div className=" relative m-5  max-h-[500px] max-w-[500px]">
                                        <canvas id="canvas" className=" absolute w-full h-full " />
                                        <img
                                            className="bg-contain max-h-full max-w-full "
                                            src={image.preview} alt="Không có ảnh" width={500} height={500}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={recognizeCharacters}
                        className="absolute top-0 left-[50%] translate-x-[-50%] p-4 bg-orange-400 rounded-full hover:shadow-md
                        text-sm text-white hover:scale-110 duration-150 "
                    >
                        Trích xuất
                    </button>

                    {/* Output */}
                    <div className="flex flex-col justify-between items-center w-[500px] h-[500px] bg-orange-300 mt-[56px] rounded-2xl ">
                        <div className="h-[75px] w-[484px] m-2 rounded-2xl bg-orange-500">

                        </div>
                        <div className="h-[400px] w-[484px] m-2 rounded-2xl bg-orange-500">
                            <textarea
                                readOnly
                                value={outputText}
                                className="p-2 text-sm rounded-2xl h-full w-full resize-none bg-transparent outline-none">
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OCR;