import { BrowserRouter, Routes, Route } from 'react-router';

import Header from './components/Header/Header';
import HeroSection from './components/Main/HeroSection/HeroSection';
import Services from './components/Main/Services/Services';
import AboutMe from './components/Main/AboutMe/AboutMe';
import Galery from './components/Main/Galery/Galery';
import Contacts from './components/Main/Contacts/Contacts';
import AppointmentForm from './components/Main/AppointmentForm/AppointmentForm';

import './App.css';
import AppointmentsList from './components/Main/AppointmentsList/AppointmentsList';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HeroSection />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/galery" element={<Galery />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/form" element={<AppointmentForm />} />
                        <Route
                            path="/administration"
                            element={<AppointmentsList />}
                        />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
