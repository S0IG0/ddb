import {FC, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context, PStore} from "../../../../../main.tsx";
import $api from "../../../../../http";
import Spinner from "../../../../ux/Spinner.tsx";

export  interface ResponseLevelPosition {
    id: boolean,
    name: string,
    coefficient_salary: string,
}

const ShowLevelPosition: FC = () => {
    const {store} = useContext<PStore>(Context);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        $api.get<ResponseLevelPosition[]>("/levelPosition/")
            .then(response => store.setLevelPositions(response.data))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <div className="table-responsive ms-4 me-4">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Name</th>
                        <th scope="col">Coefficient salary</th>
                    </tr>
                    </thead>

                    {!isLoading && <tbody>

                    {store.levelPositions.map((levelPosition) => {
                        return (
                            <tr key={levelPosition.id}>
                                <th scope="row">{levelPosition.id}</th>
                                <td>{levelPosition.name}</td>
                                <td>{levelPosition.coefficient_salary}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                    }
                </table>
                {isLoading &&
                    <div className="text-center">
                        <Spinner/>
                    </div>
                }
            </div>
        </>
    );
}

export default observer(ShowLevelPosition);