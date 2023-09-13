import {FC, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context, PStore} from "../../../../../main.tsx";
import $api from "../../../../../http";
import Spinner from "../../../../ux/Spinner.tsx";

export  interface ResponsePriceList {
    id: number,
    name: string,
    price: string,
}

const ShowPriceList: FC = () => {
    const {store} = useContext<PStore>(Context);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        $api.get<ResponsePriceList[]>("/priceList/")
            .then(response => store.setPriceLists(response.data))
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
                        <th scope="col">Price</th>
                    </tr>
                    </thead>

                    {!isLoading && <tbody>

                    {store.priceLists.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
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

export default observer(ShowPriceList);