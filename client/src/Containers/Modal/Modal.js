import React from 'react';
import { useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';
import './Modal.css';

import tableSelectors from '../../redux/table-data/table-data-selectors';
import authSelectors from '../../redux/auth/auth-selectors';

export default function useModal(props) {
  const isLoadingTable = useSelector(tableSelectors.isLoading);
  const isLoadingAuth = useSelector(authSelectors.isLoading);

  return (
    <Modal
      {...props}
      centered
      animation={false}
      dialogClassName="modal-auto_width"
    >
      {isLoadingTable || isLoadingAuth ? '' : props.children}
    </Modal>
  );
}
