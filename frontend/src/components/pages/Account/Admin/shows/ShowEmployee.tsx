import {FC, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {User} from "../../../../../models/response/RequestResponse.ts";
import {ResponsePosition} from "../forms/CreatePositionFrom.tsx";
import {ResponseDepartment} from "./ShowDepartment.tsx";
import {ResponseLevelPosition} from "./ShowLevelPosition.tsx";
import {Context, PStore} from "../../../../../main.tsx";
import $api from "../../../../../http";
import Spinner from "../../../../ux/Spinner.tsx";

export  interface ResponseEmployee {
    id: number,
    user: User
    departament: ResponseDepartment,
    position: ResponsePosition,
    level_position: ResponseLevelPosition,
    salary: string,
}

const ShowEmployee: FC = () => {
    const {store} = useContext<PStore>(Context);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        $api.get<ResponseEmployee[]>("/employee/")
            .then(response => store.setEmployees(response.data))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <div className="table-responsive ms-4 me-4">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Username</th>
                        <th scope="col">First_name</th>
                        <th scope="col">Last_name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department name</th>
                        <th scope="col">Department address</th>
                        <th scope="col">Position</th>
                        <th scope="col">Level position</th>
                        <th scope="col">Level position coefficient</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Finish salary</th>
                    </tr>
                    </thead>

                    {!isLoading && <tbody>

                    {store.employees.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.user.username}</td>
                                <td>{item.user.first_name}</td>
                                <td>{item.user.last_name}</td>
                                <td>{item.user.email}</td>
                                <td>{item.departament.name}</td>
                                <td>{item.departament.address}</td>
                                <td>{item.position.name}</td>
                                <td>{item.level_position.name}</td>
                                <td>{item.level_position.coefficient_salary}</td>
                                <td>{item.salary}</td>
                                <td>{Number(item.level_position.coefficient_salary) * Number(item.salary)}</td>
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

export default observer(ShowEmployee);