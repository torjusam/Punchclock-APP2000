//Author: Torjus A.M
//placeholder for prototype
import styles from '../..//styles/Buttons.module.css';
import { deleteEmployee } from '../../lib/dataAccess';

interface deleteProps{
    employeeId: number;
    onDelete: (employeeId: number) => void;
}
const DeleteEmployeeButton: React.FC<deleteProps> = ({employeeId, onDelete}) => {

    const handleClick = () => {
        onDelete(employeeId);
      };

  return (
    <button onClick={handleClick}
    className={styles.redirectButton}>
      Delete Employee
    </button>
  );
};

export default DeleteEmployeeButton;
