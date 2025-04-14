import classes from './Contacts.module.css';
import telegram from '../../../assets/images/telegram.svg';
import instagram from '../../../assets/images/instagram.svg';
import marker from '../../../assets/images/marker.svg';

const Contacts = () => {
    return (
        <section className={classes.contactsSection}>
            <div className="wrapper">
                <div className={classes.contactsContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2565.5656841688415!2d36.2570207!3d49.982003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0857a86a7f7%3A0x3d42881e28552834!2z0LLRg9C70LjRhtGPINCT0LXQvtGA0LPRltGPINCi0LDRgNCw0YHQtdC90LrQsCwgNTfQkCwg0KXQsNGA0LrRltCyLCDQpdCw0YDQutGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNjEwMDA!5e0!3m2!1sru!2sua!4v1743978008715!5m2!1sru!2sua"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className={classes.contactsMap}
                    ></iframe>
                    <div className={classes.contactsInfo}>
                        <div className={classes.contactsLocation}>
                            <h2>Адреса:</h2>
                            <a
                                href="https://maps.app.goo.gl/et4WCvjzUW6g6UKV7"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={marker} alt="marker" />
                                вулиця Георгія Тарасенка, 57А
                            </a>
                        </div>
                        <div className={classes.contactsLinks}>
                            <h2>Напишіть мені в телеграм або в дірект:</h2>
                            <a
                                href="https://t.me/hele_nails/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={telegram} alt="telegram" />
                                Телеграм
                            </a>
                            <a
                                href="https://www.instagram.com/hele_nails.kh/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={instagram} alt="instagram" />
                                Інстаграм
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacts;
