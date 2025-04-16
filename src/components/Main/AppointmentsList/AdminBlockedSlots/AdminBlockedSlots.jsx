import React, { useEffect, useState } from 'react';
import { databases, ID, Query } from '../../../../appwrite';

import classes from './AdminBlockedSlots.module.css';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const DISABLED_SLOTS_COLLECTION_ID = import.meta.env
    .VITE_DISABLED_SLOTS_COLLECTION_ID;

const HOURS = Array.from({ length: 9 }, (_, i) => `${11 + i}:00`);

const AdminBlockedSlots = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [slots, setSlots] = useState([]);
    const [message, setMessage] = useState('');

    const fetchAllBlockedSlots = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                DISABLED_SLOTS_COLLECTION_ID,
                [Query.limit(100), Query.orderDesc('$createdAt')]
            );

            const now = new Date();
            const todayStr = now.toISOString().split('T')[0];
            const currentHour = now.getHours();

            const filtered = response.documents.filter((slot) => {
                if (slot.date > todayStr) return true;
                if (slot.date < todayStr) return false;

                const slotHour = parseInt(slot.time.split(':')[0], 10);
                return slotHour >= currentHour;
            });

            setSlots(filtered);
        } catch (error) {
            console.error('Помилка завантаження слотів:', error);
        }
    };

    useEffect(() => {
        fetchAllBlockedSlots();
    }, []);

    const handleAddSlot = async () => {
        if (!date || !time) return;
        if (slots.find((s) => s.date === date && s.time === time)) {
            setMessage('Цей слот вже заблоковано.');
            return;
        }

        try {
            await databases.createDocument(
                DATABASE_ID,
                DISABLED_SLOTS_COLLECTION_ID,
                ID.unique(),
                { date, time }
            );
            setMessage('Слот додано!');
            setTime('');
            setDate('');
            fetchAllBlockedSlots();
        } catch (error) {
            console.error('Помилка при додаванні:', error);
            setMessage('Помилка при додаванні.');
        }
    };

    const handleDeleteSlot = async (id) => {
        const confirm = window.confirm('Видалити цей слот?');
        if (!confirm) return;

        try {
            await databases.deleteDocument(
                DATABASE_ID,
                DISABLED_SLOTS_COLLECTION_ID,
                id
            );
            setMessage('Слот видалено.');
            fetchAllBlockedSlots();
        } catch (error) {
            console.error('Помилка при видаленні:', error);
            setMessage('Помилка при видаленні.');
        }
    };

    return (
        <div className={`wrapper ${classes.blockedSlotsBlock}`}>
            <h2>Заборонені години по даті:</h2>
            <div className={classes.blockedSlotsContainer}>
                <label>
                    Дата:{' '}
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            setMessage('');
                        }}
                        className={classes.blockedSlotsDate}
                    />
                </label>

                <label>
                    Час:{' '}
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={classes.blockedSlotsTime}
                    >
                        <option value="">Обрати час</option>
                        {HOURS.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    onClick={handleAddSlot}
                    disabled={!date || !time}
                    className={
                        !date || !time
                            ? classes.blockedSlotsBtn
                            : classes.blockedSlotsBtnActive
                    }
                >
                    Заборонити час
                </button>

                {message && <p>{message}</p>}
            </div>
            <div className={classes.blockedSlotsList}>
                <h3>Всі заблоковані години:</h3>
                {slots.length === 0 ? (
                    <p>Список порожній.</p>
                ) : (
                    <ul>
                        {slots.map((slot) => (
                            <li key={slot.$id}>
                                {slot.date} — {slot.time}{' '}
                                <button
                                    onClick={() => handleDeleteSlot(slot.$id)}
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

export default AdminBlockedSlots;
