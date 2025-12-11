import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--glass-border)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--primary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>T</div>
                        <span style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>TaskTarget</span>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        {user && (
                            <>
                                <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user.role}</div>
                                </div>
                                <button className="btn btn-outline" onClick={onLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <main className="container fade-in" style={{ flex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
