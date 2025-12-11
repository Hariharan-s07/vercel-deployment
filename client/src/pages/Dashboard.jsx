import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { getTasks, reset } from '../features/tasks/taskSlice';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { tasks, isLoading, isError, message } = useSelector(
        (state) => state.tasks
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        dispatch(getTasks());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, dispatch]);

    if (isLoading && tasks.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <>
            <div className="fade-in" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                        Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                        {user && user.role === 'ADMIN'
                            ? `Overview for ${user.name} (Admin)`
                            : `Welcome back, ${user.name}`}
                    </p>
                </div>

                <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '2rem', boxShadow: 'var(--shadow)', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                    Total Tasks: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{tasks.length}</span>
                </div>
            </div>

            <TaskForm />

            <section className="fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Active Tasks</h2>
                </div>

                {tasks.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {tasks.map((task) => (
                            <TaskItem key={task._id} task={task} />
                        ))}
                    </div>
                ) : (
                    <div className="card text-center" style={{ padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No tasks found</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {user && user.role === 'ADMIN' ? 'Get started by creating a new task above.' : 'You have no assigned tasks yet.'}
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}

export default Dashboard;
