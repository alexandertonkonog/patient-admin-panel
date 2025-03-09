import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

export interface IProps {
  /** Флаг открытия модального окна */
  open: boolean;
  /** Callback закрытия модального окна */
  onClose: () => void;
  /** Заголовок модального окна */
  title: string;
  /** Содержимое модального окна */
  children: React.ReactNode;
}

export const Modal: React.FC<IProps> = (props) => {
  const { open, onClose, title, children } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
