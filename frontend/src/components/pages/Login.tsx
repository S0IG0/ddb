import {FC, useContext, useState} from "react";
import {IUser} from "../../models";
import {Context, PStore} from "../../main.tsx";
import {observer} from "mobx-react-lite";

const Login: FC = () => {
    const [user, setUser] = useState<IUser>({
        username: "",
        password: "",
    });
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
                        value={user.username}
                        onChange={
                            event =>
                                setUser({...user, username: event.target.value})
                        }
                    />
                </div>
                <label className="form-label">You password</label>
                <div className="input-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={user.password}
                        onChange={
                            event =>
                                setUser({...user, password: event.target.value})
                        }
                    />
                </div>
                <div
                    className="btn btn-primary ps-3 pe-3"
                    onClick={() => store.login(user)}
                >
                    login
                </div>
            </form>
        </>
    );
}

export default observer(Login);