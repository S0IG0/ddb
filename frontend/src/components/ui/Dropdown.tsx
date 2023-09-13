import {Dispatch, FC, SetStateAction} from 'react';

export interface Item {
    name: string,
    id: number,
}

interface Props {
    data: Item[],
    choiceItem: Item,
    setChoiceItem:  Dispatch<SetStateAction<Item>>,
}

const Dropdown: FC<Props> = ({data, choiceItem, setChoiceItem}) => {
    return (
        <>
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {choiceItem.name}
                </button>
                <ul className="dropdown-menu">
                    {data.map(item =>
                        <li
                            key={item.id}
                            onClick={() => setChoiceItem(item)}
                        >
                            <div className="dropdown-item btn">{item.name}</div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default Dropdown;
