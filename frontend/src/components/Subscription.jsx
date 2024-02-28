import useRequest from "../hooks/useRequest";
import EmailForm from "./Requests/EmailForm";
import { Loading } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCheck } from "@fortawesome/free-solid-svg-icons";

const Subscription = () => {
  const { loading, sentRequest, sendRequest } = useRequest({
    url: "https://crudapi.co.uk/api/v1/users",
    method: "POST",
    envVariable: "REACT_APP_USERS",
  });

  const onSubmit = (email) => {
    sendRequest([{ email }]).catch((err) => console.log(err));
  };

  const loadingProces = (
    <Loading>
      <FontAwesomeIcon icon={faArrowsRotate} />
    </Loading>
  );

  const emailSent = <FontAwesomeIcon icon={faCheck} />;

  if (loading) return <EmailForm loading={loadingProces} />;
  if (sentRequest)
    return <EmailForm isFormSubmitted={sentRequest} sentEmail={emailSent} />;

  return (
    <div>
      <EmailForm isFormSubmitted={sentRequest} onFormSubmit={onSubmit} />
    </div>
  );
};

export default Subscription;
