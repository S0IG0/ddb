import {FC, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context, PStore} from "../../../../../main.tsx";
import $api from "../../../../../http";
import {ResponsePosition} from "../forms/CreatePositionFrom.tsx";
import Spinner from "../../../../ux/Spinner.tsx";

export interface ResponseDepartment {
    id: number,
    name: string,
    address: string,
}

const ShowDepartment: FC = () => {
    const {store} = useContext<PStore>(Context);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        $api.get<ResponseDepartment[]>("/department/")
            .then(response => store.setDepartments(response.data))
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
                        <th scope="col">Address</th>
                    </tr>
                    </thead>

                    {!isLoading && <tbody>

                    {store.departments.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
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

export default observer(ShowDepartment);