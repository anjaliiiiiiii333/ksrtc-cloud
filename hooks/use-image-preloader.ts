import { useEffect, useState } from "react";

export const useImagePreloader = (
    folderPath: string,
    fileNamePrefix: string,
    frameCount: number,
    extension: string = "jpg"
) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const imageArray: HTMLImageElement[] = [];

        const loadImages = async () => {
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameIndex = i.toString().padStart(3, "0");
                img.src = `${folderPath}/${fileNamePrefix}${frameIndex}.${extension}`;

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === frameCount) {
                        setLoaded(true);
                    }
                };

                imageArray.push(img);
            }
            setImages(imageArray);
        };

        loadImages();
    }, [folderPath, fileNamePrefix, frameCount, extension]);

    return { images, loaded };
};
