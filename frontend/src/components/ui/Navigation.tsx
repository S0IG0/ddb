import {routers} from "../routers/Router.ts";
import {NavLink} from "react-router-dom";
import {FC} from "react";

interface isActive {
    isActive: boolean,
}

const Navigation: FC = () => {
    const setActive = ({isActive}: isActive) =>
        isActive ?
            "link link-underline-primary link-offset-3" :
            "link-underline link-underline-opacity-0"
    return (
        <>
            <ul className="nav border-bottom p-2">
                {Array.from(routers.values()).map(route =>
                    <li className="nav-item m-2" key={route.path}>
                        <NavLink
                            className={setActive}
                            to={route.path}
                        >{route.name}</NavLink>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Navigation;