import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';
import apiClient from '../services/apiClient';
import OrchidClip from '../components/OrchidClip';
import ListOfOrchids from '../utils/ListOfOrchids';

function OrchidDetail({ darkMode, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [orchid, setOrchid] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  const loadOrchid = React.useCallback(async () => {
    try {
      const response = await apiClient.get(`${API_URL}/${id}`);
      setOrchid(response.data);
      setStatus('ready');
    } catch (error) {
      console.error('Fetch orchid detail error:', error);
      const fallbackOrchid = ListOfOrchids.find((item) => String(item.id) === String(id));
      if (fallbackOrchid) {
        setOrchid(fallbackOrchid);
        setStatus('ready');
      } else {
        setStatus('error');
      }
    }
  }, [API_URL, id]);

  React.useEffect(() => { loadOrchid(); }, [loadOrchid]);

  const saveFeedback = async (feedback) => {
    try {
      const feedbackList = orchid.feedback?.some((item) => item.author === feedback.author)
        ? orchid.feedback.map((item) => item.author === feedback.author ? feedback : item)
        : [...(orchid.feedback || []), feedback];
      const ratings = feedbackList.map((item) => Number(item.rating));
      const updatedOrchid = { ...orchid, feedback: feedbackList, rating: Math.round((ratings.reduce((sum, value) => sum + value, 0) / ratings.length) * 10) / 10 };
      await apiClient.put(`${API_URL}/${orchid.id}`, updatedOrchid);
      setOrchid(updatedOrchid);
    } catch (error) {
      console.error('Submit feedback error:', error);
      window.alert('Feedback could not be submitted.');
    }
  };

  const deleteFeedback = async () => {
    if (!window.confirm('Delete your feedback?')) return;
    try {
      const feedbackList = (orchid.feedback || []).filter((item) => item.author !== user.email);
      const rating = feedbackList.length
        ? Math.round((feedbackList.reduce((sum, item) => sum + Number(item.rating), 0) / feedbackList.length) * 10) / 10
        : 0;
      const updatedOrchid = { ...orchid, feedback: feedbackList, rating };
      await apiClient.put(`${API_URL}/${orchid.id}`, updatedOrchid);
      setOrchid(updatedOrchid);
    } catch (error) {
      console.error('Delete feedback error:', error);
      window.alert('Feedback could not be deleted.');
    }
  };

  if (status === 'loading') return <div style={{ padding: 120 }}>Loading...</div>;
  if (status === 'error' || !orchid) return <div style={{ padding: 120 }}>Orchid not found.</div>;

  return (
    <main style={{ background: darkMode ? '#181818' : '#fff', color: darkMode ? '#fff' : '#222', padding: '110px 5% 60px', minHeight: '70vh' }}>
      <button onClick={() => navigate(-1)} style={{ border: '2px solid #F7B6C2', background: 'transparent', color: darkMode ? '#fff' : '#222', borderRadius: 8, padding: '8px 20px', marginBottom: 24 }}>Back</button>
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: 40, maxWidth: 1000, margin: '0 auto' }}>
        <img src={orchid.image} alt={orchid.name} style={{ width: 320, height: 380, objectFit: 'cover', borderRadius: 16 }} />
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1>{orchid.name}</h1>
          <p><b>Origin:</b> {orchid.origin}</p>
          <p><b>Category:</b> {orchid.category}</p>
          <p><b>Color:</b> {orchid.color}</p>
          <p><b>Rating:</b> {orchid.rating} / 5</p>
          <p><b>Special:</b> {orchid.isSpecial ? 'Yes' : 'No'}</p>
          <p><b>Natural:</b> {orchid.isNatural ? 'Yes' : 'No'}</p>
          <p><b>Likes:</b> {orchid.numberOfLike}</p>
        </div>
      </section>
      <section className="orchid-video-section">
        <OrchidClip clip={orchid.clip} orchidName={orchid.name} />
      </section>
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: 24, borderRadius: 16, background: darkMode ? '#23232b' : '#f8e8ef' }}>
        <h2>Feedback ({orchid.feedback?.length || 0})</h2>
        {(orchid.feedback || []).map((item) => (
          <article key={`${item.author}-${item.date}`} style={{ borderBottom: '1px solid #d5b8c2', padding: '12px 0' }}>
            <b>{item.author}</b> — {item.rating} / 5
            <div>{item.comment}</div>
            <small>{new Date(item.date).toLocaleDateString()}</small>
            {user?.email === item.author && <button type="button" onClick={deleteFeedback} style={{ marginLeft: 12 }}>Delete my feedback</button>}
          </article>
        ))}
        <FeedbackForm orchid={orchid} user={user} onSubmit={saveFeedback} />
      </section>
    </main>
  );
}

export default OrchidDetail;
