import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <div style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Spinner
                animation="border"
                role="status"
                style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                    display: "block"
                }}
            />
        </div>
    )
}

export default Loader