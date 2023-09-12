import {FC, useContext, useState} from "react";
import {IRegisterCustomer} from "../../models";
import {Context, PStore} from "../../main.tsx";
import {observer} from "mobx-react-lite";

const Register: FC = () => {
    const [customer, setCustomer] = useState<IRegisterCustomer>(
        {
            user: {
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            },
            bank_account: '',
        },
    )
    const {store} = useContext<PStore>(Context);
    return (
        <>
            <form className="p-4 m-auto" style={{maxWidth: 500}}>
                <div
                    hidden={store.errors.length === 0}>
                    {store.errors.map(error =>
                        <div
                            className="alert alert-danger"
                            role="alert"
                            key={error}
                        >
                            {error}
                        </div>
                    )}
                </div>
                <label className="form-label">You username</label>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="username"
                        value={customer.user.username}
                        onChange={
                            event =>
                                setCustomer({...customer, user: {...customer.user, username: event.target.value}})
                        }
                    />
                </div>
                <label className="form-label">You email</label>
                <div className="input-group mb-1">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        value={customer.user.email}
                        onChange={
                            event =>
                                setCustomer({...customer, user: {...customer.user, email: event.target.value}})
                        }
                    />
                </div>
                <label className="form-label">You first name</label>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Jonh"
                        value={customer.user.first_name}
                        onChange={
                            event =>
                                setCustomer({...customer, user: {...customer.user, first_name: event.target.value}})
                        }
                    />
                </div>
                <label className="form-label">You last name</label>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rosso"
                        value={customer.user.last_name}
                        onChange={
                            event =>
                                setCustomer({...customer, user: {...customer.user, last_name: event.target.value}})
                        }
                    />
                </div>
                <label className="form-label">You bank account</label>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="836402743734"
                        value={customer.bank_account}
                        onChange={
                            event =>
                                setCustomer({...customer, bank_account: event.target.value})
                        }
                    />
                </div>
                <label className="form-label">You password</label>
                <div className="input-group mb-1">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={customer.user.password}
                        onChange={
                            event =>
                                setCustomer({...customer, user: {...customer.user, password: event.target.value}})
                        }
                    />
                </div>
                <label className="form-label">Repeat you password</label>
                <div className="input-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={customer.user.password}
                        onChange={
                            event =>
                                setCustomer({...customer, user: {...customer.user, password: event.target.value}})
                        }
                    />
                </div>
                <div
                    className="btn btn-primary ps-3 pe-3"
                    onClick={() => store.register(customer)}
                >
                    register
                </div>
            </form>
        </>
    );
}

export default observer(Register);