import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const statusConfig = {
        'TODO': { color: '#64748b', bg: '#f1f5f9', label: 'To Do' },
        'IN_PROGRESS': { color: '#d97706', bg: '#fffbeb', label: 'In Progress' },
        'DONE': { color: '#059669', bg: '#ecfdf5', label: 'Done' }
    };

    const currentStatus = statusConfig[task.status] || statusConfig['TODO'];

    const handleStatusChange = (e) => {
        dispatch(updateTask({ id: task._id, taskData: { status: e.target.value } }));
    };

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task._id));
        }
    };

    return (
        <div className="card fade-in" style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: currentStatus.color }}></div>

            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: 'var(--text-primary)' }}>{task.title}</h3>
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        background: currentStatus.bg,
                        color: currentStatus.color,
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {currentStatus.label}
                    </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{task.description}</p>
            </div>

            <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    {user.role === 'ADMIN' && task.assignedTo ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#cbd5e1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                {task.assignedTo.name?.charAt(0) || '?'}
                            </div>
                            <span>{task.assignedTo.name}</span>
                        </div>
                    ) : (
                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <select
                        className="form-input"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', width: 'auto', background: 'transparent' }}
                        value={task.status}
                        onChange={handleStatusChange}
                    >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>

                    {user.role === 'ADMIN' && (
                        <button
                            onClick={onDelete}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--error-color)',
                                cursor: 'pointer',
                                padding: '0.4rem',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            title="Delete Task"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskItem;
