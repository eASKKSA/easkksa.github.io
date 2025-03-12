import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "@/pages/Home.tsx";
import Layout from "@/components/Layout.tsx";

function App() {

    return (
        <Router basename="/askksa-web">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
