import { Modal } from 'antd';
import styles from './SlideModal.module.scss';

interface SlideModalProps {
  isVisible: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
}

const SlideModal = ({ isVisible, title, description, onClose }: SlideModalProps) => {
  return (
    <Modal
      centered
      title={title || 'Slide Details'}
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <p>{description || 'No description available'}</p>
    </Modal>
  );
};

export default SlideModal;
