import {FC, useContext, useState} from "react";
import {ResponseLevelPosition} from "../ShowLevelPosition.tsx";
import {Context, PStore} from "../../../../../../main.tsx";
import {CreateLevelPosition} from "../../forms/CreateLevelPositionFrom.tsx";
import Spinner from "../../../../../ux/Spinner.tsx";
import $api from "../../../../../../http";

interface Props {
    deleteFunction: (id: number) => void,
    item: ResponseLevelPosition,
    isLoadingDelete: boolean,
}

const LineLevelPosition: FC<Props> = ({deleteFunction, isLoadingDelete, item}) => {
    const {store} = useContext<PStore>(Context);
    const [isEdit, setIsEdit] = useState(false);
    const [newItem, setNewItem] = useState<CreateLevelPosition>({...item, coefficient_salary: Number(item.coefficient_salary)});
    const [isLoading, setIsLoading] = useState(false);

    const editLevelPosition = (id: number) => {
        setIsLoading(true);
        $api.put<ResponseLevelPosition>(`/levelPosition/${id}/`, newItem)
            .then((response) => {
                store.setEntityById(store.levelPositions, id, response.data);
                setIsEdit(false);
            })
            .catch(() => setNewItem({...item, coefficient_salary: Number(item.coefficient_salary)}))
            .finally(() => setIsLoading(false));
    }
    return (
        <>
            <th scope="row">{item.id}</th>
            <td>
                <input
                    disabled={!isEdit}
                    className="form-control text-nowrap"
                    value={newItem.name}
                    onChange={event => setNewItem({...newItem, name: event.target.value})}
                />
            </td>
            <td>
                <input
                    disabled={!isEdit}
                    className="form-control text-nowrap"
                    value={newItem.coefficient_salary}
                    onChange={event => setNewItem({...newItem, coefficient_salary: Number(event.target.value)})}
                />
            </td>
            <td>
                <div className="btn btn-danger text-nowrap"
                     onClick={() => deleteFunction(item.id)}>
                    {isLoadingDelete ? <Spinner/> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-trash mb-1" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>}
                </div>
            </td>
            <td>
                <div className={isEdit ? "btn btn-primary text-nowrap" : "btn btn-success text-nowrap"} onClick={() => {
                    if (isEdit) {
                        editLevelPosition(item.id);
                    }

                    setIsEdit(!isEdit);
                }}>
                    {isEdit ? isLoading ? <Spinner/> : "save" :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-pencil-square mb-1"
                             viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>}
                </div>
            </td>
        </>
    );
}

export default LineLevelPosition;