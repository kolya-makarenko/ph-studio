import React, { useState, useEffect } from 'react';
import { databases, Query } from '../../../appwrite';
import AdminDisabledDates from './AdminDisabledDates/AdminDisabledDates';
import AdminBlockedSlots from './AdminBlockedSlots/AdminBlockedSlots';

import classes from './AppointmentsList.module.css';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

const formatDateISO = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppointments = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);

            const dateSevenDaysAgoString = formatDateISO(sevenDaysAgo);

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.greaterThanEqual('date', dateSevenDaysAgoString),
                    Query.orderAsc('date'),
                    Query.orderAsc('time'),
                    Query.limit(200),
                ]
            );
            setAppointments(response.documents);
        } catch (err) {
            console.error('Помилка завантаження записів:', err);
            setError(`Не вдалося завантажити список записів. ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const formatDateTime = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            const userLocale = navigator.language || 'uk-UA';
            return new Date(isoString).toLocaleString(userLocale, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (e) {
            console.warn('Could not format date:', isoString, e);
            return isoString;
        }
    };

    if (isLoading) {
        return <p>Завантаження записів...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Помилка: {error}</p>;
    }

    return (
        <>
            <section className={classes.adminSection}>
                <div className="wrapper">
                    <h2>Записи (за останній тиждень та майбутні)</h2>
                    {appointments.length === 0 ? (
                        <p>
                            Немає записів за останній тиждень або на майбутнє.
                        </p>
                    ) : (
                        <table className={classes.table}>
                            <thead className={classes.tableHeader}>
                                <tr>
                                    <th>Ім'я</th>
                                    <th>Телефон</th>
                                    <th>Дата</th>
                                    <th>Час</th>
                                    <th>Вибрані Послуги</th>
                                    <th>Створено</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment.$id}>
                                        <td>{appointment.name}</td>
                                        <td>{appointment.phone}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>
                                            {Array.isArray(
                                                appointment.selectedServices
                                            )
                                                ? appointment.selectedServices.join(
                                                      ', '
                                                  )
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {formatDateTime(
                                                appointment.$createdAt
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <button
                        onClick={fetchAppointments}
                        disabled={isLoading}
                        className={classes.refreshBtn}
                    >
                        {isLoading ? 'Оновлення...' : 'Оновити список'}
                    </button>
                </div>
            </section>
            <AdminDisabledDates />
            <AdminBlockedSlots />
        </>
    );
}

export default AppointmentsList;
