import React, { useEffect, useState } from 'react';
import { databases, ID, Query } from '../../../../appwrite';

import classes from './AdminDisabledDates.module.css';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const DISABLED_DATES_COLLECTION_ID = import.meta.env
    .VITE_DISABLED_DATES_COLLECTION_ID;

const AdminDisabledDates = () => {
    const [dateInput, setDateInput] = useState('');
    const [disabledDates, setDisabledDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const todayStr = new Date().toISOString().split('T')[0];
    const futureOnly = (docs) => docs.filter((doc) => doc.date >= todayStr);

    const fetchDisabledDates = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                DISABLED_DATES_COLLECTION_ID,
                [Query.limit(100)]
            );
            const filtered = futureOnly(response.documents);
            setDisabledDates(filtered);
        } catch (error) {
            console.error('Помилка при завантаженні дат:', error);
        }
    };

    useEffect(() => {
        fetchDisabledDates();
    }, []);

    const handleAddDate = async () => {
        if (!dateInput) return;
        if (disabledDates.find((d) => d.date === dateInput)) {
            setMessage('Ця дата вже є у списку.');
            return;
        }

        setLoading(true);
        try {
            await databases.createDocument(
                DATABASE_ID,
                DISABLED_DATES_COLLECTION_ID,
                ID.unique(),
                { date: dateInput }
            );
            setMessage('Дату додано!');
            setDateInput('');
            fetchDisabledDates();
        } catch (error) {
            console.error('Помилка при додаванні дати:', error);
            setMessage('Помилка при додаванні.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDate = async (id) => {
        const confirm = window.confirm(
            'Ви впевнені, що хочете видалити цю дату?'
        );
        if (!confirm) return;

        try {
            await databases.deleteDocument(
                DATABASE_ID,
                DISABLED_DATES_COLLECTION_ID,
                id
            );
            setMessage('Дату видалено.');
            fetchDisabledDates();
        } catch (error) {
            console.error('Помилка при видаленні:', error);
            setMessage('Помилка при видаленні.');
        }
    };

    return (
        <div className={`wrapper ${classes.disabledDateBlock}`}>
            <h2>Заборонити дати для запису:</h2>
            <div className={classes.disabledDateContainer}>
                <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    disabled={loading}
                />
                <button
                    className={
                        loading || !dateInput
                            ? classes.DisabledBtn
                            : classes.activeBtn
                    }
                    onClick={handleAddDate}
                    disabled={loading || !dateInput}
                >
                    Додати дату
                </button>
                {message && <p>{message}</p>}
            </div>
            <h3>Список заборонених дат:</h3>
            <div className={classes.disabledDatesList}>
                {disabledDates.length === 0 ? (
                    <p>Немає заборонених дат.</p>
                ) : (
                    <ul>
                        {disabledDates.map((doc) => (
                            <li key={doc.$id}>
                                {doc.date}{' '}
                                <button
                                    onClick={() => handleDeleteDate(doc.$id)}
                                >
                                    Видалити
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminDisabledDates;
