// src/App.tsx
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {ErrorBoundary} from '@/components/ErrorBoundary';
import Home from '@/pages/Home';
import Layout from '@/components/Layout';
import {useAppStore} from "@/store/appStore.ts";
import {useEffect} from "react";

function App() {
    const initializeTheme = useAppStore((state) => state.initializeTheme);

    useEffect(() => {
        // Initialize theme on app mount
        return initializeTheme();
    }, [initializeTheme]);
    return (
        <ErrorBoundary>
            <Router basename="/askksa-web">
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Navigate to="/pt" replace/>}/>
                        {/* Portuguese routes */}
                        <Route path="/pt" element={<Home/>}/>
                        {/* ...other pt routes */}
                        {/* English routes */}
                        <Route path="/en" element={<Home/>}/>
                        {/* ...other en routes */}
                        {/* 404 fallback */}
                        <Route path="*" element={<Navigate to="/pt" replace/>}/>
                    </Route>
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
