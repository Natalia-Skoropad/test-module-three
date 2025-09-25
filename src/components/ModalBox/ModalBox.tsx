import { useState } from 'react';
import { Button } from '../../index';

import Modal from './Modal';

//===============================================================

export default function ModalBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h2>Main content of the page</h2>
      <Button onClick={openModal} text="Open modal" type="button" />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h3>Modal Title</h3>
          <p>This is some content inside the modal.</p>
        </Modal>
      )}
    </div>
  );
}
