import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiClient from '../services/apiClient';

function calculateRating(feedback) {
  if (!feedback.length) return 0;
  return Math.round((feedback.reduce((sum, item) => sum + Number(item.rating), 0) / feedback.length) * 10) / 10;
}

function AdminFeedback({ darkMode, isAdmin }) {
  const navigate = useNavigate();
  const orchids = useSelector((state) => state.orchids.items);
  const [items, setItems] = React.useState(orchids);
  const [error, setError] = React.useState('');

  React.useEffect(() => setItems(orchids), [orchids]);

  if (!isAdmin) {
    return <main style={{ padding: 120 }}>Only an administrator can manage feedback.</main>;
  }

  const removeFeedback = async (orchid, feedback) => {
    if (!window.confirm(`Delete feedback from ${feedback.author}?`)) return;
    const feedbackList = (orchid.feedback || []).filter((item) => item !== feedback);
    const updatedOrchid = { ...orchid, feedback: feedbackList, rating: calculateRating(feedbackList) };

    try {
      await apiClient.put(`${import.meta.env.VITE_API_URL}/${orchid.id}`, updatedOrchid);
      setItems((current) => current.map((item) => item.id === orchid.id ? updatedOrchid : item));
    } catch (requestError) {
      console.error('Delete admin feedback error:', requestError);
      setError('Feedback could not be deleted.');
    }
  };

  return (
    <main className={`admin-feedback-page ${darkMode ? 'admin-feedback-dark' : ''}`}>
      <button type="button" onClick={() => navigate(-1)} style={{ color: darkMode ? '#fff' : '#222' }}>Back</button>
      <div className="admin-feedback-heading">
        <span>ADMINISTRATION</span>
        <h1>Feedback management</h1>
        <p>Review member feedback and keep orchid ratings accurate.</p>
      </div>
      {error && <p role="alert">{error}</p>}
      {items.map((orchid) => (
        <section className="admin-feedback-orchid" key={orchid.id}>
          <div className="admin-feedback-orchid-header">
            <div>
              <h2>{orchid.name}</h2>
              <span>{orchid.category} · Current rating: {orchid.rating} / 5</span>
            </div>
            <strong>{orchid.feedback?.length || 0} feedback</strong>
          </div>
          {(orchid.feedback || []).length === 0 ? (
            <p className="admin-feedback-empty">No feedback yet.</p>
          ) : (
            orchid.feedback.map((feedback) => (
              <article className="admin-feedback-item" key={`${feedback.author}-${feedback.date}`}>
                <div>
                  <strong>{feedback.author}</strong>
                  <span>{feedback.rating} / 5 · {new Date(feedback.date).toLocaleDateString()}</span>
                  <p>{feedback.comment}</p>
                </div>
                <button type="button" onClick={() => removeFeedback(orchid, feedback)}>Delete</button>
              </article>
            ))
          )}
        </section>
      ))}
    </main>
  );
}

export default AdminFeedback;
