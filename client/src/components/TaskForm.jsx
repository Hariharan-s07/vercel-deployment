
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createTask } from '../features/tasks/taskSlice';
import { getAllUsers } from '../features/users/userSlice';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { users, isError, message } = useSelector((state) => state.users);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (user && user.role === 'ADMIN') {
            dispatch(getAllUsers());
        }
    }, [user, isError, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            assignedTo: user.role === 'ADMIN' ? (assignedTo || user._id) : undefined
        };

        dispatch(createTask(taskData));

        setTitle('');
        setDescription('');
        setAssignedTo('');
    };

    if (user.role !== 'ADMIN') return null;

    return (
        <div className="card fade-in" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'var(--primary-color)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>+</span>
                Create New Task
            </h2>
            <form onSubmit={onSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Task Title</label>
                        <input
                            type="text"
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Redesign Landing Page"
                            required
                        />
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add detailed instructions..."
                            rows="3"
                            style={{ resize: 'vertical' }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Assign To</label>
                        <select
                            className="form-input"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value="">Assign to me ({user.name})</option>
                            {users.map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.name} ({u.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button className="btn btn-primary btn-block" type="submit">
                            Create Task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;
