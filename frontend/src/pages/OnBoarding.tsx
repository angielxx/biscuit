import Modal from "../components/common/Modal/Modal";
import Nickname from "../components/OnBoarding/Nickname";

const OnBoarding = () => {
  const isClose = () => {
    return ;
  }

  return (
    <>
      <Modal content={<Nickname />} onClose={isClose} />
    </>
  )
}

export default OnBoarding;