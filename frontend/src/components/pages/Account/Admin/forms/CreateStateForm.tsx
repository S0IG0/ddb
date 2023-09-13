import {FC} from "react";
import CustomButton from "../../../../ui/CustomButton.tsx";
// import $api from "../../../../../http";

const CreateStateForm: FC = () => {
    // const createState = () => {
    //     $api.post("/s")
    // }
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
                <label className="form-label">Name for state</label>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        placeholder="create"
                    />
                </div>
                <CustomButton
                    onClick={() => {}}
                >
                    create
                </CustomButton>
            </form>
        </>
    );
}

export default CreateStateForm;