import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";

function App() {

    return (
        <Router basename="/askksa-web">
            <Routes>
                <Route path="/" element={<Home />}  />
            </Routes>
        </Router>
    )
}

export default App
