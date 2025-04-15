import { NavLink } from 'react-router';

import classes from './Services.module.css';

import serviceImg0 from '../../../assets/images/services/service0.png';
import serviceImg1 from '../../../assets/images/services/service1.png';
import serviceImg2 from '../../../assets/images/services/service2.png';
import serviceImg3 from '../../../assets/images/services/service3.png';
import serviceImg4 from '../../../assets/images/services/service4.png';
import serviceImg5 from '../../../assets/images/services/service5.png';
import serviceImg6 from '../../../assets/images/services/service6.png';
import serviceImg7 from '../../../assets/images/services/service7.png';
import serviceImg8 from '../../../assets/images/services/service8.png';
import serviceImg9 from '../../../assets/images/services/service9.png';
import serviceImg10 from '../../../assets/images/services/service10.png';
import serviceImg11 from '../../../assets/images/services/service11.png';
import serviceImg12 from '../../../assets/images/services/service12.png';

const AVAILABLE_SERVICES = [
    {
        id: '0',
        name: 'Манікюр Complex “Lite”',
        description: 'Манікюр, укріплення, покриття в один тон',
        image: serviceImg0,
        price: 600,
    },
    {
        id: '1',
        name: 'Манікюр Complex “Medium”',
        description:
            'Манікюр, укріплення, легкий дизайн або дизайн на декілька пальців',
        image: serviceImg1,
        price: 650,
    },
    {
        id: '2',
        name: 'Манікюр Complex “Hard”',
        description:
            'Манікюр, укріплення, підняття клюючих нігтів/донарощування, важкий дизайн або дизайн на всі нігті',
        image: serviceImg2,
        price: 700,
    },
    {
        id: '3',
        name: 'Манікюр без покриття',
        description: null,
        image: serviceImg3,
        price: 300,
    },
    {
        id: '4',
        name: 'Зняття покриття',
        description:
            'Зняття старого покриття (без послідуючого покриття), опил форми',
        image: serviceImg4,
        price: 100,
    },
    {
        id: '5',
        name: 'Нарощування Complex “Lite”',
        description:
            'Манікюр, нарощування будь якої довжини, покриття в один тон',
        image: serviceImg5,
        price: 800,
    },
    {
        id: '6',
        name: 'Нарощування Complex “Medium”',
        description:
            'Манікюр, нарощування будь якої довжини, легкий дизайн або дизайн на декілька пальців',
        image: serviceImg6,
        price: 900,
    },
    {
        id: '7',
        name: 'Нарощування Complex “Hard”',
        description:
            'Манікюр, нарощування або нарощування екстримальної довжини, покриття, важкий дизайн або дизайн на всі нігті',
        image: serviceImg7,
        price: 1000,
    },
    {
        id: '8',
        name: 'Корекція нарощування',
        description: 'Манікюр, корекція нарощування, покриття в один тон',
        image: serviceImg8,
        price: 700,
    },
    {
        id: '9',
        name: 'Зняття нарощування',
        description: null,
        image: serviceImg9,
        price: 200,
    },
    {
        id: '10',
        name: 'Педикюр Complex “Lite”',
        description: 'Обробка пальчиків та стопи без покриття',
        image: serviceImg10,
        price: 500,
    },
    {
        id: '11',
        name: 'Педикюр Complex “Medium”',
        description: 'Обробка пальчиків без стопи, покриття, дизайн',
        image: serviceImg11,
        price: 600,
    },
    {
        id: '12',
        name: 'Педикюр Complex “Hard”',
        description: 'Обробка пальчиків та стопи, покриття, дизайн',
        image: serviceImg12,
        price: 700,
    },
];

const Services = () => {
    return (
        <section className={classes.servicesSection}>
            <div className="wrapper">
                <div className={classes.servicesContainer}>
                    {AVAILABLE_SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className={classes.serviceCard}
                            style={{
                                backgroundImage: `url(${service.image})`,
                            }}
                        >
                            <div className={classes.serviceCardDescription}>
                                <h3>{service.name}</h3>
                                <h4>{service.description}</h4>
                                <div className={classes.serviceCardDescFlex}>
                                    <div className={classes.servicePrice}>
                                        {service.price}
                                        <span> грн</span>
                                    </div>
                                    <div className={classes.linkToForm}>
                                        <NavLink to="/form">
                                            Перейти до запису
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
