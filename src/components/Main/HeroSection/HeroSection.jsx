import classes from './HeroSection.module.css';
import telegram from '../../../assets/images/telegram.svg';
import instagram from '../../../assets/images/instagram.svg';
import marker from '../../../assets/images/marker.svg';

const HeroSection = () => {
    return (
        <section className={classes.HeroSection}>
            <div className={classes.HeroSectionText}>
                <h3>NAILS STUDIO</h3>
                <h1>PH studio</h1>
                <p>
                    Доглянуті нігті сьогодні – це більше, ніж забаганка та
                    примха, це сучасний must have. Яскравий, стильний манікюр
                    також здатний доповнити жіночий образ, як красива біжутерія
                    або аксесуари. Гігієнічні процедури показані взагалі всім, і
                    дівчатам, і чоловікам. В мене ви отримаєте широкий спектр
                    послуг з догляду за нігтями.
                </p>
            </div>
            <div className={classes.HeroSectionLinks}>
                <a
                    href="https://t.me/hele_nails/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={telegram} alt="telegram" />
                </a>
                <a
                    href="https://www.instagram.com/hele_nails.kh/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={instagram} alt="instagram" />
                </a>
                <a
                    href="https://maps.app.goo.gl/i8kLKnQgMqo1cdv56"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={marker} alt="marker" />
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
