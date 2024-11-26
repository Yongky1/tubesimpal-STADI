import useTaskModal from '../../hooks/useTaskModal';
import { EMPTY_TASK } from '../../constants/empty-task';

const ContentPlaceholder = ({ page, dueDate }) => {
  const { handleTaskModalOpen } = useTaskModal();
  const placeholderImgSrc = process.env.PUBLIC_URL + `/assets/${page}-new.png`;

  return (
    <div className='content__placeholder'>
      <img
        className='content__placeholderImg'
        src={placeholderImgSrc}
        alt='Empty Inbox Image'
      />
      <p className='content_pMedium'>
        {page === 'today' ? 'Dapatkan pandangan yang jelas tentang hari yang akan datang.' : 'Semua Beres'}
      </p>
      <p className='content_pSmall'>
        {page === 'today'
          ? 'Semua tugas Anda yang jatuh tempo hari ini akan muncul di sini.'
          : 'Sepertinya semuanya diatur di tempat yang tepat.'}
      </p>
      <button
        onClick={() => handleTaskModalOpen(EMPTY_TASK, dueDate)}
        className='button button__primary'
        data-cy='addTaskButton'>
        Add a task
      </button>
    </div>
  );
};

export default ContentPlaceholder;
