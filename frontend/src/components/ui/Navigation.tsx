import {routers} from "../routers/Router.ts";
import {Link, Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.tsx";

function Navigation() {
    return (
        <>
            <ul className="nav">
                {Array.from(routers.values()).map(route =>
                    <li className="nav-item" key={route.path}>
                        <Link
                            className="nav-link"
                            to={route.path}
                        >{route.name}</Link>
                    </li>
                )}
            </ul>
            <Routes>
                {Array.from(routers.values()).map(route =>
                    <Route path={route.path} element={<route.component/>} key={route.name}></Route>
                )}
                <Route path={"*"} element={<NotFoundPage/>}></Route>
            </Routes>
        </>
    )
}

export default Navigation;