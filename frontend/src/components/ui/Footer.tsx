import {FC} from "react";

const Footer: FC = () => {
    return (
        <>
            <footer className="mt-auto text-center border-top p-3">
                © {new Date().getFullYear()} Company, Inc
            </footer>
        </>
    );
}

export default Footer;