import { useState } from 'react';

import classes from './Galery.module.css';
import image0 from '../../../assets/images/galery/galery0.png';
import image1 from '../../../assets/images/galery/galery1.png';
import image2 from '../../../assets/images/galery/galery2.png';
import image3 from '../../../assets/images/galery/galery3.png';
import image4 from '../../../assets/images/galery/galery4.png';
import image5 from '../../../assets/images/galery/galery5.png';
import image6 from '../../../assets/images/galery/galery6.png';
import image7 from '../../../assets/images/galery/galery7.png';
import image8 from '../../../assets/images/galery/galery8.png';
import image9 from '../../../assets/images/galery/galery9.png';
import image10 from '../../../assets/images/galery/galery10.png';
import image11 from '../../../assets/images/galery/galery11.png';
import image12 from '../../../assets/images/galery/galery12.png';
import image13 from '../../../assets/images/galery/galery13.png';
import image14 from '../../../assets/images/galery/galery14.png';
import image15 from '../../../assets/images/galery/galery15.png';
import image16 from '../../../assets/images/galery/galery16.png';
import image17 from '../../../assets/images/galery/galery17.png';
import image18 from '../../../assets/images/galery/galery18.png';
import image19 from '../../../assets/images/galery/galery19.png';
import image20 from '../../../assets/images/galery/galery20.png';
import image21 from '../../../assets/images/galery/galery21.png';
import image22 from '../../../assets/images/galery/galery22.png';
import image23 from '../../../assets/images/galery/galery23.png';
import image24 from '../../../assets/images/galery/galery24.png';
import image25 from '../../../assets/images/galery/galery25.png';
import image26 from '../../../assets/images/galery/galery26.png';
import image27 from '../../../assets/images/galery/galery27.png';
import image28 from '../../../assets/images/galery/galery28.png';
import image29 from '../../../assets/images/galery/galery29.png';

const Galery = () => {
    let [selectedImageID, setSelectedImageID] = useState(null);

    const galery = [
        { id: 0, imageSrc: image0 },
        { id: 1, imageSrc: image1 },
        { id: 2, imageSrc: image2 },
        { id: 3, imageSrc: image3 },
        { id: 4, imageSrc: image4 },
        { id: 5, imageSrc: image5 },
        { id: 6, imageSrc: image6 },
        { id: 7, imageSrc: image7 },
        { id: 8, imageSrc: image8 },
        { id: 9, imageSrc: image9 },
        { id: 10, imageSrc: image10 },
        { id: 11, imageSrc: image11 },
        { id: 12, imageSrc: image12 },
        { id: 13, imageSrc: image13 },
        { id: 14, imageSrc: image14 },
        { id: 15, imageSrc: image15 },
        { id: 16, imageSrc: image16 },
        { id: 17, imageSrc: image17 },
        { id: 18, imageSrc: image18 },
        { id: 19, imageSrc: image19 },
        { id: 20, imageSrc: image20 },
        { id: 21, imageSrc: image21 },
        { id: 22, imageSrc: image22 },
        { id: 23, imageSrc: image23 },
        { id: 24, imageSrc: image24 },
        { id: 25, imageSrc: image25 },
        { id: 26, imageSrc: image26 },
        { id: 27, imageSrc: image27 },
        { id: 28, imageSrc: image28 },
        { id: 29, imageSrc: image29 },
    ];

    const closeEnlargedView = () => {
        setSelectedImageID(null);
    };

    let selectedImage = galery.find((image) => image.id === selectedImageID);

    return (
        <section className={classes.galery}>
            <div className="wrapper">
                <div className={classes.galeryContainer}>
                    {galery.map((image) => (
                        <div
                            key={image.id}
                            className={classes.galeryImageBlock}
                        >
                            <img
                                src={image.imageSrc}
                                alt={`galeryImage${image.id}`}
                                onClick={() =>
                                    setSelectedImageID(
                                        (selectedImageID = image.id)
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            {selectedImage && (
                <div
                    className={classes.galeryImageOpenContainer}
                    onClick={closeEnlargedView}
                >
                    <div className={classes.galeryImageOpenBox}>
                        <img
                            src={selectedImage.imageSrc}
                            alt={`galeryImage${selectedImage.id}`}
                            className={classes.galeryImageOpen}
                        />
                        <div className={classes.galeryImageCloseBtn}>+</div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Galery;
