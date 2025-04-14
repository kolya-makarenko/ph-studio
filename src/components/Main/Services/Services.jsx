import { useState } from 'react';
import classes from './Services.module.css';

const Services = () => {
    let [activeBtn, setActiveBtn] = useState(1);

    let procedures, isActive1, isActive2, isActive3;

    if (activeBtn === 1) {
        procedures = [
            {
                id: 0,
                name: 'Манікюр Complex “Lite”',
                description: 'Манікюр, укріплення, покриття в один тон',
                price: 600,
            },
            {
                id: 1,
                name: 'Манікюр Complex “Medium”',
                description:
                    'Манікюр, укріплення, легкий дизайн або дизайн на декілька пальців',
                price: 650,
            },
            {
                id: 2,
                name: 'Манікюр Complex “Hard”',
                description:
                    'Манікюр, укріплення, підняття клюючих нігтів/донарощування, важкий дизайн або дизайн на всі нігті',
                price: 700,
            },
            {
                id: 3,
                name: 'Манікюр без покриття',
                description: null,
                price: 300,
            },
            {
                id: 4,
                name: 'Зняття покриття',
                description:
                    'Зняття старого покриття (без послідуючого покриття), опил форми',
                price: 100,
            },
        ];
        isActive1 = 'active';
        isActive2 = '';
        isActive3 = '';
    } else if (activeBtn === 2) {
        procedures = [
            {
                id: 5,
                name: 'Нарощування Complex “Lite”',
                description:
                    'Манікюр, нарощування будь якої довжини, покриття в один тон',
                price: 800,
            },
            {
                id: 6,
                name: 'Нарощування Complex “Medium”',
                description:
                    'Манікюр, нарощування будь якої довжини, легкий дизайн або дизайн на декілька пальців',
                price: 900,
            },
            {
                id: 7,
                name: 'Нарощування Complex “Hard”',
                description:
                    'Манікюр, нарощування або нарощування екстримальної довжини, покриття, важкий дизайн або дизайн на всі нігті',
                price: 1000,
            },
            {
                id: 8,
                name: 'Корекція нарощування',
                description:
                    'Манікюр, корекція нарощування, покриття в один тон',
                price: 700,
            },
            {
                id: 9,
                name: 'Зняття нарощування',
                description: null,
                price: 200,
            },
        ];
        isActive1 = '';
        isActive2 = 'active';
        isActive3 = '';
    } else if (activeBtn === 3) {
        procedures = [
            {
                id: 10,
                name: 'Педикюр Complex “Lite”',
                description: 'Обробка пальчиків та стопи без покриття',
                price: 500,
            },
            {
                id: 11,
                name: 'Педикюр Complex “Medium”',
                description: 'Обробка пальчиків без стопи, покриття, дизайн',
                price: 600,
            },
            {
                id: 12,
                name: 'Педикюр Complex “Hard”',
                description: 'Обробка пальчиків та стопи, покриття, дизайн',
                price: 700,
            },
        ];
        isActive1 = '';
        isActive2 = '';
        isActive3 = 'active';
    }

    return (
        <section className={classes.servicesSection}>
            <div className="wrapper">
                <div className={classes.servicesSectionBtns}>
                    <ul>
                        <li>
                            <button
                                className={`servicesSectionBtn ${isActive1}`}
                                onClick={() => setActiveBtn((activeBtn = 1))}
                            >
                                Манікюр
                            </button>
                        </li>
                        <li>
                            <button
                                className={`servicesSectionBtn ${isActive2}`}
                                onClick={() => setActiveBtn((activeBtn = 2))}
                            >
                                Нарощування
                            </button>
                        </li>
                        <li>
                            <button
                                className={`servicesSectionBtn ${isActive3}`}
                                onClick={() => setActiveBtn((activeBtn = 3))}
                            >
                                Педикюр
                            </button>
                        </li>
                    </ul>
                    <div className={classes.servicesList}>
                        {procedures.map((procedure) => (
                            <div
                                key={procedure.id}
                                className={classes.serviceItem}
                            >
                                <div className={classes.serviceDescription}>
                                    <h3>{procedure.name}</h3>
                                    <h4>{procedure.description}</h4>
                                </div>
                                <div className={classes.servicePrice}>
                                    <p>
                                        {procedure.price} <span>грн</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
