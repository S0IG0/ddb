import {FC} from "react";
import CustomButton from "../../../../ui/CustomButton.tsx";

const CreateDepartmentFrom: FC = () => {
    return (
        <>
            <form className="p-4 m-auto" style={{maxWidth: 500}}>
                {/*<div*/}
                {/*    hidden={errors.length === 0}>*/}
                {/*    {errors.map(error =>*/}
                {/*        <div*/}
                {/*            className="alert alert-danger"*/}
                {/*            role="alert"*/}
                {/*            key={error}*/}
                {/*        >*/}
                {/*            {error}*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}
                <label className="form-label">Name department</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Developer"
                    />
                </div>

                <label className="form-label">Address department</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Moscow street kostyakova 1/5"
                    />
                </div>
                <CustomButton
                    onClick={() => {
                    }}
                >
                    create
                </CustomButton>
            </form>
        </>
    );
}


export default CreateDepartmentFrom;