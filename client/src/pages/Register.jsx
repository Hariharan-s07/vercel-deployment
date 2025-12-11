import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { name, email, password, confirmPassword } = formData;
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            toast.success('Account created successfully!');
            navigate('/');
        }
        return () => {
            if (isSuccess) dispatch(reset());
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            setPasswordError('');
            const userData = { name, email, password };
            dispatch(register(userData));
        }
    };

    return (
        <div className="auth-container">
            <div className="card fade-in" style={{ width: '100%', maxWidth: '420px' }}>
                <div className="text-center mb-4">
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Get Started</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Create your account in seconds</p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="••••••••"
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-input"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {passwordError && <div className="text-error mb-4 text-center">{passwordError}</div>}
                    {isError && <div className="text-error mb-4 text-center">{message}</div>}

                    <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
                    <Link to="/login" className="link">Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
