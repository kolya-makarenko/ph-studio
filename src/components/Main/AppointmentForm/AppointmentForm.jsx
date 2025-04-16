import React, { useState, useEffect, useMemo } from 'react';
import { databases, ID, Query } from '../../../appwrite';

import classes from './AppointmentForm.module.css';
import telegram from '../../../assets/images/telegram.svg';
import instagram from '../../../assets/images/instagram.svg';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;
const DISABLED_DATES_COLLECTION_ID = import.meta.env
    .VITE_DISABLED_DATES_COLLECTION_ID;
const DISABLED_SLOTS_COLLECTION_ID = import.meta.env
    .VITE_DISABLED_SLOTS_COLLECTION_ID;

const AVAILABLE_SERVICES = [
    {
        id: '0',
        name: 'Манікюр Complex “Lite”',
        description: 'Манікюр, укріплення, покриття в один тон',
        price: 600,
    },
    {
        id: '1',
        name: 'Манікюр Complex “Medium”',
        description:
            'Манікюр, укріплення, легкий дизайн або дизайн на декілька пальців',
        price: 650,
    },
    {
        id: '2',
        name: 'Манікюр Complex “Hard”',
        description:
            'Манікюр, укріплення, підняття клюючих нігтів/донарощування, важкий дизайн або дизайн на всі нігті',
        price: 700,
    },
    { id: '3', name: 'Манікюр без покриття', description: null, price: 300 },
    {
        id: '4',
        name: 'Зняття покриття',
        description:
            'Зняття старого покриття (без послідуючого покриття), опил форми',
        price: 100,
    },
    {
        id: '5',
        name: 'Нарощування Complex “Lite”',
        description:
            'Манікюр, нарощування будь якої довжини, покриття в один тон',
        price: 800,
    },
    {
        id: '6',
        name: 'Нарощування Complex “Medium”',
        description:
            'Манікюр, нарощування будь якої довжини, легкий дизайн або дизайн на декілька пальців',
        price: 900,
    },
    {
        id: '7',
        name: 'Нарощування Complex “Hard”',
        description:
            'Манікюр, нарощування або нарощування екстримальної довжини, покриття, важкий дизайн або дизайн на всі нігті',
        price: 1000,
    },
    {
        id: '8',
        name: 'Корекція нарощування',
        description: 'Манікюр, корекція нарощування, покриття в один тон',
        price: 700,
    },
    { id: '9', name: 'Зняття нарощування', description: null, price: 200 },
    {
        id: '10',
        name: 'Педикюр Complex “Lite”',
        description: 'Обробка пальчиків та стопи без покриття',
        price: 500,
    },
    {
        id: '11',
        name: 'Педикюр Complex “Medium”',
        description: 'Обробка пальчиків без стопи, покриття, дизайн',
        price: 600,
    },
    {
        id: '12',
        name: 'Педикюр Complex “Hard”',
        description: 'Обробка пальчиків та стопи, покриття, дизайн',
        price: 700,
    },
];

const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour < 20; hour++) {
        slots.push(`${String(hour).padStart(2, '0')}:00`);
    }
    return slots;
};

const ALL_TIME_SLOTS = generateTimeSlots();

const AppointmentForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState(
        AVAILABLE_SERVICES.reduce((acc, service) => {
            acc[service.id] = false;
            return acc;
        }, {})
    );
    const [selectedTime, setSelectedTime] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [disabledDates, setDisabledDates] = useState([]);
    const [disabledSlots, setDisabledSlots] = useState([]);

    const formatDateISO = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const minBookingDate = useMemo(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return formatDateISO(tomorrow);
    }, []);

    const isDateDisabled = (dateStr) => disabledDates.includes(dateStr);

    const fetchDisabledDates = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                DISABLED_DATES_COLLECTION_ID,
                [Query.limit(100)]
            );
            const dates = response.documents.map((doc) => doc.date);
            setDisabledDates(dates);
        } catch (error) {
            console.error('Помилка завантаження заборонених дат:', error);
        }
    };

    const fetchDisabledSlots = async (selectedDate) => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                DISABLED_SLOTS_COLLECTION_ID,
                [Query.equal('date', selectedDate), Query.limit(100)]
            );
            const times = response.documents.map((doc) => doc.time);
            setDisabledSlots(times);
        } catch (error) {
            console.error('Помилка завантаження заблокованих слотів:', error);
        }
    };

    const handleServiceChange = (event) => {
        const { name, checked } = event.target;
        setSelectedServices((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const fetchBookedSlots = async (selectedDate) => {
        if (!selectedDate) return;
        setIsLoadingSlots(true);
        setBookedSlots([]);
        setSelectedTime('');
        setMessage('');

        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal('date', selectedDate),
                    Query.limit(100),
                    Query.select(['time']),
                ]
            );
            setBookedSlots(response.documents.map((doc) => doc.time));
        } catch (error) {
            console.error('Помилка завантаження слотів:', error);
        } finally {
            setIsLoadingSlots(false);
        }
    };

    useEffect(() => {
        fetchDisabledDates();
    }, []);

    useEffect(() => {
        if (date) {
            fetchBookedSlots(date);
            fetchDisabledSlots(date);
        }
    }, [date]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const servicesToSend = Object.entries(selectedServices)
            .filter(([_, isSelected]) => isSelected)
            .map(
                ([id]) =>
                    AVAILABLE_SERVICES.find((s) => s.id === id)?.name || id
            );

        if (!name || !phone || !date || !selectedTime) {
            setMessage('Помилка: Заповніть усі поля та виберіть час.');
            return;
        }

        if (isDateDisabled(date)) {
            setMessage('Помилка: Ця дата недоступна для запису.');
            return;
        }

        if (
            bookedSlots.includes(selectedTime) ||
            disabledSlots.includes(selectedTime)
        ) {
            setMessage(
                'Помилка: Цей час недоступний. Виберіть інший, будь ласка.'
            );
            return;
        }

        if (servicesToSend.length === 0) {
            setMessage('Помилка: Оберіть хоча б одну послугу.');
            return;
        }

        setIsLoading(true);
        try {
            await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    name,
                    phone,
                    date,
                    time: selectedTime,
                    selectedServices: servicesToSend,
                }
            );
            setMessage('Запис успішно створено!');
            setName('');
            setPhone('');
            setDate('');
            setSelectedTime('');
            setSelectedServices(
                AVAILABLE_SERVICES.reduce((acc, service) => {
                    acc[service.id] = false;
                    return acc;
                }, {})
            );
        } catch (error) {
            console.error('Помилка запису:', error);
            setMessage('Помилка при створенні запису.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={classes.formSection}>
            <div className="wrapper">
                <div className={classes.formContainer}>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <div className={classes.inputsNamePhone}>
                            <div className={classes.inputForm}>
                                <label htmlFor="name">Ім'я:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    placeholder="Ім'я"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={classes.inputForm}>
                                <label htmlFor="phone">Номер телефону:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    placeholder="+380987654321"
                                    onChange={(e) => setPhone(e.target.value)}
                                    pattern="[0-9\+]*"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={classes.labelForServices}>
                                Послуги (можна обрати декілька):
                            </label>
                            <div className={classes.inputFormCheckbox}>
                                {AVAILABLE_SERVICES.map((service) => (
                                    <label key={service.id}>
                                        <input
                                            type="checkbox"
                                            name={service.id}
                                            checked={
                                                selectedServices[service.id]
                                            }
                                            onChange={handleServiceChange}
                                            disabled={isLoading}
                                        />
                                        <span
                                            className={classes.checkmark}
                                        ></span>
                                        {service.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className={classes.inputFormDate}>
                            <label htmlFor="date">Дата:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                min={minBookingDate}
                                onChange={(e) => {
                                    const selected = e.target.value;
                                    if (isDateDisabled(selected)) {
                                        setMessage(
                                            'Помилка: Ця дата недоступна для запису. Оберіть іншу, будь ласка.'
                                        );
                                        setDate('');
                                    } else {
                                        setMessage('');
                                        setDate(selected);
                                    }
                                }}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="time"
                                className={classes.labelForTime}
                            >
                                Час (доступно з 11:00 до 20:00):
                            </label>
                            {date ? (
                                isLoadingSlots ? (
                                    <p className={classes.txtForTime}>
                                        Завантаження доступного часу...
                                    </p>
                                ) : (
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                        }}
                                    >
                                        {ALL_TIME_SLOTS.map((slot) => {
                                            const isBooked =
                                                bookedSlots.includes(slot);
                                            const isSelected =
                                                selectedTime === slot;
                                            return (
                                                <button
                                                    type="button"
                                                    key={slot}
                                                    onClick={() =>
                                                        setSelectedTime(slot)
                                                    }
                                                    disabled={
                                                        isBooked || isLoading
                                                    }
                                                    style={{
                                                        padding: '10px',
                                                        cursor: isBooked
                                                            ? 'not-allowed'
                                                            : 'pointer',
                                                        backgroundColor:
                                                            isSelected
                                                                ? '#fff'
                                                                : isBooked
                                                                ? '#e9ecef'
                                                                : '#000',
                                                        color: isSelected
                                                            ? '#000'
                                                            : isBooked
                                                            ? '#6c757d'
                                                            : '#fff',
                                                        border: `1px solid ${
                                                            isSelected
                                                                ? '#fff'
                                                                : isBooked
                                                                ? '#ced4da'
                                                                : '#ccc'
                                                        }`,
                                                        borderRadius: '10px',
                                                        opacity: isBooked
                                                            ? 0.6
                                                            : 1,
                                                        minWidth: '60px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {slot}
                                                </button>
                                            );
                                        })}
                                        {ALL_TIME_SLOTS.length > 0 &&
                                            bookedSlots.length ===
                                                ALL_TIME_SLOTS.length && (
                                                <p
                                                    style={{
                                                        color: 'orange',
                                                        width: '100%',
                                                    }}
                                                >
                                                    На вибрану дату вільних
                                                    місць немає.
                                                </p>
                                            )}
                                    </div>
                                )
                            ) : (
                                <p className={classes.txtForTime}>
                                    Будь ласка, спочатку виберіть дату.
                                </p>
                            )}
                        </div>
                        {message && (
                            <p
                                style={{
                                    marginTop: '10px',
                                    color: message.startsWith('Помилка')
                                        ? 'red'
                                        : 'green',
                                }}
                            >
                                {message}
                            </p>
                        )}
                        <div className={classes.btnContainer}>
                            <button
                                className={
                                    isLoading || isLoadingSlots || !selectedTime
                                        ? classes.btnDisabled
                                        : classes.btnActive
                                }
                                type="submit"
                                disabled={
                                    isLoading || isLoadingSlots || !selectedTime
                                }
                            >
                                {isLoading
                                    ? 'Відправка...'
                                    : 'Відправити запис'}
                            </button>
                        </div>
                    </form>
                    <div className={classes.formDescription}>
                        <h2>
                            Для запису заповніть форму або зв'яжіться зі мною в
                            телеграм чи дірект
                        </h2>
                        <div className={classes.formLinks}>
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

export default AppointmentForm;
