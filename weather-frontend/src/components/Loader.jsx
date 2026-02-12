const AuthLoader = () => {
  return (
    <div className="auth-loader text-center py-3">
      <div className="weather-spinner"></div>
      <p className="mt-2 text-muted">Authenticating...</p>
    </div>
  );
};

export default AuthLoader;
