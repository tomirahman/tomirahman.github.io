import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Providers } from '@/components/Providers';
import ScrollProgress from '@/components/ScrollProgress';
import HomeClient from '@/components/HomeClient';
import PhotographyClient from '@/components/PhotographyClient';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <ScrollProgress />
                <Routes>
                    <Route path="/" element={<HomeClient />} />
                    <Route path="/photography" element={<PhotographyClient />} />
                </Routes>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
