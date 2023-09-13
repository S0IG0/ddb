import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {RequestResponse} from "../../../../models/response/RequestResponse.ts";
import $api from "../../../../http";
import Spinner from "../../../ux/Spinner.tsx";

interface Props {
    requests: RequestResponse[],
    setRequests: Dispatch<SetStateAction<RequestResponse[]>>,
}

const RequestTable: FC<Props> = ({requests, setRequests}) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        $api.get<RequestResponse[]>("/request/")
            .then(response => {
                setRequests(response.data);
            })
            .finally(() => setIsLoading(false))
    }, []);
    return (
        <>
            <div className="ms-4 me-4 pt-2 text-center border-top">
                YOU REQUESTS
            </div>

            <div className="table-responsive ms-4 me-4">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Manager FCs</th>
                        <th scope="col">Manager email</th>
                        <th scope="col">Date create</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price list</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>

                    {!isLoading && <tbody>

                    {requests.map((request, index) => {
                        const dateObject = new Date(request.create_time);

                        const year = dateObject.getFullYear();
                        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
                        const day = dateObject.getDate().toString().padStart(2, '0');
                        const hours = dateObject.getHours().toString().padStart(2, '0');
                        const minutes = dateObject.getMinutes().toString().padStart(2, '0');

                        const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;
                        return (
                            <tr key={request.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{`${request.manager.user.first_name} ${request.manager.user.last_name[0]}.`}</td>
                                <td>{request.manager.user.email}</td>
                                <td>{formattedDate}</td>
                                <td>{`${request.description.slice(0, 40)}...`}</td>
                                <td>{`${request.price_list.name} ${request.price_list.price}`}</td>
                                <td>{request.state.name}</td>
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

export default RequestTable;