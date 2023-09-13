import {FC, useContext, useEffect, useState} from "react";
import {ResponsePosition} from "../forms/CreatePositionFrom.tsx";
import $api from "../../../../../http";
import Spinner from "../../../../ux/Spinner.tsx";
import {observer} from "mobx-react-lite";
import {Context, PStore} from "../../../../../main.tsx";

const ShowPosition: FC = () => {
    const {store} = useContext<PStore>(Context);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        $api.get<ResponsePosition[]>("/position/")
            .then(response => store.setPositions(response.data))
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
                    </tr>
                    </thead>

                    {!isLoading && <tbody>

                    {store.positions.map((position) => {
                        return (
                            <tr key={position.id}>
                                <th scope="row">{position.id}</th>
                                <td>{position.name}</td>
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

export default observer(ShowPosition);