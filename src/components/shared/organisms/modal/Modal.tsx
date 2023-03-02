'use client';

import ReactModal from 'react-modal';
import React, { useEffect, useState } from 'react';
import style from './modal.module.scss';

interface Props {
  config: ReactModal.Props;
  setIsOpenFunction: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const Modal = ({ config, children, setIsOpenFunction }: Props) => {
  return (
    <ReactModal className={style.modal} isOpen={config.isOpen} ariaHideApp={false}>
      <button className={style.close} onClick={() => setIsOpenFunction(false)}>
        Close
      </button>
      <div>{children}</div>
    </ReactModal>
  );
};

export default Modal;
