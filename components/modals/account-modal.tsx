import { FC } from "react";
import { Modal } from "@/components/UI/modal";

import { AccountForm } from "../form/account-form";
import { UseAccountModal } from "@/hooks/use-account-modal";

interface AccountModalProps {}

export const AccountModal: FC<AccountModalProps> = ({}) => {
  const isOpen = UseAccountModal((state) => state.isOpen);
  const onClose = UseAccountModal((state) => state.onClose);
  
  return (
    <Modal onClose={onClose} open={isOpen} className="block w-3/5">
      <AccountForm />
    </Modal>
  );
};
