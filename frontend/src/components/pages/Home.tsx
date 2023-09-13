import {FC} from "react";
import TokenService from "../../services/TokenService.ts";

const Home: FC = () => {
    return (
        <>
            {TokenService.loadTokensFromLocalStorage().access}
            <div className="text-center m-auto">
                Home
            </div>
        </>
    );
}

export default Home;