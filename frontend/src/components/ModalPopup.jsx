import useRequest from "../hooks/useRequest";
import ModalForm from "./Requests/ModalForm";
import { Loading } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCheck } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "../hooks/useLocalStorage";

const ModalPopup = () => {
  const [isSubmited, setIsSubmited] = useLocalStorage(
    "isModalSubmitted",
    false
  );

  const { loading, sentRequest, sendRequest } = useRequest({
    url: "https://crudapi.co.uk/api/v1/users",
    method: "POST",
    envVariable: "REACT_APP_USERS",
  });

  const onSubmit = (email) => {
    sendRequest([{ email }]).catch((err) => console.log(err));
    setIsSubmited(true);
  };

  const loadingProces = (
    <Loading>
      <FontAwesomeIcon icon={faArrowsRotate} />
    </Loading>
  );

  const emailSent = <FontAwesomeIcon icon={faCheck} />;

  if (loading) return <ModalForm loading={loadingProces} />;
  if (sentRequest) return <ModalForm sentEmail={emailSent} />;

  return (
    !isSubmited && (
      <div>
        <ModalForm onFormSubmit={onSubmit} />
      </div>
    )
  );
};

export default ModalPopup;
