import {
    BrowserRouter, Route,
    Routes,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Dropzone from "./components/Home";


function App() {
    return (
        <Container className="bg-black px-0 py-2 m-0" style={{ minHeight: "100vh", fontFamily: "Oswald" }} fluid>
            <div className="text-light">
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/'
                            element={<Dropzone />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </Container>
    );
}

export default App;
