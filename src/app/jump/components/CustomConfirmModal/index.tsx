import React from "react";
import { Modal, Button } from "antd";
import "./index.css";
type ConfirmProps = {
  visible: boolean;
  title: string;
  description: string;
  onClick: () => void;
  btnText: string;
  footer?: React.ReactNode;
};

const Confirm: React.FC<ConfirmProps> = ({
  visible,
  title,
  description,
  onClick,
  btnText,
  footer,
}) => {
  return (
    <Modal
      open={visible}
      footer={null}
      centered
      closable={false}
      width="288"
      className="custom-confrm-modal !border !border-[#8D8F90] !rounded-xl"
    >
      <div className="text-center !text-white">
        {title && (
          <h2 className="text-[16px] font-bold mb-8 text-white ">{title}</h2>
        )}
        {description && (
          <p className="text-[14px] text-white mb-8">{description}</p>
        )}

        <Button
          className="flex !w-[277px] !h-[56px] !py-[19px] flex-col justify-center items-center !rounded-full border border-black !bg-[#0E8DF5] shadow-[2px_2px_0px_0px_#000] text-white !font-bold !text-[16px] disabled:opacity-40 mb-4"
          onClick={onClick}
        >
          {btnText}
        </Button>
        {footer}
      </div>
    </Modal>
  );
};

export default Confirm;
