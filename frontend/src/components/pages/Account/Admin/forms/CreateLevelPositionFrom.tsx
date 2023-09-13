import {FC} from "react";
import CustomButton from "../../../../ui/CustomButton.tsx";

const CreateLevelPositionFrom: FC = () => {
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
                <label className="form-label">Name level position</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="senior"
                    />
                </div>

                <label className="form-label">Coefficient salary</label>
                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="1.8"
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


export default CreateLevelPositionFrom;